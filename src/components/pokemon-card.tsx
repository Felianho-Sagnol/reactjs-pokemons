import { FunctionComponent, useState } from "react";
import formatDate from "../helpers/format-date";
import Pokemon from "../models/pokemon";
import getTypeColor from "../helpers/type-color";
import { useNavigate } from "react-router-dom";

type Props = {
    pokemon: Pokemon,
    borderColor?: string
}

const PokemonCard: FunctionComponent<Props> = ({ pokemon, borderColor = "#f5f5f5" }) => {
    const [color, setColor] = useState<string>(borderColor);
    const navigate = useNavigate()
    const showBorder = () =>{
        setColor('green')
    };

    const hideColor = () => {
        setColor(borderColor)
    }

    const gotoPokemon = (id: number) => {
        navigate("/pokemons/"+id.toString())
    }

    return (
        <div onClick={() => gotoPokemon(+pokemon.id)} key={pokemon.id} className="col-md-3 col-sm-3 mb-3" onMouseEnter={showBorder} onMouseLeave={hideColor}>
            <div className="card" style={{ borderColor :color }}>
                <img className="card-img-top" src={pokemon.picture} alt="Card image cap" />
                <div className="card-body">
                    <h4>{pokemon.name} </h4>
                    <small>Created at : {formatDate()} </small>
                    <br />
                    <br />
                    {
                        pokemon.types.map((type,index) => (
                            <span key={index} className="type" style={{ backgroundColor: getTypeColor(type) }}>{type} </span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PokemonCard