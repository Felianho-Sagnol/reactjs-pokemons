import React, { FunctionComponent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemons-service-prod';
 
const PokemonSearch: FunctionComponent = () => {
  
    const [term, setTerm] = useState<string>('');
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const navigate = useNavigate()
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const term = e.target.value;
        setTerm(term);
    
        if(term.length <= 1) {
        setPokemons([]);
        return;
        }
    
        PokemonService.searchPokemon(term).then(pokemons => setPokemons(pokemons));
    }
    
    const gotoPokemon = (id: number): void => {
        navigate(`/pokemons/${id}`)
    }

  
  return (
    <div className="row"> 
        <div className="col-sm-12 col-md-12"> 
            <div className="form-group">
                <input type="text" placeholder="Rechercher un pokémon" className="form-control" value={term} onChange={e => handleInputChange(e)} /> 
            </div>
            <div className="card"> 
                <div className="card-content"> 
                    <div className="input-field"> 
                    
                    </div> 
                    <div className=''>
                        {pokemons.map((pokemon) => (
                            // <Link key={pokemon.id} to={`/pokemons/${pokemon.id}`} className="collection-item">
                            //     {pokemon.name}
                            // </Link>
                            <div onClick={(e)=>gotoPokemon(pokemon.id)} className='row' key={pokemon.id}>
                                <div className="col-sm-12 searchItem">
                                    <span>{pokemon.name} </span>
                                </div>
                            </div>
                        ))}
                    </div> 
                </div> 
            </div> 
        </div> 
    </div>
  );
}
  
export default PokemonSearch;