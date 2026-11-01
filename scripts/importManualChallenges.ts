import { readFile } from "fs/promises"
import { z } from "zod"
import { artworkSchema } from "./artwork"
import { saveImage } from "./helpers/downloadImage"
import { randomString } from "./helpers/randomString"
import { writeDataFile } from "./helpers/writeDataFile"
import {
  answerSchema,
  movementSchema,
  movementsSchema,
  questionSchema,
} from "./schemas"
import movements from "../public/data/movements"

/**
 * Challenges where the AI work was done by hand (e.g. in the ChatGPT web app)
 * instead of by generateQuestions.ts. Paths point to local image files.
 */
const manualChallengesSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    questions: z.array(
      z.object({
        artwork: artworkSchema,
        original: z.string(),
        generated: z.string(),
        prompt: z.string(),
        description: z.string(),
      }),
    ),
  }),
)

const importImage = async (path: string, questionId: string) =>
  saveImage(
    await readFile(path),
    `${questionId}-${randomString(5)}`,
    path.split(".").pop(),
  )

const importManualChallenges = async (file: string) => {
  const challenges = manualChallengesSchema.parse(
    JSON.parse(await readFile(file, "utf8")),
  )

  for (const challenge of challenges) {
    const questionIds: string[] = []
    for (const question of challenge.questions) {
      const id = randomString(20)
      const masterUrl = await importImage(question.original, id)
      const generatedUrl = await importImage(question.generated, id)

      // ensure random order of the two images
      const images = [masterUrl, generatedUrl].sort()

      await writeDataFile(
        `question/${id}`,
        {
          id,
          image1: images[0],
          image2: images[1],
          description: question.description,
        },
        questionSchema,
      )
      await writeDataFile(
        `answer/${id}`,
        {
          id,
          artwork: question.artwork,
          prompt: question.prompt,
          result: images.indexOf(masterUrl),
        },
        answerSchema,
      )
      questionIds.push(id)
    }
    await writeDataFile(
      `movement/${challenge.id}`,
      { id: challenge.id, name: challenge.name, questions: questionIds },
      movementSchema,
    )
  }

  await writeDataFile(
    "movements",
    [
      ...movements.filter((m) => !challenges.some((c) => c.id === m.id)),
      ...challenges.map(({ id, name }) => ({ id, name })),
    ],
    movementsSchema,
  )
}

importManualChallenges(process.argv[2])
