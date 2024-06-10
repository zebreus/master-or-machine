import { mkdir, writeFile } from "fs/promises"
import { predict } from "replicate-api"
import sharp from "sharp"
import { z } from "zod"

export const downloadImage = async (
  url: string,
  filestem: string,
): Promise<string> => {
  const directoryPath = `${module.path}/../../public/images`
  await mkdir(directoryPath, { recursive: true })

  const image = await fetch(url)
  const buffer = await image.arrayBuffer()

  const extension = url.split(".").pop()
  const rawFilename = `${filestem}_raw.${extension}`
  const rawFilepath = `${directoryPath}/${rawFilename}`
  const sharpFilename = `${filestem}.webp`
  const sharpFilepath = `${directoryPath}/${sharpFilename}`

  // Use sharp to crop the image to a square
  const metadata = await sharp(buffer).metadata()
  const { width, height } = metadata
  if (!width || !height) {
    throw new Error("Could not read image metadata.")
  }
  // Calculate the size of the square crop
  // Subtract 10% to remove any borders the original image might have
  const minSize = Math.floor(Math.min(width, height) * 0.9)
  // Calculate the top and left coordinates for the crop
  const left = Math.floor((width - minSize) / 2)
  const top = Math.floor((height - minSize) / 2)
  await sharp(buffer)
    .extract({ width: minSize, height: minSize, left: left, top: top })
    // Resize the image to 512x512 to have a comparable size and make the machine image less obvious
    .resize(512, 512)
    .toFormat("webp")
    .toFile(sharpFilepath)

  // // Use this if sharp is not available

  await writeFile(rawFilepath, Buffer.from(buffer))

  return `/images/${sharpFilename}`
}
