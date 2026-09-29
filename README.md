# Gordinho Lanches — Site institucional

Landing page de marca do Gordinho Lanches (hamburgueria em Itatiba/SP, desde 1992).
Sem cardápio: o foco é o legado (desde 1992), a família e a conversão via WhatsApp.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run lint       # ESLint
npm run typecheck  # checagem de tipos
npm run format     # Prettier (ordena classes Tailwind)
```

Copie `.env.example` para `.env.local` e ajuste `NEXT_PUBLIC_SITE_URL`.

## Estrutura

```
src/
  app/                 layout raiz (fontes, SEO), página, 404, sitemap, robots, ícone
  assets/
    brand/             mascote.png (recortado do logo) e logo original (só referência)
    images/            fotos otimizadas + index.ts (catálogo com textos alternativos)
  components/
    brand/Logo.tsx     emblema em SVG (sem "self service", que não existe mais)
    layout/            Header, Footer, FloatingActions (WhatsApp flutuante / barra mobile)
    motion/            MotionEffects (revelação + parallax), CountUp, VideoLoop
    sections/          Hero, Marquee, Legacy, Story, Pillars, Space, ImageBand, Team,
                       Community, Gallery, FinalCta, Visit, Motto
    seo/               StructuredData (JSON-LD de restaurante)
    ui/                Button, Container, SectionHeading, MapEmbed, icons
  config/site.ts       dados do negócio (contato, endereço, horários, redes, lema, navegação)
  data/people.ts       equipe e depoimentos REAIS (seções só aparecem quando preenchidos)
public/videos/         vídeo do hero (loop do trecho 5s–16s)
fotos-originais/       originais de câmera — fora do git e do build
```

## Onde editar

- **Dados da loja:** `src/config/site.ts` — procure por `[CONFIRMAR]` e `[PREENCHER]`.
- **Textos das seções:** cada arquivo em `src/components/sections/`.
- **Cores, fontes e animações:** `src/app/globals.css`.
- **Nova foto:** otimize (≤2400px), coloque em `src/assets/images/` e registre em `index.ts`.

## Animações

- `reveal`, `reveal-zoom`, `reveal-curtain`, `reveal-write`: aparecem ao entrar na tela.
  Escalone com `style={delay(120)}`. Respeitam `prefers-reduced-motion`.
- `data-parallax="0.1"`: desloca o elemento com o scroll (só desktop).
