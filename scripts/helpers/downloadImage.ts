import { mkdir, writeFile } from "fs/promises"
import { predict } from "replicate-api"
import { z } from "zod"

export const downloadImage = async (
  url: string,
  filestem: string,
): Promise<string> => {
  const directoryPath = `${module.path}/../../public/images`
  await mkdir(directoryPath, { recursive: true })

  const extension = url.split(".").pop()

  const filename = `${filestem}.${extension}`
  const filepath = `${directoryPath}/${filename}`

  const image = await fetch(url)
  const buffer = await image.arrayBuffer()
  await writeFile(filepath, Buffer.from(buffer))

  return `/images/${filename}`
}
