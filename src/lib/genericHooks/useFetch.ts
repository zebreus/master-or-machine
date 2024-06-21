import { useEffect, useState } from "react"

export const useFetch = (url: string) => {
  const [result, setResult] = useState<string>()

  useEffect(() => {
    const asyncFn = async () => {
      if (!url) {
        setResult(undefined)
        return
      }
      const response = await fetch(url)
      if (!response.ok) {
        console.error("Failed to fetch ", url)
        setResult(undefined)
        return
      }
      const result = await response.text()
      setResult(result)
    }
    asyncFn()
  }, [url])

  return result
}
