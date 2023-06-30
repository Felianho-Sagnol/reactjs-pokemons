import React from 'react';
import { FunctionComponent} from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/nav-bar';
import PokemonList from './pages/pokemon-list';
import PokemonDetails from './pages/pokemon-details';
import PageNotFound from './pages/not-found';
import PokemonEdit from './pages/pokemon-edit';
import PokemonAdd from './pages/pokemon-add';
import Login from './pages/login';
import PrivateRoute from './PrivateRoute';

const  App: FunctionComponent = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PrivateRoute><PokemonList/></PrivateRoute>}/>
          <Route path="/pokemons/:id" element={<PrivateRoute><PokemonDetails/></PrivateRoute>}/>
          <Route path="/pokemons/edit/:id" element={<PrivateRoute><PokemonEdit/></PrivateRoute>}/>
          <Route path="/pokemons/add" element={<PrivateRoute><PokemonAdd/></PrivateRoute>}/>
          <Route path="/login" element={<Login />} />
          <Route  path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
