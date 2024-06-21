import { useEffect, useState } from "react"

export const useImport = <ExpectedType>(path: string) => {
  const [result, setResult] = useState<ExpectedType>()

  useEffect(() => {
    const asyncFn = async () => {
      if (!path) {
        setResult(undefined)
        return
      }
      try {
        const response = await import(path)
        if (!response) {
          console.error("Failed to import ", path)
          setResult(undefined)
          return
        }
        setResult(result as ExpectedType)
      } catch (e) {
        console.error(e)
        console.error("Failed to fetch ", path)
        setResult(undefined)
        return
      }
    }
    asyncFn()
  }, [path])

  return result
}
