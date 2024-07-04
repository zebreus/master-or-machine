"use client"

import Image from "../../../node_modules/next/image"
import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Tab } from "@/types/Tab"

import { Button } from "@/components/button"
import { useSearchParams } from "next/navigation"
import { Answer, Question } from "../../../scripts/generateQuestions"
import classNames from "../../../node_modules/classnames/index"
import { useMovement } from "@/lib/useMovement"
import { useQuestion } from "@/lib/useQuestion"
import { useAnswer } from "@/lib/useAnswer"

enum GameState {
  ROUND = "round",
  RESULT = "result",
}

const aiArtists: string[] = [
  "Canvas Commander",
  "Pixel Pundit",
  "Doodle Dynamo",
  "Artotron 3000",
  "Paint Prodigy",
  "Scribble Savant",
  "BrushBot",
  "Palette Pal",
  "Stroke Genius",
  "Color Crafter",
]

const randomizeCase = (input: string): string => {
  return input
    .split("")
    .map((char) => {
      // Randomly decide if the character should be upper or lower case
      return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
    })
    .join("")
}

const shuffle = (array: any[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default function Component() {
  const searchParams = useSearchParams()
  const movements = useMemo(() => {
    const movementParams = searchParams.get("movements")
    const movements: string[] = movementParams ? movementParams.split(",") : []
    if (movements.length === 0) {
      return ["impressionism"]
    }
    return movements
  }, [searchParams])
  const roundsFromUrl = Number.parseInt(searchParams.get("rounds") || "10")

  const [round, setRound] = useState(1)
  const [gameState, setGameState] = useState<{
    state: GameState
    selected: number
  }>({ state: GameState.ROUND, selected: -1 })
  // TODO: integrate properly, just for testing
  const movement = useMovement(movements[0])
  const questionIds = movement?.questions.slice(0, roundsFromUrl)
  const questionId = questionIds?.[round - 1]

  const question = useQuestion(questionId)
  const answer = useAnswer(questionId)

  // TODO: handle error
  if (questionIds && questionIds.length === 0)
    return <div className="text-5xl text-white">No Artworks found</div>

  // TODO: loading animation
  if (!question || !answer) return <div>Loading</div>

  return (
    <>
      <Header
        currentTab={Tab.GAME}
        round={round}
        roundsTotal={roundsFromUrl}
      ></Header>

      <main className="flex max-w-5xl mx-auto">
        <div className="relative flex flex-col py-16 mt-8 items-center justify-center w-full">
          <div className="absolute flex justify-end h-[100%] w-[75%] bg-accentGreen rounded-xl opacity-40"></div>

          {gameState.state === GameState.ROUND && (
            <>
              <h1 className="z-10 text-center font-semibold text-2xl text-white mb-4">
                Select the Masterpiece
              </h1>

              <article className="z-10 text-slate-300 text-center mb-8">
                Select the image, that matches the description below
              </article>

              <div className="grid grid-cols-2 gap-16 w-full mb-8">
                <div
                  className="cursor-pointer relative h-96 w-full"
                  onClick={() =>
                    setGameState({ state: GameState.RESULT, selected: 0 })
                  }
                >
                  <Image
                    style={{
                      borderRadius: "10px",
                    }}
                    src={question.image1}
                    alt="Image to identify"
                    layout="fill"
                    objectFit="cover"
                    sizes="32rem"
                    priority
                  />
                </div>

                <div
                  className="cursor-pointer relative h-96 w-full"
                  onClick={() =>
                    setGameState({ state: GameState.RESULT, selected: 1 })
                  }
                >
                  <Image
                    style={{
                      borderRadius: "10px",
                    }}
                    src={question.image2}
                    alt="Image to identify"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <article className="z-10 text-center text-white w-[75%] p-8">
                &quot;{question.description}&quot;
              </article>
            </>
          )}

          {gameState.state === GameState.RESULT && (
            <div className="z-10 flex flex-col items-center w-full">
              {gameState.selected === answer.result && (
                <div>
                  <h1 className="font-semibold text-center text-2xl text-white mb-4">
                    You are correct!
                  </h1>

                  <article className="text-slate-300 text-center mb-8">
                    This is a painting by {answer.artwork.artistName}
                  </article>
                </div>
              )}

              {gameState.selected !== answer.result && (
                <div>
                  <h1 className="font-semibold text-center text-2xl text-white mb-4">
                    Sorry! You&apos;ve been fooled!
                  </h1>

                  <article className="text-slate-300 text-center mb-8">
                    This painting was created by an AI.
                  </article>
                </div>
              )}

              <div className="grid grid-cols-2 gap-16 w-full mb-8">
                <div
                  className={classNames("cursor-pointer relative h-96 w-full", {
                    "order-2": gameState.selected === 1,
                  })}
                >
                  <Image
                    style={{
                      borderRadius: "10px",
                    }}
                    src={
                      gameState.selected === 0
                        ? question.image1
                        : question.image2
                    }
                    alt="Selected image"
                    layout="fill"
                    objectFit="cover"
                    sizes="32rem"
                  />
                </div>

                <div
                  className={classNames("flex w-full", {
                    "justify-end": gameState.selected === 1,
                  })}
                >
                  <div
                    className={classNames(
                      "flex flex-col z-10 text-white w-[73.5%] px-8",
                      {
                        "order-1": gameState.selected === 1,
                      },
                    )}
                  >
                    {gameState.selected === answer.result && (
                      <div>
                        {answer.artwork.image_of_artist && (
                          <div className="relative h-40 w-32 mb-2">
                            <Image
                              style={{
                                borderRadius: "10px",
                              }}
                              src={
                                answer.artwork.image_of_artist ||
                                "/placeholder.svg"
                              }
                              alt="Image to identify"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        )}

                        <div className="flex flex-col gap-y-1">
                          <div>
                            <p className="font-semibold text-slate-300">
                              Artist:
                            </p>
                            {answer.artwork.artistName}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-300">
                              Painting:
                            </p>
                            &quot;{answer.artwork.paintingLabel}
                            &quot;
                          </div>
                          <div>
                            <p className="font-semibold text-slate-300">
                              Movement:
                            </p>
                            {answer.artwork.movementLabel}
                          </div>
                        </div>
                      </div>
                    )}

                    {gameState.selected !== answer.result && (
                      <div>
                        <div className="relative h-40 w-32 mb-2">
                          <Image
                            alt="Machine hand with brush logo"
                            src="/logo.png"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>

                        <div className="flex flex-col gap-y-1">
                          <div>
                            <p className="font-semibold text-slate-300">
                              Artist:
                            </p>
                            &lt;{aiArtists[Math.floor(Math.random() * 10)]}&gt;
                          </div>
                          <div>
                            <p className="font-semibold text-slate-300">
                              Prompt:
                            </p>
                            &quot;{answer.prompt}
                            &quot;
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {round < roundsFromUrl && (
                <div
                  onClick={() => {
                    setGameState({ state: GameState.ROUND, selected: -1 }),
                      setRound(round + 1)
                  }}
                >
                  <Button buttonText="Next" color="dark"></Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
