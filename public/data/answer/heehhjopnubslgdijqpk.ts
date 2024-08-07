// This file is automatically generated. Do not modify manually.

export type Heehhjopnubslgdijqpk = {
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

const heehhjopnubslgdijqpk: Heehhjopnubslgdijqpk = {
  id: "heehhjopnubslgdijqpk",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1a/Harbor_at_Lormont_-_Eugene_Louis_Boudin.jpg",
    paintingLabel: "Harbor at Lormont",
    artistName: "Eugène Boudin",
    movementLabel: "Impressionism",
    date_of_birth: "1824",
    date_of_death: "1898",
    artist_img:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Boudin-eugene-c-face-half.jpg",
    width: "80",
    height: "50.8",
    inception: "1875",
    description: "painting by Eugène Boudin",
    motifs: ["harbor", "water", "ship", "Lormont", "sky"],
    genres: ["landscape art"],
    materials: ["oil paint", "canvas"],
  },
  prompt:
    "a painting of a boat in the water by Anton Mauve, cgsociety, barbizon school, impressionism, dutch golden age, oil on canvas, 1875, 50.8cm x 80cm",
  result: 1,
} satisfies Heehhjopnubslgdijqpk

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default heehhjopnubslgdijqpk
