import SparqlClient from "sparql-http-client"
import z, { ZodType } from "zod"
import { Artwork, artworkSchema } from "./artwork"

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
  const results = await sparqlQueryTest<Artwork>(
    `
    PREFIX : <http://h-da.de/fbi/art/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?image ?paintingLabel ?artistName ?date_of_birth ?date_of_death (STR(?artist_img) AS ?image_of_artist) ?movementLabel ?width ?height ?year ?description ?abstract WHERE {
      ?painting a :artwork;
        rdfs:label ?paintingLabel;
        :image ?image;
        :movement ?movement.

      ?movement rdfs:label ?movementLabel.
      FILTER(?movementLabel = "${movementName}")  # Ensure this is how you filter movements.

      ?painting :artist ?artist.
      ?artist rdfs:label ?artistName;
              :date_of_birth ?date_of_birth;
              :date_of_death ?date_of_death;
              :image ?artist_img.

      OPTIONAL { ?painting :width ?width. }
      OPTIONAL { ?painting :height ?height. }
      OPTIONAL { ?painting :inception ?year. }
      OPTIONAL { ?painting :description ?description. }
      OPTIONAL { ?painting :abstract ?abstract. }
    } 
    ORDER BY RAND()
    LIMIT ${num}

    `,
    artworkSchema,
  )

  // Format the console output for better readability and prepare for the second query
  if (results.length > 0) {
    // Define a schema for motifs
    const motifsSchema = z.object({
      motif: z.string(),
    })

    for (const artwork of results) {
      // Execute the second query to get motifs
      const motifResults = await sparqlQueryTest(
        `
      PREFIX : <http://h-da.de/fbi/art/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT DISTINCT ?motif
      WHERE {
        ?artwork a :artwork;
            rdfs:label "${artwork.paintingLabel}";
          :motif/rdfs:label ?motif;
      }
      `,
        motifsSchema,
      )

      // Add motifs to the artwork object
      artwork.depicts = motifResults.map((m) => m.motif)
    }

    return results
  } else {
    console.log("No results found for the specified movement.")
    return []
  }
}
