/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5aYOogRMfOF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Component() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Match the Image
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select the image that matches the description below.
        </p>
        <div className="flex items-center justify-center gap-6">
          <img
            alt="Image 1"
            className="rounded-lg shadow-md"
            height={200}
            src="/placeholder.svg"
            style={{
              aspectRatio: "300/200",
              objectFit: "cover",
            }}
            width={300}
          />
          <img
            alt="Image 2"
            className="rounded-lg shadow-md"
            height={200}
            src="/placeholder.svg"
            style={{
              aspectRatio: "300/200",
              objectFit: "cover",
            }}
            width={300}
          />
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-6 mb-4">
          A majestic mountain landscape with a serene lake.
        </p>
        <Button className="w-full">Submit</Button>
      </div>
    </main>
  )
}
