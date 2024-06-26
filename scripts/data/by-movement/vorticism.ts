// This file is automatically generated. Do not modify manually.

export type Vorticism = {
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

const vorticism: Vorticism = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/06/Jessica_Dismorr_-_Abstract_composition_1915.jpg",
    paintingLabel: "Abstract Composition",
    artistName: "Jessica Dismorr",
    date_of_birth: "1885",
    date_of_death: "1939",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/3/33/Jessica_Dismorr_by_Jessica_Dismorr_1929.jpg",
    movementLabel: "vorticism",
    width: "50.8",
    height: "41.3",
    description: "painting by Jessica Dismorr",
  },
] satisfies Vorticism

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default vorticism
