// This file is automatically generated. Do not modify manually.

export type Xhpqxmtviturlkyqwthx = {
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
    depicts?: (string | string[]) | undefined
    country?: string | undefined
  }
  prompt: string
  result: number
}

const xhpqxmtviturlkyqwthx: Xhpqxmtviturlkyqwthx = {
  id: "xhpqxmtviturlkyqwthx",
  artwork: {
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Gonez.jpg",
    paintingLabel: "Messenger. Clan revolted against to clan.",
    artistName: "Nicholas Roerich",
    date_of_birth: "1874",
    date_of_death: "1947",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/N_Roerich.jpg",
    movementLabel: "Art Nouveau",
    width: "184.3",
    height: "124.7",
    description: "painting by Nicholas Roerich",
    depicts: [
      "boat",
      "water",
      "coast",
      "construction",
      "person",
      "oar",
      "night",
    ],
  },
  prompt:
    'Painting in the style of Nicholas Roerich. "\n\nThe prompt is:\n"Create a painting in the style of Nicholas Roerich\'s Art Nouveau era, circa [inception], depicting a serene night scene with a person rowing a boat across the calm waters of a coastal area',
  result: 1,
} satisfies Xhpqxmtviturlkyqwthx

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default xhpqxmtviturlkyqwthx
