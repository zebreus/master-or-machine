"use client"

import Image from "../../../node_modules/next/image"
import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Tab } from "@/types/Tab"

import { Button } from "@/components/button"
import { ResultSchema } from "../../../scripts/getNumOfRandomArtworksByMovement"
import { useSearchParams } from "next/navigation"
import { camelCase } from "../../../scripts/helpers/camelCase"
import questionsTest from "../../../scripts/data/questionsTest"
import { Answer, Question } from "../../../scripts/generateQuestions"
import answersTest from "../../../scripts/data/answersTest"

enum GameState {
  ROUND = "round",
  RESULT = "result",
}

const wikiMediaImagePrefix = "https://upload.wikimedia.org/wikipedia/commons/"

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
      return ["Impressionism"]
    }
    return movements
  }, [searchParams])
  const numRounds = Number.parseInt(searchParams.get("rounds") || "10")

  // TODO: integrate properly, just for testing
  const questions = shuffle(questionsTest).slice(0, numRounds)
  const answerIds = questions.map((question) => question.id)
  const answers = answersTest.filter((answer) => {
    if (answerIds?.includes(answer.id)) return answer
  })

  const [round, setRound] = useState(1)
  const [gameState, setGameState] = useState(GameState.ROUND)
  // TODO: integrate properly, just for testing
  const [artworks, setArtworks] = useState<Question[] | undefined>(questions)
  const [results, setResults] = useState<Answer[] | undefined>(answers)

  useEffect(() => {
    ;(async () => {
      // TODO: handle error, if movements do not exist (currenty just takes movements from URL)
      /*const artworkPromises = movements.map(
        (movement) =>
          import(`../../../scripts/data/by-movement/${camelCase(movement)}`),
      )
      const artworks = (await Promise.all(artworkPromises)).flatMap(
        (module) => module.default,
      )
      await setArtworks(shuffle(artworks).slice(0, numRounds))*/
    })()
  }, [movements, numRounds])

  // TODO: loading animation
  if (!artworks || !results) return <div>Loading</div>

  // TODO: handle error
  if (artworks.length === 0 || results.length === 0)
    return <div className="text-5xl text-white">No Artworks found</div>

  return (
    <>
      <Header
        currentTab={Tab.GAME}
        round={round}
        roundsTotal={numRounds}
      ></Header>

      <main className="flex max-w-5xl mx-auto">
        <div className="relative flex flex-col py-16 mt-8 items-center justify-center w-full">
          <div className="absolute flex justify-end h-[100%] w-[75%] bg-accentGreen rounded-xl opacity-40"></div>

          {gameState === GameState.ROUND && (
            <>
              <h1 className="z-10 font-semibold text-2xl text-white mb-4">
                Select the Masterpiece
              </h1>

              <article className="z-10 text-slate-300 mb-8">
                Select the image, that matches the description below
              </article>

              <div className="grid grid-cols-2 gap-16 w-full mb-8">
                <div
                  className="cursor-pointer relative h-96 w-full"
                  onClick={() => setGameState(GameState.RESULT)}
                >
                  <Image
                    style={{
                      borderRadius: "10px",
                    }}
                    src={artworks[round - 1].image1}
                    alt="Image to identify"
                    layout="fill"
                    objectFit="cover"
                    sizes="32rem"
                    priority
                  />
                </div>

                <div
                  className="cursor-pointer relative h-96 w-full"
                  onClick={() => setGameState(GameState.RESULT)}
                >
                  <Image
                    style={{
                      borderRadius: "10px",
                    }}
                    src={artworks[round - 1].image2}
                    alt="Image to identify"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <article className="z-10 text-white w-[75%] p-8">
                &quot;{artworks[round - 1].description}&quot;
              </article>
            </>
          )}

          {gameState === GameState.RESULT && (
            <div className="z-10 flex flex-col items-center w-full">
              <h1 className="font-semibold text-2xl text-white mb-4">
                You are correct!
              </h1>

              <article className="text-slate-300 mb-8">
                This is a painting by {results[round - 1].artwork.artistName}
              </article>

              <div className="grid grid-cols-2 gap-16 w-full mb-8">
                <div
                  className="cursor-pointer relative h-96 w-full"
                  onClick={() => setGameState(GameState.RESULT)}
                >
                  <Image
                    style={{
                      borderRadius: "10px",
                    }}
                    src={artworks[round - 1].image1}
                    alt="Image to identify"
                    layout="fill"
                    objectFit="cover"
                    sizes="32rem"
                  />
                </div>

                <div className="flex flex-col z-10 text-white w-[73.5%]">
                  {results[round - 1].artwork.image_of_artist && (
                    <div className="relative h-40 w-32 mb-2">
                      <Image
                        style={{
                          borderRadius: "10px",
                        }}
                        src={
                          results[round - 1].artwork.image_of_artist ||
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
                      <p className="font-semibold text-slate-300">Artist:</p>
                      {results[round - 1].artwork.artistName}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-300">Painting:</p>
                      &quot;{results[round - 1].artwork.paintingLabel}&quot;
                    </div>
                    <div>
                      <p className="font-semibold text-slate-300">Movement:</p>
                      {results[round - 1].artwork.movementLabel}
                    </div>
                  </div>
                </div>
              </div>

              {round < numRounds && (
                <div
                  onClick={() => {
                    setGameState(GameState.ROUND), setRound(round + 1)
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
