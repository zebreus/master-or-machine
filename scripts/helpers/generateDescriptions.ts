import { writeFile } from "fs/promises"
import { Artwork } from "../artwork"
import { loadFile, predict } from "replicate-api"

export type ArtworkDescription = {
  /** How this description was generated */
  type: string
  /** The description */
  description: string
}

export const imageToDescription = async (
  artwork: Artwork,
): Promise<ArtworkDescription[]> => {
  const image = await fetch(artwork.image)
  const buffer = await image.arrayBuffer()
  await writeFile("./temp.png", Buffer.from(buffer))

  if (!process.env.REPLICATE_TOKEN) {
    throw new Error("You need an API token from replicate.com")
  }
  console.log("✨ Generating prompt from image for ", artwork.paintingLabel)
  const prediction = await predict({
    model: "methexis-inc/img2prompt", // The model name
    input: { image: await loadFile("./temp.png") }, // The model specific input
    token: process.env.REPLICATE_TOKEN, // You need a token from replicate.com
    poll: true, // Wait for the model to finish
  })

  if (typeof prediction.output !== "string") {
    throw new Error(
      `Output is not a string: ${typeof prediction.output} : ${prediction.output}`,
    )
  }
  console.log(
    "✅ The image shows: ",
    prediction.output.replace(/(\r\n|\n|\r)/gm, ""),
  )
  const descriptionFromImage = {
    type: "prompt extracted from image",
    description: prediction.output.replace(/(\r\n|\n|\r)/gm, ""),
  }

  const manualDescription = {
    type: "Manually build from artwork data",
    description: `${artwork.paintingLabel ?? ""}: An ${artwork.movementLabel ?? ""} painting in the style of ${artwork.artistName ?? ""}, painted in ${artwork.creationYear ?? ""}, ${artwork.movementLabel ?? ""}, ${artwork.description ?? ""}, ${artwork.abstract ?? ""}`,
  }
  return [descriptionFromImage, manualDescription]
}
