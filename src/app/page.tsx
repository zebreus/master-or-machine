"use client"

import { ChallengeBanner } from "@/components/challenge-banner"
import { Header } from "@/components/header"
import { Tab } from "@/types/Tab"

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
            exampleArtworkUrl="impressionism-banner.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="expressionism"
            label="Expressionism"
            exampleArtworkUrl="expressionism-banner.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="artNouveau"
            label="Art Nouveau"
            exampleArtworkUrl="art-nouveau-banner.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="neoclassicism"
            label="Neoclassicism"
            exampleArtworkUrl="neoclassicism-banner.jpeg"
          ></ChallengeBanner>
        </div>

        <h1 className="text-xl text-accentGreen mt-16 mb-2">
          2026 rematch: made with ChatGPT
        </h1>
        <p className="text-slate-300 mb-8">
          The same paintings as above, but recreated by ChatGPT. Plus two new
          experiments: in The Forger, ChatGPT copies the painting it sees. In
          From Memory, it only gets the title and the artist.
        </p>

        <div className="grid grid-cols-2 gap-12 w-full mb-16">
          <ChallengeBanner
            movement="impressionismChatgpt"
            label="Impressionism"
            exampleArtworkUrl="impressionism-chatgpt-banner.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="expressionismChatgpt"
            label="Expressionism"
            exampleArtworkUrl="expressionism-chatgpt-banner.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="artNouveauChatgpt"
            label="Art Nouveau"
            exampleArtworkUrl="art-nouveau-chatgpt-banner.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="neoclassicismChatgpt"
            label="Neoclassicism"
            exampleArtworkUrl="neoclassicism-chatgpt-banner.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="theForger"
            label="The Forger"
            exampleArtworkUrl="the-forger-banner.jpeg"
          ></ChallengeBanner>
          <ChallengeBanner
            movement="fromMemory"
            label="From Memory"
            exampleArtworkUrl="from-memory-banner.jpeg"
          ></ChallengeBanner>
        </div>
      </main>
    </>
  )
}
