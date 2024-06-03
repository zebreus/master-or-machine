import classNames from "../../node_modules/classnames/index"
import { Button } from "./button"
import Link from "../../node_modules/next/link"
import { Tab } from "@/types/Tab"
import Image from "../../node_modules/next/image"

interface IProps {
  currentTab: Tab
  round?: number
  roundsTotal?: number
}

export const Header = ({ currentTab, round, roundsTotal }: IProps) => {
  return (
    <div className="grid grid-cols-3 h-16 mb-10 py-4 max-w-7xl mx-auto">
      <Link
        href="/"
        className="flex gap-2 items-center font-semibold text-white"
      >
        <div className="relative h-10 w-10">
          <Image
            alt="Machine hand with brush logo"
            src="/logo-white.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>Master or Machine</div>
      </Link>

      {currentTab !== Tab.GAME && currentTab !== Tab.GAME_SETTINGS && (
        <div className="flex justify-center">
          <Link href="/game-settings">
            <Button buttonText="Play"></Button>
          </Link>
        </div>
      )}

      {currentTab === Tab.GAME && (
        <div className="text-xl text-accentGreen flex items-center justify-center">
          Round {round}/{roundsTotal}
        </div>
      )}

      {currentTab === Tab.GAME_SETTINGS && (
        <div className="text-xl text-accentGreen flex items-center justify-center">
          Choose your settings
        </div>
      )}

      <div className="flex items-center justify-end">
        <Link
          href="leaderboard"
          className={classNames("font-semibold pr-8", {
            "text-accentGreen": currentTab === Tab.LEADERBOARD,
            "text-white": currentTab !== Tab.LEADERBOARD,
          })}
        >
          Leaderboard
        </Link>
        <Link
          href="about"
          className={classNames("font-semibold", {
            "text-accentGreen": currentTab === Tab.ABOUT,
            "text-white": currentTab !== Tab.ABOUT,
          })}
        >
          About
        </Link>
      </div>
    </div>
  )
}
