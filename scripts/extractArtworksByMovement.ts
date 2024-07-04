import SparqlClient from "sparql-http-client"
import z, { ZodType } from "zod"
import { sparqlQuery } from "./helpers/sparqlQuery"
import { writeDataFile } from "./helpers/writeDataFile"
import allMovements from "../public/data/allMovements"
import { Artwork, artworkSchema, getArtworksForAMovement } from "./artwork"

const extractArtworksForAMovement = async (movement: string) => {
  const results = await getArtworksForAMovement(movement)

  console.log(results)

  await writeDataFile(
    `by-movement/${movement}`,
    results,
    z.array(artworkSchema),
  )
}

const extractArtworksByMovements = async () => {
  for (const movement of allMovements.map((m) => m.movementLabel)) {
    await extractArtworksForAMovement(movement)
  }
}

extractArtworksByMovements()
