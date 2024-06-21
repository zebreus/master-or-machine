import { writeFile } from "fs/promises"
import { Artwork } from "../artwork"
import { loadFile, predict } from "replicate-api"
import { downloadOriginalImage } from "./downloadImage"
import { z } from "zod"

export interface ArtworkDescription {
  prompt: string
  description: string
}

function fillPrompt(prompt: string, value: { [x: string]: string }) {
  return prompt.replace(/\[(.+?)\]/g, (match, p1) => value[p1] || match)
}

const img2prompt = async (url: string, paintingLabel: string) => {
  const tempImage = await downloadOriginalImage(url, "./temp")

  if (!process.env.REPLICATE_TOKEN) {
    throw new Error("You need an API token from replicate.com")
  }

  // TODO: put into seperate helper!!!
  let descriptionFromImage
  //if (!artwork.depicts || artwork.depicts.length == 0) {
  console.log("✨ Generating prompt from image for ", paintingLabel)
  const prediction = await predict({
    model: "methexis-inc/img2prompt", // The model name
    input: { image: await loadFile(tempImage) }, // The model specific input
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
  return descriptionFromImage
}

const llama3 = async (
  prompt: string,
  generalInput: any = {
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
  },
) => {
  if (!process.env.REPLICATE_TOKEN) {
    throw new Error("You need an API token from replicate.com")
  }
  console.log("✨ llama 3 prompt: ", prompt)

  const result = await predict({
    model: "meta/meta-llama-3-70b", // The model name
    //model: "meta/meta-llama-3-8b", // The model name
    input: { ...generalInput, prompt }, // The model specific input
    token: process.env.REPLICATE_TOKEN, // You need a token from replicate.com
    poll: true, // Wait for the model to finish
  })

  try {
    const parsedOutput = z.array(z.string()).parse(result.output)
    const joinedOutput = parsedOutput.join("")
    console.log("✅ llama 3 result: ", joinedOutput)

    return joinedOutput
  } catch (e) {
    throw new Error(
      `Output is not a string array: ${typeof result.output} : ${result.output}`,
    )
  }
}

export const imageToDescription = async (
  artwork: Artwork,
): Promise<ArtworkDescription> => {
  //}
  const descriptionFromImage = await img2prompt(
    artwork.image,
    artwork.paintingLabel,
  )

  const depictsIsString = z.string().safeParse(artwork.depicts)
  const depictsIsStringArray = z.array(z.string()).safeParse(artwork.depicts)
  const depicts = depictsIsString.success
    ? depictsIsString.data
    : depictsIsStringArray.success
      ? depictsIsStringArray.data.join(" ")
      : ""

  const promptString =
    "Write a prompt for the epicrealismxl-lightning-hades model that will help the model to generate a painting that looks like the original. The image to be generated should depict '[depicts]' in the style of [artist] in the style of [movement] from the year [inception]."

  const inception = artwork.inception ? artwork.inception.trim() : ""
  const zebreusPrompt = `
Task 1 of 1:
In the lecture you learned how to write good prompts for image generation models. Write 3 different prompts for an image generation model to replicate the famous painting matching the following keywords as close as possible. You will be graded by how good images created with the prompt replicate the original painting. You will also be awarded an extra point if your prompts use very different approaches.

artist: ${artwork.artistName.trim()}
name: ${artwork.paintingLabel.trim()}
movement: ${artwork.movementLabel.trim()}${inception ? `\ninception: ${inception}` : ""}
content: ${depicts || "unknown"}

Prompt 1: ${descriptionFromImage}
Prompt 2:
`

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

  promptValues.depicts = depicts || descriptionFromImage

  const updatedDescriptionString = fillPrompt(
    descriptionString,
    descriptionValues,
  )
  const updatedPromptString = fillPrompt(promptString, promptValues)

  const promptToReturn = await llama3(zebreusPrompt, {
    top_p: 0.9,
    temperature: 0.85,
    length_penalty: 0.9,
    max_tokens: 100,
    min_tokens: 0,
    prompt_template: "{prompt}",
    stop_sequences: "Prompt 3",
    presence_penalty: 1.15,
    log_performance_metrics: false,
  })
  const descriptionToReturn = await llama3(updatedDescriptionString)

  const promptAndDescription: ArtworkDescription = {
    prompt: promptToReturn.trim().split("\n")[0],
    description:
      descriptionFromImage.split(",")[0] +
      ". " +
      descriptionToReturn.split(".")[0],
  }
  return promptAndDescription
}
