import { z } from "zod";
import { sparqlQuery } from "./helpers/sparqlQuery";
import { writeDataFile } from "./helpers/writeDataFile";

const main = async (movementName: string) => {
  // Define a more comprehensive result schema for the initial artwork query
  const resultSchema = z.object({
    paintingLabel: z.string(),
    artistName: z.string(),
    date_of_birth: z.string().optional(),
    date_of_death: z.string().optional(),
    image_of_artist: z.string().optional(),
    movementLabel: z.string(),
    width: z.string().optional(),
    height: z.string().optional(),
    creationYear: z.string().optional(),
    description: z.string().optional(),
    abstract: z.string().optional(),
    motifs: z.array(z.string()).optional(),
    material: z.array(z.string()).optional(),
  });

  // Execute the first query to get artwork details
  const results = await sparqlQuery(
    `
    PREFIX : <http://h-da.de/fbi/art/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?paintingLabel ?artistName ?date_of_birth ?date_of_death (STR(?artist_img) AS ?image_of_artist) ?movementLabel ?width ?height ?year ?description ?abstract WHERE {
      ?painting a :artwork;
        rdfs:label ?paintingLabel;
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
    LIMIT 1

    `,
    resultSchema,
  );

  // Format the console output for better readability and prepare for the second query
  if (results.length > 0) {
    const artwork = results[0];
    console.log(`Artwork details:\n - Title: ${artwork.paintingLabel}\n - Artist: ${artwork.artistName}\n - Movement: ${artwork.movementLabel}\n - Width: ${artwork.width}\n - Height: ${artwork.height}\n - Year of Creation: ${artwork.creationYear}\n - Description: ${artwork.description}\n - Abstract: ${artwork.abstract}`);

    // Define a schema for motifs
    const motifsSchema = z.object({
      motif: z.string(),
    });

    // Execute the second query to get motifs
    const motifResults = await sparqlQuery(
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
    );
    // Define a schema for motifs
    const materialSchema = z.object({
      material: z.string(),
    });

    // Execute the second query to get motifs
    const materialResults = await sparqlQuery(
      `
      PREFIX : <http://h-da.de/fbi/art/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT DISTINCT ?material
      WHERE {
        ?artwork a :artwork;
            rdfs:label "${artwork.paintingLabel}";
          :material/rdfs:label ?material;
      }
      `,
      materialSchema,
    );

    // Add motifs to the artwork object
    artwork.material = materialResults.map(m => m.material);

    // Add motifs to the artwork object
    artwork.motifs = motifResults.map(m => m.motif);

    // Write combined details to file
    writeDataFile(`artworkFrom${movementName.replace(/\s/g, '')}`, [artwork], z.array(resultSchema.extend({ motifs: z.array(z.string()) })));
  } else {
    console.log("No results found for the specified movement.");
  }
};

// Call main with an example movement name, e.g., "Impressionism"
main("Impressionism");
