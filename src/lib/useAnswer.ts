import { Ahgohebhbilyngcklepl as Answer } from "../../public/data/answer/ahgohebhbilyngcklepl"
import { useTypedFetch } from "./genericHooks/useTypedFetch"

/** Use a specific answer. Use useAnswers to get a list of all answers */
export const useAnswer = (answer: string | undefined) => {
  const answers = useTypedFetch<Answer>(
    answer ? `/data/answer/${answer}.json` : "",
  )
  return answers
}
