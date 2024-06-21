import { Impressionism as Movement } from "../../public/data/movement/impressionism"
import { useTypedFetch } from "./genericHooks/useTypedFetch"

/** Use a specific movement. Use useMovements to get a list of all movements */
export const useMovements = (movement: string) => {
  const movements = useTypedFetch<Movement>(
    movement && `/data/movement/${movement}.json`,
  )
  return movements
}
