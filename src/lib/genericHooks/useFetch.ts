import { useEffect, useMemo, useState } from "react"

export const useFetch = (url: string, defaultValue?: string) => {
  const [result, setResult] = useState<{ url: string; content: string }>()

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
      const content = await response.text()
      setResult({ url, content })
    }
    asyncFn()
  }, [url])

  const contentOrDefault = useMemo(() => {
    return url === result?.url ? result?.content : defaultValue
  }, [url, result])

  return contentOrDefault
}
