export const randomString = (length: number) => {
  return [...Array(length)]
    .map(() => String.fromCodePoint(Math.round(97 + Math.random() * 25)))
    .join("")
}
