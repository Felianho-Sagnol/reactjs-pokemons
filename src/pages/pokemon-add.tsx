import  { FunctionComponent, useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
  
const PokemonAdd: FunctionComponent = () => {
    const params:any = useParams();
    const [pokemon, setPokemon] = useState<Pokemon|null>(null);
    
    useEffect(() => {
        setPokemon({id:0,name:"",hp:0,cp:0,picture:"",created: new Date(),types : []})
    }, []);
        
    return (
        <div>
        { pokemon ? (
            <div className="container">
                <h2 className="header text-center mt-4">Ajouter un nouveau pokemon</h2>
                <PokemonForm  add={true} pokemon={pokemon}></PokemonForm>
            </div>
        ) : (
            <h4 className="center">Aucun pokémon à afficher !</h4>
        )}
        </div>
    );
}
  
export default PokemonAdd;