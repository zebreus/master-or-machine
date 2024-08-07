// This file is automatically generated. Do not modify manually.

export type Iyfxsdzuinpgqpbrybdu = {
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

const iyfxsdzuinpgqpbrybdu: Iyfxsdzuinpgqpbrybdu = {
  id: "iyfxsdzuinpgqpbrybdu",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Josep_Armet_Portanell-_Paisatge_catal%C3%A0-_3820.JPG",
    paintingLabel: "Catalan Landscape",
    artistName: "José Armet Portanell",
    movementLabel: "Art Nouveau",
    date_of_birth: "1843",
    date_of_death: "1911",
    artist_img:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/Armet_Portanell.jpg",
    width: "1165",
    height: "775",
    inception: "1884",
    description: "painting by Josep Armet Portanell",
    motifs: ["horse", "building", "stream", "poplar", "farmer", "woman"],
    genres: ["landscape art"],
    materials: ["oil paint", "canvas"],
  },
  prompt:
    "a painting of people and animals in a wooded area, a detailed matte painting by Asher Brown Durand, cgsociety, hudson river school, matte painting, matte drawing, detailed painting, Catalan Landscape, José Armet Portanell, Art Nouveau, 1884, oil paint, canvas, landscape art",
  result: 1,
} satisfies Iyfxsdzuinpgqpbrybdu

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default iyfxsdzuinpgqpbrybdu
