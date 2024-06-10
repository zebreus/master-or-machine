import SparqlClient from "sparql-http-client"
import z, { ZodType } from "zod"
import { writeDataFile } from "./helpers/writeDataFile"
import { sparqlQuery } from "./helpers/sparqlQuery"

interface ResultSchema {
  movementLabel: string
}

const resultSchema = z.object({
  movementLabel: z.string(),
})

const getAllMovements = async () => {
  const results = await sparqlQuery<ResultSchema>(
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

  await writeDataFile("allMovements", results, z.array(resultSchema))
}

getAllMovements()
