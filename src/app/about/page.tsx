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
                and how keen your senses are, when it comes to recognizing fake
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
                use Natural Language Processing to create a short description
                for you to see and a prompt. From this prompt, we challenge a
                text to image generative AI to paint us a picture in the style
                of the original artist. So from start to finish all the
                generative work is done by different AI models.
              </article>
            </div>

            <div>
              <h2 className="text-3xl text-accentGreen mb-8">
                Why did we do this project?
              </h2>
              <article className="text-white">
                First of all, we want you to have fun with the game. But we also
                wanted to see how good the results could get, if there is a
                chain of generative AI models, practically talking to each other
                to create the artworks, instead of engineering all prompts
                manually. We are happy with the results. Are you?
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
