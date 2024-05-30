import Image from "../../node_modules/next/image"

interface IProps {
  place: number
  playerName: string
  score: number
}

export const Player = ({ place, playerName, score }: IProps) => {
  return (
    <div className="flex px-4 py-2 text-xl text-white justify-between items-center w-full rounded-xl bg-accentGreen">
      <div className="flex gap-x-2 items-center">
        <div>#{place}</div>
        <Image
          src="/default-profile.png"
          alt="Standard profile image"
          height={64}
          width={64}
        />
        <div>{playerName}</div>
      </div>
      <div>Score: {score}</div>
    </div>
  )
}
