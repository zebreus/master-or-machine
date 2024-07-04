import { Artwork } from "../artwork"
import { loadFile, predict } from "replicate-api"
import { downloadOriginalImage } from "./downloadImage"
import { z } from "zod"

export interface ArtworkDescription {
  prompt: string
  description: string
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
  const descriptionFromImage = await img2prompt(
    artwork.image,
    artwork.paintingLabel,
  )

  const promptPrompt = `
Task 1 of 1:
Write 3 different prompts for an image generation model to replicate the famous painting matching the following keywords as close as possible. The results should NOT look aesthetically pleasing, instead they should replicate the original paintings. You will be graded by how well images created with the prompt replicate the original painting. You will also be awarded an extra point if your second prompt contains more information than the first prompt. Avoid making the result too detailed. Dont forget to include the materials and methods in the prompt

${Object.entries({
  type: "painting",
  name: artwork.paintingLabel.trim(),
  artist: artwork.artistName.trim(),
  main_movement: artwork.movementLabel.trim(),
  painted_in: [artwork.inception, artwork.country].filter((v) => v).join(", "),
  height: artwork.height ? `${artwork.height}cm` : "",
  width: artwork.width ? `${artwork.width}cm` : "",
  keywords: artwork.motifs.join(", "),
  genres: artwork.genres.join(", "),
  material: artwork.materials.join(", "),
})
  .flatMap(([key, value]) =>
    value && value.length ? [`${key}: ${value}`] : [],
  )
  .join("\n")}

Prompt 1: ${descriptionFromImage}

Prompt 2:`

  const prompt = await llama3(promptPrompt, {
    top_p: 0.9,
    temperature: 0.56,
    length_penalty: 0.84,
    max_tokens: 100,
    min_tokens: 0,
    prompt_template: "{prompt}",
    stop_sequences: "Prompt 3",
    presence_penalty: 1.25,
    log_performance_metrics: false,
  })

  const descriptionPrompt = `
Task 1 of 1:
In the lecture you learned how to summarize the content of a painting in one sentence. Write 3 different short description texts for the painting described by the keywords below. The texts will be displayed in a museum next to the painting. You will be graded by how good images created with the prompt replicate the original painting.  You will also be awarded an extra point if your first description text is short and only contains the artist and painting name. You will also be awarded an extra point if your second description text is around 50 words long and does NOT contain the artist and painting name but only focuses on the painting itself.

${Object.entries({
  type: "painting",
  name: artwork.paintingLabel.trim(),
  artist: artwork.artistName.trim(),
  main_movement: artwork.movementLabel.trim(),
  painted_in: [artwork.inception, artwork.country].filter((v) => v).join(", "),
  height: artwork.height ? `${artwork.height}cm` : "",
  width: artwork.width ? `${artwork.width}cm` : "",
  keywords: artwork.motifs.join(", "),
  genres: artwork.genres.join(", "),
  material: artwork.materials.join(", "),
})
  .flatMap(([key, value]) =>
    value && value.length ? [`${key}: ${value}`] : [],
  )
  .join("\n")}

Description 1: The painting ${artwork.paintingLabel.trim()} is by ${artwork.artistName.trim()}.

Description 2:`

  const description = await llama3(descriptionPrompt, {
    top_p: 0.9,
    temperature: 0.85,
    length_penalty: 0.85,
    max_tokens: 200,
    min_tokens: 0,
    prompt_template: "{prompt}",
    stop_sequences: "Description 3",
    presence_penalty: 1.15,
    log_performance_metrics: false,
  })

  const promptAndDescription: ArtworkDescription = {
    prompt: prompt.trim().split("\n")[0],
    description: description.trim().split("\n")[0],
  }
  return promptAndDescription
}
