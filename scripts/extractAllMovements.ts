import SparqlClient from "sparql-http-client"
import z, { ZodType } from "zod"
//import { writeDataFile } from "./helpers/writeDataFile"
import { writeJsonFile } from "./helpers/writeDataToJson"

interface ResultSchema {
  movementLabel: string
}

const resultSchema = z.object({
  movementLabel: z.string(),
})

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

const getAllMovements = async () => {
  const results = await sparqlQueryTest<ResultSchema>(
    `
    PREFIX : <http://h-da.de/fbi/art/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?movementLabel WHERE {
  		?m a :movement ;
  		rdfs:label ?movementLabel .
	  }

    `,
    resultSchema,
  )

  console.log(results)

  //writeDataFile("allMovements", results, z.array(resultSchema))
  writeJsonFile("allMovements", results)
}

getAllMovements()
