// This file is automatically generated. Do not modify manually.

export type Tpbkzxikcboyfvwfylwi = {
  id: string
  artwork: {
    image: string
    paintingLabel: string
    artistName: string
    movementLabel: string
    date_of_birth?: string | undefined
    date_of_death?: string | undefined
    artist_img?: string | undefined
    width?: string | undefined
    height?: string | undefined
    inception?: string | undefined
    country?: string | undefined
    description?: string | undefined
    abstract?: string | undefined
    motifs: string[]
    genres: string[]
    materials: string[]
  }
  prompt: string
  result: number
}

const tpbkzxikcboyfvwfylwi: Tpbkzxikcboyfvwfylwi = {
  id: "tpbkzxikcboyfvwfylwi",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Temp%C3%AAte%2C_c%C3%B4tes_de_Belle-%C3%8Ele_-_Claude.jpg",
    paintingLabel: "Tempête, côtes de Belle-Ile",
    artistName: "Claude Monet",
    movementLabel: "Impressionism",
    date_of_birth: "1840",
    date_of_death: "1926",
    artist_img:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Claude_Monet_1899_Nadar_crop.jpg",
    width: "81.5",
    height: "65.4",
    inception: "1886",
    description: "painting by Claude Monet, 1886",
    motifs: ["littoral zone", "landscape", "Belle Île", "storm", "wind wave"],
    genres: ["marine art", "landscape art"],
    materials: ["oil paint", "canvas"],
  },
  prompt:
    "a painting of rocks in the water, an impressionist painting by Anna Boch, pixiv, impressionism, impressionism, oil on canvas, painterly, by Claude Monet, 1886, 65.4cm x 81.5cm",
  result: 1,
} satisfies Tpbkzxikcboyfvwfylwi

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default tpbkzxikcboyfvwfylwi
