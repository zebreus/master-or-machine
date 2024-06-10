import { mkdir, writeFile } from "fs/promises"
import { predict } from "replicate-api"
import { z } from "zod"
import { downloadImage } from "./downloadImage"

export const descriptionToImage = async (
  prompt: string,
  filebase: string,
): Promise<string> => {
  if (!process.env.REPLICATE_TOKEN) {
    throw new Error("You need an API token from replicate.com")
  }

  console.log("✨ Generating image for prompt: ", prompt)
  const prediction = await predict({
    model: "fofr/epicrealismxl-lightning-hades", // The model name
    input: {
      width: 1024,
      height: 1024,
      prompt: prompt,
      output_format: "webp",
      output_quality: 80,
      negative_prompt: "",
      number_of_images: 1,
      disable_safety_checker: true,
    },
    token: process.env.REPLICATE_TOKEN, // You need a token from replicate.com
    poll: true, // Wait for the model to finish
  })

  console.log(prediction.output)
  if (!Array.isArray(prediction.output)) {
    throw new Error("Output is not a string")
  }
  const url = prediction.output[0]
  if (!z.string().parse(url)) {
    throw new Error("Output is not a string")
  }

  const filename = `${filebase}_${prediction.id}`
  return await downloadImage(url, filename)
}
