// This file is automatically generated. Do not modify manually.

export type Hwlvhtnseefjmrwsotsz = {
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

const hwlvhtnseefjmrwsotsz: Hwlvhtnseefjmrwsotsz = {
  id: "hwlvhtnseefjmrwsotsz",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/86/Claude_Monet_-_Cath%C3%A9drale_de_Rouen._Harmonie_blanche.jpg",
    paintingLabel:
      "Rouen Cathedral, Portal and Tower Saint-Romain, Morning Light",
    artistName: "Claude Monet",
    movementLabel: "Impressionism",
    date_of_birth: "1840",
    date_of_death: "1926",
    artist_img:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Claude_Monet_1899_Nadar_crop.jpg",
    width: "73",
    height: "106",
    inception: "1893",
    description: "painting by Claude Monet, 1893",
    motifs: ["cathedral", "tower", "Rouen", "Rouen Cathedral", "morning"],
    genres: ["architectural view"],
    materials: ["oil paint", "canvas"],
  },
  prompt:
    "a painting of a cathedral in Rouen, France, with a clock on it, a detailed matte painting by Blanche Hoschedé Monet, tumblr, academic art, fresco, academic art, impressionism",
  result: 0,
} satisfies Hwlvhtnseefjmrwsotsz

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default hwlvhtnseefjmrwsotsz
