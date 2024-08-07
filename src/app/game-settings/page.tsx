"use client"

import { Button } from "@/components/button"
import { Header } from "@/components/header"
import { Tab } from "@/types/Tab"
import { useMemo, useState } from "react"
import Image from "../../../node_modules/next/image"
import allMovements from "../../../public/data/movements"
import Fuse from "fuse.js"
import logo from "@/../public/logo.png"

const minRounds = 1
const defaultRounds = 10
const maxRounds = 10

export default function Component() {
  const movementSearch = useMemo(
    () =>
      new Fuse(allMovements, {
        keys: ["name"],
      }),
    [],
  )

  const [rounds, setRounds] = useState(defaultRounds)
  const [searchTerm, setSearchTerm] = useState("")
  const [movements, setMovements] = useState<
    Array<{ id: string; name: string }>
  >([])
  const suggestedMovements = useMemo(
    () => movementSearch.search(searchTerm).map((result) => result.item),
    [searchTerm, movementSearch],
  )

  return (
    <>
      <Header currentTab={Tab.GAME_SETTINGS}></Header>

      <main className="relative flex flex-col justify-center max-w-5xl mx-auto rounded-xl border-4 border-accentGreen p-8">
        <div className="z-0 absolute left-0 bg-accentGreen opacity-10 h-full w-full"></div>

        <div className="z-10">
          <div className="relative h-40 w-full mb-8">
            <Image
              alt="Machine hand with brush logo"
              src={logo}
              className="object-contain"
              fill
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-8 mb-16">
            <div className="flex items-center text-accentGreen text-xl">
              <div>Rounds:</div>
              <div className="flex justify-center w-12">{rounds}</div>
              <div className="flex flex-row-reverse gap-2">
                <Button
                  buttonText="+"
                  clicked={() => setRounds(Math.min(rounds + 1, maxRounds))}
                ></Button>
                <Button
                  buttonText="-"
                  clicked={() => setRounds(Math.max(rounds - 1, minRounds))}
                ></Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-accentGreen text-xl">Movements:</div>

              <div className="relative text-xl">
                <input
                  className="bg-darkBg text-white border p-2 border-accentGreen rounded-xl"
                  type="text"
                  placeholder="Search for movements"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {suggestedMovements.length ? (
                  <div className="absolute mt-2 flex flex-col rounded-xl bg-darkBg border border-accentGreen">
                    {suggestedMovements.map((movement) => (
                      <div
                        key={movement.id}
                        className="cursor-pointer text-accentGreen p-2 break-words"
                        onClick={() => {
                          setMovements([...new Set([...movements, movement])])
                          setSearchTerm("")
                        }}
                      >
                        {movement.name}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 w-[70%]">
              {movements.map((movement) => (
                <div
                  key={movement.id}
                  className="flex items-center gap-2 bg-white rounded-xl text-accentGreen p-2"
                >
                  <div
                    className="cursor-pointer rounded-[100%] leading-[0.5] text-lg text-white bg-accentGreen p-1"
                    onClick={() => {
                      setMovements(
                        movements.filter((m) => m.id !== movement.id),
                      )
                    }}
                  >
                    -
                  </div>
                  <div>{movement.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href={`./game?${new URLSearchParams([["rounds", "" + rounds], ...movements.map((m) => ["movements", m.id])]).toString()}`}
            >
              <Button
                buttonText="Play"
                size="big"
                disabled={!movements.length}
              ></Button>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
