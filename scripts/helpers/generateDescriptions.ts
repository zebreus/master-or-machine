import { writeFile } from "fs/promises"
import { Artwork } from "../artwork"
import { loadFile, predict } from "replicate-api"

export type ArtworkDescription = {
  /** How this description was generated */
  type: string
  /** The description */
  description: string
}

function fillPrompt(prompt: string, value: { [x: string]: string }) {
  return prompt.replace(/\[(.+?)\]/g, (match, p1) => value[p1] || match)
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

  // const manualDescription = {
  //   type: "Manually build from artwork data",
  //   description: `${artwork.paintingLabel ?? ""}: An ${artwork.movementLabel ?? ""} painting in the style of ${artwork.artistName ?? ""}, painted in ${artwork.creationYear ?? ""}, ${artwork.movementLabel ?? ""}, ${artwork.description ?? ""}, ${artwork.abstract ?? ""}`,
  // }

  const promptString = "Write a prompt for the epicrealismxl-lightning-hades model that will help the model to generate a painting that looks like the original. The image to be generated should depict '[depicts]' in the style of [artist] in the style of [movement] from the year [inception]."

  const descriptionString = "Write an artwork description (and nothing else) where you only know the depicts to see and a few more information I will give you. (made in = [made_in], genre = portrait, depicts to see = [depicts]). Don't research more information and write maximum three sentences."

  const descriptionValues = {"made_in": "", "depicts": ""}
  descriptionValues.made_in = artwork.country ? artwork.country : ""
  if (artwork.depicts != null) { descriptionValues.depicts = artwork.depicts }
  else { descriptionValues.depicts = descriptionFromImage.description }

  const promptValues = {"depicts": "", "artist": "", "movement": "", "inception": ""}
  promptValues.artist = artwork.artistName
  promptValues.movement = artwork.movementLabel
  promptValues.inception = artwork.inception ? artwork.inception : ""
  if (artwork.depicts != null) { descriptionValues.depicts = artwork.depicts }
  else { descriptionValues.depicts = descriptionFromImage.description }
  
  const updatedDescriptionString = fillPrompt(descriptionString, descriptionValues)
  const updatedPromptString = fillPrompt(promptString, promptValues)

  const generalInput = {
    top_k: 0,
    top_p: 0.9,
    prompt: "",
    temperature: 0.6,
    length_penalty: 1,
    max_new_tokens: 120,
    prompt_template: "{prompt}",
    presence_penalty: 1.15
  };

  const promptInput = generalInput
  const descriptionInput = generalInput
  promptInput.prompt = updatedPromptString
  descriptionInput.prompt = updatedDescriptionString

  const promptPrediction = await predict({
    model: "meta/meta-llama-3-8b-instruct", // The model name
    input: promptInput, // The model specific input
    token: process.env.REPLICATE_TOKEN, // You need a token from replicate.com
    poll: true, // Wait for the model to finish
  })

  const descriptionPrediction = await predict({
    model: "meta/meta-llama-3-8b-instruct", // The model name
    input: descriptionInput, // The model specific input
    token: process.env.REPLICATE_TOKEN, // You need a token from replicate.com
    poll: true, // Wait for the model to finish
  })

  if (!Array.isArray(promptPrediction.output)) {
    throw new Error(`Output is not a string array: ${typeof promptPrediction.output} : ${promptPrediction.output}`)
  }
  const promptToReturn = promptPrediction.output.join("")
  console.log("✅ prompt: ", promptToReturn)

  if (!Array.isArray(descriptionPrediction.output)) {
    throw new Error(`Output is not a string array: ${typeof descriptionPrediction.output} : ${descriptionPrediction.output}`)
  }
  const descriptionToReturn = descriptionPrediction.output.join("")
  console.log("✅ description: ", descriptionToReturn)
  return []
}
