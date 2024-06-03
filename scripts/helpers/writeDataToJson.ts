import { writeFile } from "fs/promises"
import * as prettier from "prettier"

const pascalCase = (name: string) => {
  return name
    .replace(/[\W_-]+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join("")
}

const camelCase = (name: string) => {
  const pascalCaseName = pascalCase(name)
  return pascalCaseName.charAt(0).toLowerCase() + pascalCaseName.slice(1)
}

/**
 *  Write a json file with the given data and schema.
 *
 * @param name Name of the file/data. In snake case of
 * @param data Data to write to the file.
 */
export const writeJsonFile = async <ResultType>(
  name: string,
  data: ResultType,
) => {
  const fileName = `${camelCase(name)}.json`
  console.log(`Writing ${name} to scripts/data/json/${fileName}`)
  const filePath = `${module.path}/../data/json/${fileName}`

  const jsonString = JSON.stringify(data, null, 0)
  const jsonObject = JSON.parse(jsonString)
  
  let index = 0
  for (const entry of jsonObject) {
    entry.id = index++
  }

  const fileContent = `${JSON.stringify(jsonObject, null, 0)}`

  const options = await prettier.resolveConfig(filePath)
  const formattedContent = await prettier.format(fileContent, {
    ...(options ?? {}),
    parser: "json",
  })

  await writeFile(filePath, formattedContent)
}
