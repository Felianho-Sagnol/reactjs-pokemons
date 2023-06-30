import  { FunctionComponent, useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemons-service-prod';
import Loader from '../components/loader';
  
const PokemonEdit: FunctionComponent = () => {
    const params:any = useParams();
    const [pokemon, setPokemon] = useState<Pokemon|null>(null);
    
    useEffect(() => {
        PokemonService.getPokemon(+params.id)
            .then(pokemon => {
            if(pokemon!.id) setPokemon(pokemon)
        })
    }, [params.id]);
        
    return (
        <div>
        { pokemon ? (
            <div className="container">
                <h2 className="header text-center mt-4">Éditer { pokemon.name }</h2>
                <PokemonForm pokemon={pokemon}></PokemonForm>
            </div>
        ) : (
            // <h4 className="center">Aucun pokémon à afficher !</h4>
            <Loader />
        )}
        </div>
    )
}
  
export default PokemonEdit;