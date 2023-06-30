import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
  
const PageNotFound: FunctionComponent = () => {
  
  return (
    <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
            <img className='center' src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png" alt="Page non trouvée"/>
            <h1>Hey, cette page n'existe pas !</h1> 
            <Link to="/" className="waves-effect waves-teal btn-flat">
                Retourner à l'accueil
            </Link>
        </div>
        <div className="col-2"></div>
    </div>
  );
}
  
export default PageNotFound;