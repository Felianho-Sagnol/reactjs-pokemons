import { useEffect, useState } from 'react';
import './App.css';
import POKEMONS from './models/mock-pokemon';
import Pokemon from './models/pokemon';

function App() {
  const [name,setName] = useState<String>('PokéDex')
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  useEffect(() => {
    setPokemons(POKEMONS)
  },[])
  return (
    <div className="App">
      <div className="row">
        <div className="col-12">
            <h1 className='text text-center'>wellcome to our {name} </h1>
            <h4 className='text text-center'>There are {pokemons.length} pokemons.</h4>
        </div>
     </div>
      <div className="row listContainer">
        {
          pokemons.map((pokemon) => (
            <div key={pokemon.id} className="col-3 mb-3">
              <div className="card">
                <img className="card-img-top" src={pokemon.picture} alt="Card image cap" />
                <div className="card-body">
                  <h4>{pokemon.name} </h4>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>
          ))
        }
        
      </div>
    </div>
  );
}

export default App;
