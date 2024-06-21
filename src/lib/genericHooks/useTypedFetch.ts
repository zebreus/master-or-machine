import { useEffect, useMemo, useState } from "react"
import { useFetch } from "./useFetch"
// import { z } from "zod"

export const useTypedFetch = <ResponseType>(
  url: string,
  // schema: z.ZodType<ResponseType>,
) => {
  const result = useFetch(url)

  const validatedResult = useMemo(() => {
    if (!result) {
      return undefined
    }
    try {
      const jsonResult = JSON.parse(result)
      // const validatedResult = schema.parse(jsonResult)
      return jsonResult as ResponseType
    } catch (e) {
      console.error(e)
      return undefined
    }
  }, [result])

  return validatedResult
}
