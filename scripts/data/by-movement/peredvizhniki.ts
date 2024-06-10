// This file is automatically generated. Do not modify manually.

export type Peredvizhniki = {
  image: string
  paintingLabel: string
  artistName: string
  date_of_birth?: string | undefined
  date_of_death?: string | undefined
  image_of_artist?: string | undefined
  movementLabel: string
  width?: string | undefined
  height?: string | undefined
  creationYear?: string | undefined
  description?: string | undefined
  abstract?: string | undefined
}[]

const peredvizhniki: Peredvizhniki = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Isaak_Levitan_Tihaya_obitel.jpg",
    paintingLabel: "A Quiet Monastery",
    artistName: "Isaac Levitan",
    date_of_birth: "1860",
    date_of_death: "1900",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Isaac_Levitan_selfportrait1880.jpg",
    movementLabel: "Peredvizhniki",
    width: "108",
    height: "87.5",
    description: "painting by Isaac Levitan, 1890",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Archip_Iwanowitsch_Kuindshi_008.jpg",
    paintingLabel: "Lake Ladoga",
    artistName: "Arkhip Kuindzhi",
    date_of_birth: "1842",
    date_of_death: "1910",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Kuindzhi_by_I.Kramskoy_%281872%2C_GTG%29.jpg",
    movementLabel: "Peredvizhniki",
    width: "62.5",
    height: "79.5",
    description: "1873 painting by Arkhip Kuindzhi",
  },
] satisfies Peredvizhniki

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default peredvizhniki
