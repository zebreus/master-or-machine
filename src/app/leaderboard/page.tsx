import { Header } from "@/components/header"
import { Player } from "@/components/player"
import { Tab } from "@/types/Tab"

export default function Component() {
  return (
    <>
      <Header currentTab={Tab.LEADERBOARD}></Header>

      <main className="flex flex-col justify-center max-w-5xl mx-auto">
        <h1 className="text-xl text-accentGreen mb-8">Current Leaderborad</h1>

        <div className="flex flex-wrap items-center gap-y-8">
          <Player place={1} playerName="cool_dude_9000" score={12345}></Player>
          <Player place={2} playerName="cool_dude_9000" score={12345}></Player>
          <Player place={3} playerName="cool_dude_9000" score={12345}></Player>
          <Player place={4} playerName="cool_dude_9000" score={12345}></Player>
          <Player place={5} playerName="cool_dude_9000" score={12345}></Player>
        </div>
      </main>
    </>
  )
}
