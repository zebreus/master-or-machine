// This file is automatically generated. Do not modify manually.

export type Synthetism = {
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

const synthetism: Synthetism = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/dc/Maison_au_fond_d%27un_parc.jpg",
    paintingLabel: "House at the bottom of a park",
    artistName: "Émile Bernard",
    date_of_birth: "1868",
    date_of_death: "1941",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Henri_de_Toulouse-Lautrec_-_Portrait_de_%C3%89mile_Bernard.jpg",
    movementLabel: "synthetism",
    width: "65.5",
    height: "54.5",
    description: "painting by Émile Bernard",
  },
] satisfies Synthetism

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default synthetism
