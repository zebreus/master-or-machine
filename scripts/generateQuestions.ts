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
  const artworks = await getArtworksByMovement("Impressionism", 5)
  const artworks2 = await getArtworksByMovement("expressionism", 5)
  const artworks3 = await getArtworksByMovement("Art Nouveau", 5)

  // return [artworks[0]]
  return [...artworks, ...artworks2, ...artworks3]
}
/** How many questions will be generated in parallel */
const PARALLEL_TASKS = 5

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

export const processPromisesBatch = async <In, Out>(
  items: Array<In>,
  limit: number,
  fn: (item: In) => Promise<Out>,
): Promise<Array<Out>> => {
  let results: Array<Out> = []
  for (let start = 0; start < items.length; start += limit) {
    const end = start + limit > items.length ? items.length : start + limit

    const slicedResults = await Promise.all(items.slice(start, end).map(fn))

    results = [...results, ...slicedResults]
  }

  return results
}

const generateQuestions = async () => {
  const artworks = await getEligibleArtworks()

  // const questions: Record<string, [Question, Answer]> = {}
  // const movements: Record<string, z.infer<typeof movementSchema>> = {}

  const resultsWithUndefined = await processPromisesBatch(
    artworks,
    PARALLEL_TASKS,
    async (artwork) => {
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

        return {
          question: {
            id: questionId,
            image1: images[0],
            image2: images[1],
            description: description.description,
          } satisfies Question,
          answer: {
            id: questionId,
            artwork,
            prompt: description.prompt,
            result: masterUrl == images[0] ? 0 : 1,
          } satisfies Answer,
          movement: {
            id: camelCase(artwork.movementLabel),
            name: artwork.movementLabel,
          },
          id: questionId,
        }
      } catch (e) {
        console.error("Error with artwork ", artwork.paintingLabel)
        console.error(e)
        return undefined
      }
    },
  )
  const results = resultsWithUndefined.flatMap((r) => (r ? [r] : []))

  const movements = results.reduce(
    (acc, result) => {
      acc[result.movement.id] = {
        id: result.movement.id,
        name: result.movement.name,
        questions: [...(acc[result.movement.id]?.questions ?? []), result.id],
      }
      return acc
    },
    {} as Record<string, z.infer<typeof movementSchema>>,
  )

  for (const { question, answer, id } of results) {
    await writeDataFile(`question/${id}`, question, questionSchema)
    await writeDataFile(`answer/${id}`, answer, answerSchema)
  }
  for (const [key, movement] of Object.entries(movements)) {
    await writeDataFile(`movement/${key}`, movement, movementSchema)
  }
  await writeDataFile(
    "movements",
    Object.values(movements).map((movement) => ({
      id: movement.id,
      name: movement.name,
    })),
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    ),
  )
}

generateQuestions()
