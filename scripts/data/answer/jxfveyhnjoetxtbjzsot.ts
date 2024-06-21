// This file is automatically generated. Do not modify manually.

export type Jxfveyhnjoetxtbjzsot = {
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

const jxfveyhnjoetxtbjzsot: Jxfveyhnjoetxtbjzsot = {
  id: "jxfveyhnjoetxtbjzsot",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Josep_Cusachs_i_Cusachs-_Soldat-_1627.JPG",
    paintingLabel: "soldier",
    artistName: "Josep Cusachs",
    date_of_birth: "1851",
    date_of_death: "1908",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Ramon_Casas_-_MNAC-_Josep_Cusachs-_027323-D_006482.jpg",
    movementLabel: "Art Nouveau",
    width: "35",
    height: "53",
    description: "painting by Josep Cusachs",
    depicts: [
      "soldier",
      "military personnel",
      "guitar",
      "military uniform",
      "beard",
      "standing",
      "man",
    ],
  },
  prompt:
    "a painting of a man with a guitar by Charles Fremont Conner, cgsociety, american scene painting, detailed painting, concert poster, art, oil on canvas, 30x40 inches, painted in 1885",
  result: 1,
} satisfies Jxfveyhnjoetxtbjzsot

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default jxfveyhnjoetxtbjzsot
