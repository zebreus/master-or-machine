"use client"

import { useRouter } from "../../node_modules/next/navigation"
import { useState } from "react"
import { Button } from "./button"

interface IProps {
  bannerText: string
}

export const ChallengeBanner = ({ bannerText }: IProps) => {
  const router = useRouter()
  const [hover, setHover] = useState(false)

  return (
    <div
      className="cursor-pointer flex justify-center items-center rounded-xl h-72 w-full bg-cover"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push("./game-settings")}
      style={{
        backgroundImage: `url("placeholder-artwork.jpeg")`,
      }}
    >
      {!hover && (
        <div className="flex text-3xl text-white justify-center items-center h-16 w-full bg-accentGreen">
          {bannerText}
        </div>
      )}

      {hover && (
        <div className="flex text-3xl text-white justify-center items-center">
          <Button buttonText="Play"></Button>
        </div>
      )}
    </div>
  )
}
