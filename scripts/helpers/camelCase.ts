import { pascalCase } from "./pascalCase"

export const camelCase = (name: string) => {
  const pascalCaseName = pascalCase(name)
  return pascalCaseName.charAt(0).toLowerCase() + pascalCaseName.slice(1)
}
