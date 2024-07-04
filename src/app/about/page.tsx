"use client"

import Image from "../../../node_modules/next/image"
import { Header } from "@/components/header"
import { Tab } from "@/types/Tab"
import logo from "@/../public/logo.png"

export default function Component() {
  return (
    <>
      <Header currentTab={Tab.ABOUT}></Header>

      <main className="flex max-w-5xl mx-auto">
        <div className="grid grid-cols-3 mt-16">
          <div className="col-span-2 flex flex-col gap-16">
            <div>
              <h1 className="text-5xl text-accentGreen mb-8">
                What is Master or Machine?
              </h1>
              <article className="text-white">
                Master or Machine is a game developed to test your art knowledge
                and how keen you senses are, when it comes to recognizing fake
                paintings created by artificial intelligence. Can you tell the
                masters apart from the machines?
              </article>
            </div>

            <div>
              <h2 className="text-3xl text-accentGreen mb-8">
                How does it work?
              </h2>
              <article className="text-white">
                The data for our art machine comes from a knowledge graph. We
                use Natural Language Processing to create a catchy title and a
                short description. From only this description, we challenge a
                text to image generative AI to paint us a picture in the style
                of the original artist...
              </article>
            </div>

            <div>
              <h2 className="text-3xl text-accentGreen mb-8">
                Some other question?
              </h2>
              <article className="text-white">
                The data for our art machine comes from a knowledge graph. We
                use Natural Language Processing to create a catchy title and a
                short description. From only this description, we challenge a
                text to image generative AI to paint us a picture in the style
                of the original artist...
              </article>
            </div>
          </div>

          <div className="relative h-80 w-full">
            <Image
              alt="Machine hand with brush logo"
              src={logo}
              className="object-contain"
              fill
              priority
            />
          </div>
        </div>
      </main>
    </>
  )
}
