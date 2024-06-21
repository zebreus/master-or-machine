import { z } from "zod"
import { descriptionToImage } from "./helpers/descriptionToImage"
import { imageToDescription } from "./helpers/generateDescriptions"
import { writeDataFile } from "./helpers/writeDataFile"
import { camelCase } from "./helpers/camelCase"
import { downloadImage } from "./helpers/downloadImage"
import { getArtworksByMovement } from "./getNumOfRandomArtworksByMovement"
import { Artwork, artworkSchema } from "./artwork"

const getEligibleArtworks = async () => {
  //const artworks = await getArtworksForAMovement("Cubism")
  const artworks = await getArtworksByMovement("Impressionism", 3)
  const artworks2 = await getArtworksByMovement("Expressionism", 20)

  // return [artworks[0]]
  return [...artworks]
}

export type Question = {
  id: string
  image1: string
  image2: string
  description: string
}

export type Answer = {
  id: string
  artwork: Artwork
  prompt: string
  result: number // 0 | 1
}

const questionSchema = z.object({
  id: z.string(),
  image1: z.string(),
  image2: z.string(),
  description: z.string(),
})

const answerSchema = z.object({
  id: z.string(),
  artwork: artworkSchema,
  prompt: z.string(),
  result: z.number(),
})

const movementSchema = z.object({
  id: z.string(),
  name: z.string(),
  questions: z.array(z.string()),
})

const randomString = (length: number) => {
  return [...Array(length)]
    .map(() => String.fromCodePoint(Math.round(97 + Math.random() * 25)))
    .join("")
}

const generateQuestions = async () => {
  const artworks = await getEligibleArtworks()

  const questions: Record<string, [Question, Answer]> = {}
  const movements: Record<string, z.infer<typeof movementSchema>> = {}

  for (const artwork of artworks) {
    try {
      const questionId = randomString(20)

      const masterUrl = await downloadImage(
        artwork.image,
        `${questionId}-${randomString(5)}`,
      )

      const description = await imageToDescription(artwork)

      const generated = await descriptionToImage(
        description.prompt,
        `${questionId}-${randomString(5)}`,
      )

      // ensure random order of the two images
      const images = [masterUrl, generated.file].sort()

      questions[questionId] = [
        {
          id: questionId,
          image1: images[0],
          image2: images[1],
          description: description.description,
        },
        {
          id: questionId,
          artwork,
          prompt: description.prompt,
          result: masterUrl == images[0] ? 0 : 1,
        },
      ]

      const movementId = camelCase(artwork.movementLabel)
      movements[movementId] = {
        id: movementId,
        name: artwork.movementLabel,
        questions: [...(movements[movementId]?.questions ?? []), questionId],
      }
    } catch (e) {
      console.error("Error with artwork ", artwork.paintingLabel)
      console.error(e)
    }
  }

  for (const [key, [question, answer]] of Object.entries(questions)) {
    await writeDataFile(`question/${key}`, question, questionSchema)
    await writeDataFile(`answer/${key}`, answer, answerSchema)
  }
  for (const [key, movement] of Object.entries(movements)) {
    await writeDataFile(`movement/${key}`, movement, movementSchema)
  }
  await writeDataFile("movements", Object.keys(movements), z.array(z.string()))
}

generateQuestions()
