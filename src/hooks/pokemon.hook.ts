import { useEffect, useState } from "react"
import Pokemon from "../models/pokemon"
import PokemonService from "../services/pokemons-service-prod"

const usePokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    useEffect(() => {
        //setPokemons(POKEMONS)
        // fetch("http://localhost:3001/pokemons")
        // .then(response => response.json())
        // .then((pokemonsList) => {
        //     setPokemons(pokemonsList)
        // })
        PokemonService.getPokemons()
        .then((pokemonsList) => {
            setPokemons(pokemonsList)
        })
    }, [])
    
    return pokemons
}

export default usePokemons