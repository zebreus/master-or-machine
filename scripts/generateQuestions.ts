import { z } from "zod"
import { descriptionToImage } from "./helpers/descriptionToImage"
import { imageToDescription } from "./helpers/generateDescriptions"
import { writeDataFile } from "./helpers/writeDataFile"
import { Artwork, artworkSchema, getArtworksForAMovement } from "./artwork"
import { camelCase } from "./helpers/camelCase"
import { downloadImage } from "./helpers/downloadImage"
import { getArtworksByMovement } from "./getNumOfRandomArtworksByMovement"

const getEligibleArtworks = async () => {
  //const artworks = await getArtworksForAMovement("Cubism")
  const artworks = await getArtworksByMovement("Impressionism", 3)

  // return [artworks[0]]
  return artworks
}

export type Question = {
  id: number
  image1: string
  image2: string
  description: string
}

export type Answer = {
  id: number
  artwork: Artwork
  prompt: string
  result: number // 0 | 1
}

const questionSchema = z.object({
  id: z.number(),
  image1: z.string(),
  image2: z.string(),
  description: z.string(),
})

const answerSchema = z.object({
  id: z.number(),
  artwork: artworkSchema,
  prompt: z.string(),
  result: z.number(),
})

const generateQuestions = async () => {
  const artworks = await getEligibleArtworks()

  const questions: Question[] = []
  const answers: Answer[] = []
  for (let index = 0; index < artworks.length; index++) {
    const artwork = artworks[index]

    try {
      const imageName = camelCase(artwork.movementLabel + String(index))
      const masterUrl = await downloadImage(artwork.image, imageName)

      const description = await imageToDescription(artwork)

      const machineUrl = await descriptionToImage(description.prompt, imageName)

      // ensure random order of the two images
      const randomResult = Math.random() < 0.5
      const images = randomResult
        ? [masterUrl, machineUrl]
        : [machineUrl, masterUrl]

      questions.push({
        id: index,
        image1: images[0],
        image2: images[1],
        description: description.description,
      })
      answers.push({
        id: index,
        artwork,
        prompt: description.prompt,
        result: randomResult ? 0 : 1,
      })
    } catch (e) {
      console.error("Error with artwork ", artwork.paintingLabel)
      console.error(artwork)
      console.error(e)
    }
  }

  // TODO: include movements in file names (or have all ids unique)
  await writeDataFile("questionsTest", questions, z.array(questionSchema))

  await writeDataFile("answersTest", answers, z.array(answerSchema))
}

generateQuestions()
