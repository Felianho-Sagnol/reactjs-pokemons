// import Pokemon from "../models/pokemon";
 
// export default class PokemonServiceDev {
 
//     static getPokemons = (): Promise<Pokemon[]>  =>{
//         return fetch('http://localhost:3001/pokemons')
//         .then(response => response.json())
//         .catch(error => this.handleError(error))
//     }
    
//     static getPokemon = (id: number): Promise<Pokemon|null> => {
//         return fetch(`http://localhost:3001/pokemons/${id}`)
//         .then(response => response.json())
//         .then(data => this.isEmpty(data) ? null : data)
//         .catch(error => this.handleError(error))
//     }

//     static updatePokemon = (pokemon: Pokemon) => {
//         return fetch(`http://localhost:3001/pokemons/${pokemon.id}`,
//             {
//                 method: "PUT",
//                 body: JSON.stringify(pokemon),
//                 headers : { 'Content-Type':'application/json' }
//            }
//         )
//         .then(res => res.json())
//         .catch(error => this.handleError(error))
//     }

//     static addPokemon = (pokemon: Pokemon) => {
//         return fetch(`http://localhost:3001/pokemons`,
//             {
//                 method: "POST",
//                 body: JSON.stringify(pokemon),
//                 headers : { 'Content-Type':'application/json' }
//            }
//         )
//         .then(res => res.json())
//         .catch(error => this.handleError(error))
//     }

//     static deletePokemon = (pokemon: Pokemon) => {
//         return fetch(`http://localhost:3001/pokemons/${pokemon.id}`,
//             {
//                 method: "DELETE",
//                 headers : { 'Content-Type':'application/json' }
//            }
//         )
//         .then(res => res.json())
//         .catch(error => this.handleError(error))
//     }

//     static searchPokemon = (term: string) => {
//        return fetch(`http://localhost:3001/pokemons?q=${term}`)
//         .then(res => res.json())
//         .catch(error => this.handleError(error))
//     }
 
//     static isEmpty = (data: Object): boolean  =>{
//         return Object.keys(data).length === 0
//     }

//     static getNextId = (): number => {
//         const idString:string|null  = localStorage.getItem('nextId');
//         if (idString == null) {
//             return 13
//         } else {
//             const id : number= parseInt(idString, 10);
//             const newId : number= +id + 1;
//             return newId
//         }
//     }
    
//     static handleError = (error: Error)  =>{
//         console.log(error)
//     }
//     //https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png
// }

export {}