import z from "zod"
import { sparqlQuery } from "./helpers/sparqlQuery"

export const getArtworksForAMovement = async (movement: string) => {
  const results = await sparqlQuery<Artwork>(
    `
    PREFIX : <http://h-da.de/fbi/art/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?image ?paintingLabel ?artistName ?date_of_birth ?date_of_death (STR(?artist_img) AS ?image_of_artist) ?movementLabel ?width ?height ?inception ?description ?abstract ?depicts ?country WHERE {
      ?painting a :artwork;
        rdfs:label ?paintingLabel;
        :image ?image;
        :movement ?movement.

      ?movement rdfs:label ?movementLabel.
      FILTER(?movementLabel = "${movement}")  # Ensure this is how you filter movements.

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
      OPTIONAL { ?painting :depicts ?depicts. }
      OPTIONAL { ?painting :country ?country. }
    } 
    # Get all for now, we will shuffle and limit them later
    # ORDER BY RAND()
    # LIMIT 50
    `,
    artworkSchema,
  )

  return results
}

export const processRawArtwork = (rawArtwork: RawArtwork): Artwork => {
  return {
    image: rawArtwork.image,
    paintingLabel: rawArtwork.paintingLabel,
    artistName: rawArtwork.artistName,
    movementLabel: rawArtwork.movementLabel,
    date_of_birth: rawArtwork.date_of_birth,
    date_of_death: rawArtwork.date_of_death,
    artist_img: rawArtwork.artist_img,
    width: rawArtwork.width,
    height: rawArtwork.height,
    inception: rawArtwork.inception,
    country: rawArtwork.country,
    description: rawArtwork.description,
    abstract: rawArtwork.abstract,
    motifs: rawArtwork.motifs?.split("|") ?? [],
    genres: rawArtwork.genres?.split("|") ?? [],
    materials: rawArtwork.materials?.split("|") ?? [],
  }
}

export const rawArtworkSchema = z.object({
  image: z.string(),
  paintingLabel: z.string(),
  artistName: z.string(),
  movementLabel: z.string(),
  date_of_birth: z.string().optional(),
  date_of_death: z.string().optional(),
  artist_img: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  inception: z.string().optional(),
  country: z.string().optional(),
  description: z.string().optional(),
  abstract: z.string().optional(),
  motifs: z.string().optional(),
  genres: z.string().optional(),
  materials: z.string().optional(),
})

export type RawArtwork = z.infer<typeof rawArtworkSchema>

export const artworkSchema = z.object({
  image: z.string(),
  paintingLabel: z.string(),
  artistName: z.string(),
  movementLabel: z.string(),
  date_of_birth: z.string().optional(),
  date_of_death: z.string().optional(),
  artist_img: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  inception: z.string().optional(),
  country: z.string().optional(),
  description: z.string().optional(),
  abstract: z.string().optional(),
  motifs: z.array(z.string()),
  genres: z.array(z.string()),
  materials: z.array(z.string()),
})

// export const artworkSchema = z.object({
//   image: z.string(),
//   paintingLabel: z.string(),
//   artistName: z.string(),
//   date_of_birth: z.string().optional(),
//   date_of_death: z.string().optional(),
//   image_of_artist: z.string().optional(),
//   movementLabel: z.string(),
//   width: z.string().optional(),
//   height: z.string().optional(),
//   inception: z.string().optional(),
//   description: z.string().optional(),
//   abstract: z.string().optional(),
//   depicts: z.string().or(z.array(z.string())).optional(),
//   country: z.string().optional(),
// })
export type Artwork = z.infer<typeof artworkSchema>
