import { z } from "zod";
import { sparqlQuery } from "./helpers/sparqlQuery";
import { writeDataFile } from "./helpers/writeDataFile";

const main = async () => {
  // TODO: Write the correct query
  const resultSchema = z.object({ painting_label: z.string() });
  const results = await sparqlQuery(
    `
  PREFIX : <http://h-da.de/fbi/art/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX wd: <http://www.wikidata.org/entity/>
  
  #  Which paintings are displayed in museums in the same country as the country of the artwork itself?
  SELECT DISTINCT ?painting_label WHERE {
    ?painting a :artwork;
       rdfs:label ?painting_label;
       :artist/rdfs:label "Michelangelo";
  }
  `,
    resultSchema,
  );

  console.log(results);

  writeDataFile("artworksByMichelangelo", results, z.array(resultSchema));
};
main();
