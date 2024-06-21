// This file is automatically generated. Do not modify manually.

export type Jrrhjvdqophqebbrfqwe = {
  id: string
  artwork: {
    image: string
    paintingLabel: string
    artistName: string
    date_of_birth?: string | undefined
    date_of_death?: string | undefined
    image_of_artist?: string | undefined
    movementLabel: string
    width?: string | undefined
    height?: string | undefined
    inception?: string | undefined
    description?: string | undefined
    abstract?: string | undefined
    depicts?: string | undefined
    country?: string | undefined
  }
  prompt: string
  result: number
}

const jrrhjvdqophqebbrfqwe: Jrrhjvdqophqebbrfqwe = {
  id: "jrrhjvdqophqebbrfqwe",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Nicolae_Grigorescu_-_Taranca_voioasa.jpg",
    paintingLabel: "Cheerful peasant",
    artistName: "Nicolae Grigorescu",
    date_of_birth: "1838",
    date_of_death: "1907",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/b/bd/Nicolae_Grigorescu_-_Foto02.jpg",
    movementLabel: "Impressionism",
    width: "65",
    height: "134.5",
    description: "painting by Nicolae Grigorescu",
    depicts: [],
  },
  prompt:
    "Painting in the style of Nicolae Grigorescu.  \n\nA young woman, dressed in a bright blue dress with white apron and cap, stands in a lush green field, surrounded by a bouquet of flowers and holding a basket of fruit, with a warm and radiant smile on her face",
  result: 1,
} satisfies Jrrhjvdqophqebbrfqwe

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default jrrhjvdqophqebbrfqwe