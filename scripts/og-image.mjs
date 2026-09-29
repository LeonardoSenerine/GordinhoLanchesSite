// Gera a capa de compartilhamento (Open Graph) a partir da página /og-cover.
//
// Uso: com `npm run dev` rodando, execute `npm run og`.
// Saída: src/app/opengraph-image.jpg e src/app/twitter-image.jpg (1200x630).
//
// Abre o Microsoft Edge em modo headless via Chrome DevTools Protocol, captura o
// elemento #og e salva em JPEG com o sharp (já instalado pelo Next).
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const URL = process.env.OG_URL ?? "http://localhost:3000/og-cover";
const OUT = ["src/app/opengraph-image.jpg", "src/app/twitter-image.jpg"];
const BROWSERS = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].filter(Boolean);

const browserPath = BROWSERS.find((p) => existsSync(p));
if (!browserPath) throw new Error("Edge/Chrome não encontrado. Defina BROWSER_PATH.");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9400 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), "og-"));
const browser = spawn(
  browserPath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

try {
  let targets = [];
  for (let i = 0; i < 50 && !targets.length; i++) {
    try {
      targets = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).filter(
        (t) => t.type === "page",
      );
    } catch {}
    if (!targets.length) await sleep(200);
  }
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    pending.get(msg.id)?.(msg);
  });
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      pending.set(++id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send("Emulation.setDeviceMetricsOverride", {
    width: 1200,
    height: 630,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await send("Page.enable");
  await send("Page.navigate", { url: URL });
  await sleep(2500);
  // Garante fontes e imagens carregadas e esconde o indicador de dev do Next antes da captura
  await send("Runtime.evaluate", {
    expression: `(async () => {
      document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
      await document.fonts.ready;
      await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
    })()`,
    awaitPromise: true,
  });
  await sleep(500);

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 },
    captureBeyondViewport: false,
  });
  if (!shot.result?.data) throw new Error(`Falha na captura: ${JSON.stringify(shot.error ?? shot)}`);

  // Captura em 2x e reduz para 1200x630: texto e bordas mais nítidos
  const png = Buffer.from(shot.result.data, "base64");
  for (const out of OUT) {
    const info = await sharp(png).resize(1200, 630).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
    console.log(`ok: ${out} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
  }
  ws.close();
} finally {
  browser.kill();
  await sleep(1000);
  // O Edge pode demorar a soltar os arquivos do perfil temporário no Windows; a limpeza é opcional
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
  } catch {}
}
