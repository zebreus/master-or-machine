"use client"

import { Button } from "./button"

interface ChallengeBannerProps {
  movement: string
  label: string
  exampleArtworkUrl: string
}

export const ChallengeBanner = ({
  movement,
  label,
  exampleArtworkUrl,
}: ChallengeBannerProps) => {
  return (
    <a
      href={`./game?${new URLSearchParams([
        ["rounds", "10"],
        ["movements", movement],
      ])}`}
    >
      <div
        className="cursor-pointer flex justify-center items-center rounded-xl h-72 w-full bg-cover group"
        style={{
          backgroundImage: `url("${exampleArtworkUrl}")`,
        }}
      >
        <div className="flex text-3xl text-white justify-center items-center h-16 w-full bg-accentGreen group-hover:hidden">
          <span>{label}</span>
        </div>
        <div className="flex text-3xl text-white justify-center items-center hidden group-hover:block ">
          <Button buttonText="Play"></Button>
        </div>
      </div>
    </a>
  )
}
