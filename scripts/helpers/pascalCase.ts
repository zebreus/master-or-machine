export const pascalCase = (name: string) => {
  return name
    .replace(/[\W_-]+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join("")
}
