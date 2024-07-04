"use client"

import { ChallengeBanner } from "@/components/challenge-banner"
import { Header } from "@/components/header"
import { useMovements } from "@/lib/useMovements"
import { Tab } from "@/types/Tab"
import { useMemo } from "react"

export default function Component() {
  return (
    <>
      <Header currentTab={Tab.HOME}></Header>

      <main className="flex flex-col max-w-5xl mx-auto">
        <h1 className="text-xl text-accentGreen mb-8">
          Most popular challenges
        </h1>

        <div className="grid grid-cols-2 gap-12 w-full">
          <ChallengeBanner
            movement="impressionism"
            label="Impressionism"
            exampleArtworkUrl="placeholder-artwork.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="expressionism"
            label="Expressionism"
            exampleArtworkUrl="placeholder-artwork.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="artNouveau"
            label="Art Nouveau"
            exampleArtworkUrl="placeholder-artwork.jpeg"
          ></ChallengeBanner>
        </div>
      </main>
    </>
  )
}
