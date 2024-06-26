// This file is automatically generated. Do not modify manually.

export type Horse = {
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

const horse: Horse = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Caspar_David_Friedrich_043.jpg",
    paintingLabel: "Meadows near Greifswald",
    artistName: "Caspar David Friedrich",
    date_of_birth: "1774",
    date_of_death: "1840",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/%D0%9A%D0%B0%D1%81%D0%BF%D0%B0%D1%80_%D0%94%D0%B0%D0%B2%D0%B8%D0%B4_%D0%A4%D1%80%D0%B8%D0%B4%D1%80%D0%B8%D1%85.%D0%9F%D0%BE%D0%B7%D0%B4%D0%BD%D0%B8%D0%B9_%D0%B0%D0%B2%D1%82%D0%BE%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82.jpg",
    movementLabel: "horse",
    width: "48.3",
    height: "34.5",
    description: "painting by Caspar David Friedrich",
  },
] satisfies Horse

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default horse
