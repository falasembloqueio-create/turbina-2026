/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Isso gera os arquivos HTML que o GitHub consegue ler
  basePath: '/turbina-2026', // IMPORTANTE: Deve ser o nome do seu repositório
  images: {
    unoptimized: true, // O GitHub Pages não suporta otimização de imagem padrão do Next
  },
}

export default nextConfig
