// This file is automatically generated. Do not modify manually.

export type Jyqijyscmeoxoritxdyv = {
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

const jyqijyscmeoxoritxdyv: Jyqijyscmeoxoritxdyv = {
  id: "jyqijyscmeoxoritxdyv",
  artwork: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Ernst-Ludwig-Kirchner-Weiblicher-Akt-mit-Hut-Museum-Ludwig.jpg",
    paintingLabel: "Half-Length Nude with Hat",
    artistName: "Ernst Ludwig Kirchner",
    date_of_birth: "1880",
    date_of_death: "1938",
    image_of_artist:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Kirchner_1919_portrait.jpg",
    movementLabel: "expressionism",
    description: "painting by Ernst Ludwig Kirchner",
    depicts: [
      "dress",
      "Doris Groß",
      "areola",
      "toplessness",
      "breast",
      "hat",
      "woman",
    ],
  },
  prompt:
    "a painting of a woman with a hat on her head, an art deco painting by Ernst Ludwig Kirchner, pixiv, expressionism, fauvism, 1920s, studio portrait, Doris Groß, areola, toplessness, breast, hat, woman",
  result: 1,
} satisfies Jyqijyscmeoxoritxdyv

// Export as default value to avoid a weird bug where json files are sometimes preferred over ts files
export default jyqijyscmeoxoritxdyv
