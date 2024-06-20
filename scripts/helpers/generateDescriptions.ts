import { writeFile } from "fs/promises"
import { Artwork } from "../artwork"
import { loadFile, predict } from "replicate-api"

export interface ArtworkDescription {
  prompt: string
  description: string
}

function fillPrompt(prompt: string, value: { [x: string]: string }) {
  return prompt.replace(/\[(.+?)\]/g, (match, p1) => value[p1] || match)
}

export const imageToDescription = async (
  artwork: Artwork,
): Promise<ArtworkDescription> => {
  const image = await fetch(artwork.image)
  const buffer = await image.arrayBuffer()
  await writeFile("./temp.png", Buffer.from(buffer))

  if (!process.env.REPLICATE_TOKEN) {
    throw new Error("You need an API token from replicate.com")
  }

  // TODO: put into seperate helper!!!
  let descriptionFromImage
  //if (!artwork.depicts || artwork.depicts.length == 0) {
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

  descriptionFromImage = prediction.output.replace(/(\r\n|\n|\r)/gm, "")
  console.log("✅ The image shows: ", descriptionFromImage)
  //}

  const promptString =
    "Write a prompt for the epicrealismxl-lightning-hades model that will help the model to generate a painting that looks like the original. The image to be generated should depict '[depicts]' in the style of [artist] in the style of [movement] from the year [inception]."

  // JÖRN CURRENT
  //const descriptionString =
  //  "Write an artwork description (and nothing else) where you only know the depicts to see and a few more information I will give you. (made in = [made_in], genre = portrait, depicts to see = [depicts]). Don't research more information and write maximum three sentences."

  // SUNNI CURRENT
  const descriptionString =
    "Write me a short description in just one sentence of the painting [label]. Only describe what is seen on the painting, do not mention the artist or the name of the artwork. Only return the one sentence description, and nothing else."

  /*const descriptionValues = { made_in: "", depicts: "" }
  descriptionValues.made_in = artwork.country ? artwork.country : ""
  if (artwork.depicts != null) {
    descriptionValues.depicts = artwork.depicts
  } else {
    descriptionValues.depicts = descriptionFromImage.description
  }*/
  const descriptionValues = { label: "" }
  descriptionValues.label = artwork.paintingLabel

  const promptValues = { depicts: "", artist: "", movement: "", inception: "" }
  promptValues.artist = artwork.artistName
  promptValues.movement = artwork.movementLabel
  promptValues.inception = artwork.inception ? artwork.inception : ""
  if (artwork.depicts != null) {
    promptValues.depicts = artwork.depicts.join(" ")
  } else {
    promptValues.depicts = descriptionFromImage.description
  }

  const updatedDescriptionString = fillPrompt(
    descriptionString,
    descriptionValues,
  )
  const updatedPromptString = fillPrompt(promptString, promptValues)

  const generalInput = {
    top_k: 0,
    top_p: 0.9,
    prompt: "",
    temperature: 0.6,
    //temperature: 0.9,
    //length_penalty: 1,
    length_penalty: 0.5,
    max_new_tokens: 120,
    prompt_template: "{prompt}",
    presence_penalty: 1.15,
  }

  const promptInput = generalInput
  const descriptionInput = generalInput
  promptInput.prompt = updatedPromptString
  descriptionInput.prompt = updatedDescriptionString

  const promptPrediction = await predict({
    model: "meta/meta-llama-3-8b-instruct", // The model name
    //model: "meta/meta-llama-3-8b", // The model name
    input: promptInput, // The model specific input
    token: process.env.REPLICATE_TOKEN, // You need a token from replicate.com
    poll: true, // Wait for the model to finish
  })

  const descriptionPrediction = await predict({
    model: "meta/meta-llama-3-8b-instruct", // The model name
    //model: "meta/meta-llama-3-8b", // The model name
    input: descriptionInput, // The model specific input
    token: process.env.REPLICATE_TOKEN, // You need a token from replicate.com
    poll: true, // Wait for the model to finish
  })

  if (!Array.isArray(promptPrediction.output)) {
    throw new Error(
      `Output is not a string array: ${typeof promptPrediction.output} : ${promptPrediction.output}`,
    )
  }
  const promptToReturn = promptPrediction.output.join("")
  console.log("✅ prompt: ", promptToReturn)

  if (!Array.isArray(descriptionPrediction.output)) {
    throw new Error(
      `Output is not a string array: ${typeof descriptionPrediction.output} : ${descriptionPrediction.output}`,
    )
  }
  const descriptionToReturn = descriptionPrediction.output.join("")
  console.log("✅ description: ", descriptionToReturn)

  const promptAndDescription: ArtworkDescription = {
    //prompt: promptToReturn,
    //description: descriptionToReturn,
    prompt:
      `Painting in the style of ${artwork.artistName}. ` +
      promptToReturn.split(".")[0],
    description:
      descriptionFromImage.split(",")[0] +
      ". " +
      descriptionToReturn.split(".")[0],
  }
  return promptAndDescription
}
