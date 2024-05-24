import { z } from "zod";
import { sparqlQuery } from "./helpers/sparqlQuery";
import { writeDataFile } from "./helpers/writeDataFile";

const main = async (movementName: string) => {
  // Define a more comprehensive result schema
  const resultSchema = z.object({
    paintingLabel: z.string(),
    artistName: z.string(),
    movement: z.string(),
    width: z.string().optional(),
    height: z.string().optional(),
    creationYear: z.string().optional(),
    description: z.string().optional(),
    abstract: z.string().optional(),
  });

  const results = await sparqlQuery(
    `
    PREFIX : <http://h-da.de/fbi/art/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX wd: <http://www.wikidata.org/entity/>

    SELECT DISTINCT ?paintingLabel ?artistName ?movement ?width ?height ?year ?description ?abstract WHERE {
      ?painting a :artwork;
        rdfs:label ?paintingLabel;
        :movement/rdfs:label "${movementName}";
        :artist/rdfs:label ?artistName;
        :movement/rdfs:label ?movement.

      OPTIONAL { ?painting :width ?width. }
      OPTIONAL { ?painting :height ?height. }
      OPTIONAL { ?painting :inception ?year. }
      OPTIONAL { ?painting :description ?description. }
      OPTIONAL { ?painting :abstract ?abstract. }
    } 
    ORDER BY RAND()
    LIMIT 1
    `,
    resultSchema,
  );

  // Format the console output for better readability
  if (results.length > 0) {
    const artwork = results[0];
    console.log(`Artwork details:\n - Title: ${artwork.paintingLabel}\n - Artist: ${artwork.artistName}\n - Movement: ${artwork.movement}\n - Width: ${artwork.width}\n - Height: ${artwork.height}\n - Year of Creation: ${artwork.creationYear}\n - Description: ${artwork.description}\n - Abstract: ${artwork.abstract}`);
    writeDataFile(`artworkFrom${movementName.replace(/\s/g, '')}`, results, z.array(resultSchema));
  } else {
    console.log("No results found for the specified movement.");
  }
};

// Call main with an example movement name, e.g., "Impressionism"
main("Impressionism");
