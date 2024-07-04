import { mkdir, writeFile } from "fs/promises"
import { predict } from "replicate-api"
import { z } from "zod"
import { downloadImage } from "./downloadImage"

export const descriptionToImage = async (
  prompt: string,
  filebase: string,
): Promise<{
  file: string
  id: string
}> => {
  if (!process.env.REPLICATE_TOKEN) {
    throw new Error("You need an API token from replicate.com")
  }

  console.log(`✨ Generating image for prompt: `)
  console.log({ prompt })
  const prediction = await predict({
    model: "stability-ai/sdxl", // The model name
    input: {
      width: 1024,
      height: 1024,
      prompt: prompt,
      negative_prompt: "photograph",
      refine: "expert_ensemble_refiner",
      scheduler: "K_EULER",
      lora_scale: 0.6,
      num_outputs: 1,
      guidance_scale: 7.5,
      apply_watermark: false,
      high_noise_frac: 0.8,
      prompt_strength: 0.8,
      num_inference_steps: 25,
      disable_safety_checker: true,
    },
    token: process.env.REPLICATE_TOKEN, // You need a token from replicate.com
    poll: true, // Wait for the model to finish
  })

  console.log("✅ Generated image")
  if (!Array.isArray(prediction.output)) {
    throw new Error("Output is not a string")
  }
  const url = prediction.output[0]
  if (!z.string().parse(url)) {
    throw new Error("Output is not a string")
  }

  const filename = `${filebase}`
  const downloadedImage = await downloadImage(url, filename)
  return {
    file: downloadedImage,
    id: prediction.id,
  }
}
