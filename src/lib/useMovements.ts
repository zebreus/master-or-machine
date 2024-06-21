import { Movements } from "../../public/data/movements"
import { useTypedFetch } from "./genericHooks/useTypedFetch"

export const useMovements = () => {
  const movements = useTypedFetch<Movements>("/data/movements.json")
  return movements
}
