// This file is automatically generated. Do not modify manually.

export type FlorentineSchool = {
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

const florentineSchool: FlorentineSchool = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/25/Christ_with_Instruments_of_the_Passion_-_Jacopo_d%27Arcangelo_del_Sellaio.jpg",
    paintingLabel: "Christ with Instruments of the Passion",
    artistName: "Jacopo da Sellaio",
    date_of_birth: "1442",
    date_of_death: "1493",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/6/68/Jacopo_del_Sellaio_006.jpg",
    movementLabel: "Florentine School",
    width: "20",
    height: "26.375",
    description: "painting by Jacopo da Sellaio",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Lorenzo_di_credi%2C_venere.jpg",
    paintingLabel: "Venus",
    artistName: "Lorenzo di Credi",
    date_of_birth: "1459",
    date_of_death: "1537",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/Lorenzo_di_Credi_by_Perugino.jpg",
    movementLabel: "Florentine School",
    width: "69",
    height: "151",
    description: "painting by Lorenzo di Credi",
  },
] satisfies FlorentineSchool

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default florentineSchool
