// This file is automatically generated. Do not modify manually.

export type Hispanism = {
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

const hispanism: Hispanism = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/92/EL_JALEO-SINGER.jpg",
    paintingLabel: "El Jaleo",
    artistName: "John Singer Sargent",
    date_of_birth: "1856",
    date_of_death: "1925",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Sargent%2C_John_SInger_%281856-1925%29_-_Self-Portrait_1907_b.jpg",
    movementLabel: "Hispanism",
    width: "348",
    height: "232",
    description: "painting by John Singer Sargent",
    abstract:
      "El Jaleo is a large painting by John Singer Sargent, depicting a Spanish Gypsy dancer performing to the accompaniment of musicians. Painted in 1882, it currently hangs in the Isabella Stewart Gardner Museum in Boston.",
  },
] satisfies Hispanism

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default hispanism
