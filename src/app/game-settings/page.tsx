"use client"

import { Button } from "@/components/button"
import { Header } from "@/components/header"
import { Tab } from "@/types/Tab"
import { useState } from "react"
import Image from "../../../node_modules/next/image"
import { useRouter } from "../../../node_modules/next/navigation"

export default function Component() {
  const minRounds = 1
  const maxRounds = 10

  const router = useRouter()

  const [rounds, setRounds] = useState<number>(1)
  const [movements, setMovements] = useState<string[]>([])
  const [fetchedMovements, setFetchedMovements] = useState<string[]>([])

  const addRound = () => {
    if (rounds < maxRounds) {
      setRounds(rounds + 1)
    }
  }

  const subRound = () => {
    if (rounds > minRounds) {
      setRounds(rounds - 1)
    }
  }

  const handleSearch = async (searchString: string) => {
    if (searchString !== "") {
      // TODO: remove, when actual token is set
      const tmpToken = "aSampleMasterKey"
      try {
        const data = await (
          await fetch("http://localhost:7700/indexes/movements/search", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tmpToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              q: searchString,
            }),
          })
        ).json()

        if (data.hits) {
          const movementLabels = []
          for (const entry of data.hits) {
            movementLabels.push(entry.movementLabel)
          }
          setFetchedMovements(movementLabels)
        }
      } catch (err) {
        console.log("Search failed: " + err)
      }
    } else {
      setFetchedMovements([])
    }
  }

  const handleMovementSelection = (movement: string) => {
    const currentMovements = movements

    if (!movements.includes(movement)) {
      currentMovements.push(movement)
      setMovements(currentMovements)
    } else {
      currentMovements.splice(movements.indexOf(movement), 1)
      setMovements(currentMovements)
    }

    setFetchedMovements([])
  }

  return (
    <>
      <Header currentTab={Tab.GAME_SETTINGS}></Header>

      <main className="relative flex flex-col justify-center max-w-5xl mx-auto rounded-xl border-4 border-accentGreen p-8">
        <div className="z-0 absolute left-0 bg-accentGreen opacity-10 h-full w-full"></div>

        <div className="z-10">
          <div className="relative h-40 w-full mb-8">
            <Image
              alt="Machine hand with brush logo"
              src="/logo.png"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-8 mb-16">
            <div className="flex items-center text-accentGreen text-xl">
              <div>Rounds:</div>
              <div className="flex justify-center w-12">{rounds}</div>
              <div className="flex flex-row-reverse gap-2">
                <Button buttonText="+" clicked={() => addRound()}></Button>
                <Button buttonText="-" clicked={() => subRound()}></Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-accentGreen text-xl">Movements:</div>

              <div className="relative text-xl">
                <input
                  className="bg-darkBg text-white border p-2 border-accentGreen rounded-xl"
                  type="text"
                  placeholder="Search for movements"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {movements}
                <div className="absolute mt-2 flex flex-col rounded-xl bg-darkBg border border-accentGreen">
                  {fetchedMovements.map((movement, index) => (
                    <div
                      key={index}
                      className="cursor-pointer text-accentGreen p-2 break-words"
                      onClick={() => handleMovementSelection(movement)}
                    >
                      {movement}
                    </div>
                  ))}
                </div>
              </div>

              <Button buttonText="All"></Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 w-[70%]">
              {movements.map((movement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white rounded-xl text-accentGreen p-2"
                >
                  <div
                    className="cursor-pointer rounded-[100%] leading-[0.5] text-lg text-white bg-accentGreen p-1"
                    onClick={() => handleMovementSelection(movement)}
                  >
                    -
                  </div>
                  <div>{movement}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              buttonText="Play"
              size="big"
              clicked={() =>
                router.push(
                  `./game?rounds=${rounds}&movements=${movements.length > 0 ? movements : "all"}`,
                )
              }
            ></Button>
          </div>
        </div>
      </main>
    </>
  )
}
