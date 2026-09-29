import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 = padrão; 90 = fotos de pessoas em destaque (rostos perdem detalhe com compressão forte)
    qualities: [75, 90],
  },
};

export default nextConfig;
