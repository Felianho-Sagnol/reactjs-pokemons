import Loader from "../components/loader"
import PokemonCard from "../components/pokemon-card"
import PokemonSearch from "../components/pokemon-search"
import usePokemons from "../hooks/pokemon.hook"

export default function PokemonList() {
    const pokemons = usePokemons()
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h1 className='text text-center'>wellcome to our PokéDex </h1>
                    <h4 className='text text-center'>There are {pokemons.length} pokemons.</h4>
                </div>
            </div>
            
            <div className="container">
                
                <PokemonSearch />
                <div className="row listContainer">
                    {
                        pokemons.map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={ pokemon}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}