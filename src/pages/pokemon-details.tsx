import { FunctionComponent, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import formatDate from "../helpers/format-date";
import getTypeColor from "../helpers/type-color";
import Pokemon from "../models/pokemon";
import Loader from "../components/loader";
import PokemonService from "../services/pokemons-service-prod";


const PokemonDetails: FunctionComponent = () => {
    const params: any = useParams();
    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [id, setId] = useState<String | null>(null);
    useEffect(() => {
        PokemonService.getPokemon(+params.id)
            .then(pokemon => {
            if(pokemon!.id) setPokemon(pokemon)
        })
    }, [params.id]);

    const handleDelete = () => {
        PokemonService.deletePokemon(pokemon!)
        .then((_) => navigate("/"))
    }

    return (
        <div className="container">
            {pokemon ? (
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="card">
                            <img width={200} height={400} className="card-img-top" src={pokemon.picture} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{pokemon.name} </h5>
                                <p className="card-text">Points de vie : {pokemon.hp} </p>
                                <p className="card-text">Dégats : {pokemon.cp} </p>
                                {
                                    pokemon.types.map((type,index) => (
                                        <span key={index} className="type" style={{ backgroundColor: getTypeColor(type) }}>{type} </span>
                                    ))
                                }
                                <p className="card-text mt-3">Date de création : {formatDate()} </p>
                                <div className="row">
                                    <div className="col-4">
                                        <Link to='/' className="btn btn-primary">Retour</Link>
                                    </div>
                                    <div className="col-4">
                                        <Link to={`/pokemons/edit/${pokemon.id}`} className="btn btn-primary">Modifier</Link>
                                    </div>
                                    <div onClick={(e) => handleDelete()} className="col-4">
                                        <div className="delete-icon">
                                            <i  className="fa-solid fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // <div>
                //     <h3 className="text-center">Aucun pokemon choisi</h3>
                // </div>
                <Loader />
            )
               
            }
        </div>
    )
}

export default PokemonDetails