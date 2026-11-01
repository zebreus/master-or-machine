import { z } from "zod"
import { artworkSchema } from "./artwork"

export const questionSchema = z.object({
  id: z.string(),
  image1: z.string(),
  image2: z.string(),
  description: z.string(),
})

export const answerSchema = z.object({
  id: z.string(),
  artwork: artworkSchema,
  prompt: z.string(),
  result: z.number(),
})

export const movementSchema = z.object({
  id: z.string(),
  name: z.string(),
  questions: z.array(z.string()),
})

export const movementsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
)
