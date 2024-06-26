// This file is automatically generated. Do not modify manually.

export type Xnwnafnpaleegeiuqtcl = {
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

const xnwnafnpaleegeiuqtcl: Xnwnafnpaleegeiuqtcl = {
  id: "xnwnafnpaleegeiuqtcl",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/ec/Marc-red_and_blue_horses.jpg",
    paintingLabel: "Red and Blue Horses",
    artistName: "Franz Marc",
    date_of_birth: "1880",
    date_of_death: "1916",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/FranzMarccropped.jpg",
    movementLabel: "expressionism",
    width: "34",
    height: "26.5",
    description: "Franz Marc painting",
    depicts: ["horse"],
  },
  prompt:
    "a painting of a red horse and a blue horse, a cubist painting by Franz Marc, behance, orphism, cubism, fauvism, constructivism, in the style of Franz Marc",
  result: 1,
} satisfies Xnwnafnpaleegeiuqtcl

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default xnwnafnpaleegeiuqtcl
