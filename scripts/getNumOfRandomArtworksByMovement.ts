import SparqlClient from "sparql-http-client"
import z, { ZodType } from "zod"
import {
  Artwork,
  RawArtwork,
  artworkSchema,
  processRawArtwork,
  rawArtworkSchema,
} from "./artwork"

// TODO: remove, once figured out, why sparqlQuery function produces build error
const sparqlQueryTest = <ResultType>(
  query: string,
  resultSchema: ZodType<ResultType, any, any>,
): Promise<ResultType[]> => {
  const endpointUrl: string = "http://localhost:3030/art"
  return new Promise((resolve, reject) => {
    const client = new SparqlClient({ endpointUrl })
    const stream = client.query.select(query)

    const results: Array<ResultType> = []

    stream.on("data", (result: unknown) => {
      try {
        // Simplify the result object to only contain the values
        // Maybe you need to adjust this or create a new sparqlquery function for your use case
        const simplifiedResult = Object.fromEntries(
          Object.entries(z.record(z.string(), z.any()).parse(result)).map(
            ([key, value]) => [key, value.value],
          ),
        )

        const validatedResult = resultSchema.parse(simplifiedResult)

        results.push(validatedResult)
      } catch (error) {
        reject(error)
      }
    })

    stream.on("error", (err) => {
      reject(err)
    })

    stream.on("end", () => {
      resolve(results)
    })
  })
}

export const getArtworksByMovement = async (
  movementName: string,
  num: number,
): Promise<Artwork[]> => {
  const rawArtworks = await sparqlQueryTest<RawArtwork>(
    `
    PREFIX : <http://h-da.de/fbi/art/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?image ?paintingLabel ?artistName ?date_of_birth ?date_of_death ?artist_img ?movementLabel ?width ?height ?inception ?country ?description ?abstract (GROUP_CONCAT(DISTINCT ?motif; SEPARATOR="|") AS ?motifs) (GROUP_CONCAT(DISTINCT ?genre; SEPARATOR="|") AS ?genres) (GROUP_CONCAT(DISTINCT ?material; SEPARATOR="|") AS ?materials) WHERE {
      ?painting a :artwork;
        rdfs:label ?paintingLabel;
        :image ?image;
        :movement ?movement;
        :genre/rdfs:label ?genre;
        :motif/rdfs:label ?motif;
        :material/rdfs:label ?material.

      ?movement rdfs:label ?movementLabel.
      FILTER(?movementLabel = "${movementName}")  # Ensure this is how you filter movements.

      ?painting :artist ?artist.
      ?artist rdfs:label ?artistName;
              :date_of_birth ?date_of_birth;
              :date_of_death ?date_of_death;
              :image ?artist_img.

      OPTIONAL { ?painting :width ?width. }
      OPTIONAL { ?painting :height ?height. }
      OPTIONAL { ?painting :inception ?inception. }
      OPTIONAL { ?painting :description ?description. }
      OPTIONAL { ?painting :abstract ?abstract. }
      OPTIONAL { ?painting :country ?country. }
    }
    GROUP BY ?image ?paintingLabel ?artistName ?date_of_birth ?date_of_death ?artist_img ?movementLabel ?width ?height ?inception ?country ?description ?abstract
    ORDER BY RAND()
    LIMIT ${num}
    `,
    rawArtworkSchema,
  )

  const artworks = rawArtworks.map(processRawArtwork)

  return artworks
}
