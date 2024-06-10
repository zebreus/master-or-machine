import { z } from "zod"
import { descriptionToImage } from "./helpers/descriptionToImage"
import { imageToDescription } from "./helpers/generateDescriptions"
import { writeDataFile } from "./helpers/writeDataFile"
import { Artwork, artworkSchema, getArtworksForAMovement } from "./artwork"
import { camelCase } from "./helpers/camelCase"
import { downloadImage } from "./helpers/downloadImage"

const getEligibleArtworks = async () => {
  const artworks = await getArtworksForAMovement("Cubism")

  // return [artworks[0]]
  return artworks
}

type Question = {
  prompt: string
  promptOrigin: string
  artwork: Artwork
  machineUrl: string
  masterUrl: string
}

const questionSchema = z.object({
  prompt: z.string(),
  promptOrigin: z.string(),
  artwork: artworkSchema,
  machineUrl: z.string(),
  masterUrl: z.string(),
})

const generateQuestions = async () => {
  const artworks = await getEligibleArtworks()
  console.log(artworks)

  const artworksWithPromptsAndImages: Question[] = []
  for (const artwork of artworks) {
    const imageName = camelCase(
      artwork.paintingLabel +
        (artwork.creationYear ?? "XXXX") +
        (artwork.artistName ?? "Unknown"),
    )
    const masterUrl = await downloadImage(artwork.image, imageName)

    const descriptions = await imageToDescription(artwork)
    for (const description of descriptions) {
      const machineUrl = await descriptionToImage(
        description.description,
        imageName,
      )
      artworksWithPromptsAndImages.push({
        prompt: description.description,
        promptOrigin: description.type,
        artwork,
        machineUrl,
        masterUrl,
      })
    }
  }

  //   console.log(artworksWithPromptsAndImages)

  await writeDataFile(
    "questions",
    artworksWithPromptsAndImages,
    z.array(questionSchema),
  )
}

generateQuestions()
