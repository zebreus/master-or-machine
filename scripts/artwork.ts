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

export interface ResultSchema {
  image: string
  paintingLabel: string
  artistName: string
  date_of_birth?: string
  date_of_death?: string
  image_of_artist?: string
  movementLabel: string
  width?: string
  height?: string
  inception?: string
  description?: string
  abstract?: string
  depicts?: string
  country?: string
}

export type Artwork = ResultSchema

const resultSchema = z.object({
  image: z.string(),
  paintingLabel: z.string(),
  artistName: z.string(),
  date_of_birth: z.string().optional(),
  date_of_death: z.string().optional(),
  image_of_artist: z.string().optional(),
  movementLabel: z.string(),
  width: z.string().optional(),
  height: z.string().optional(),
  inception: z.string().optional(),
  description: z.string().optional(),
  abstract: z.string().optional(),
  depicts: z.string().optional(),
  country: z.string().optional(),
})

export const artworkSchema = resultSchema
