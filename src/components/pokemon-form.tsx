import React, { FunctionComponent, useEffect, useState } from 'react';
import Pokemon from '../models/pokemon';
import getTypeColor from '../helpers/type-color';
import { useNavigate } from 'react-router-dom';
import PokemonService from '../services/pokemons-service-prod';
  
type Props = {
  pokemon: Pokemon,
  add?: boolean
};

type Field = {
  value: any, error?: string, isValid?: boolean
};
  
// type Form = {
//   name: Field, hp: Field, cp: Field, types: Field
// };

type Form = {
  [key: string]:Field,
}

const PokemonForm: FunctionComponent<Props> = ({ pokemon ,add = false}) => {
  const navigate = useNavigate()
 
 
  const [form, setForm] = useState<Form>({
    name: { value:  pokemon.name, isValid: true },
    hp: { value:  pokemon.hp , isValid: true },
    cp: { value:  pokemon.cp, isValid: true },
    picture: { value:  pokemon.picture, isValid: true },
    types: { value:  pokemon.types , isValid: true },
  })

  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

  const hasType = (type: string) => {
    return form.types.value.includes(type)
  }

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newField: Field = {
      ...form[name], ...{ value: value }
    }
    // form[name]=newField
    // setForm({...form})
    setForm((prevState) => ({
      ...prevState,
      [name]: newField,
    }))
  }

  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked
    let newFiel: Field
    if (checked) {
      const newTypes: string[] = form.types.value.concat([type])
      newFiel = { value: newTypes }
    } else {
      const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type)
      newFiel = { value: newTypes }
    }

    setForm({...form,...{ types: newFiel }})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormValid = validateForm()
    if(isFormValid) {
      pokemon.name = form.name.value
      pokemon.hp = form.hp.value
      pokemon.cp = form.cp.value
      pokemon.types = form.types.value
      if (!add) {
        PokemonService.updatePokemon(pokemon).then((_) => {
          navigate("/pokemons/"+pokemon.id)
        })
      } else {
        pokemon.picture = form.picture.value
        //localStorage.removeItem('nextId');
        const nextId = PokemonService.getNextId()
        localStorage.setItem('nextId', nextId.toString());
        pokemon.id = nextId
        PokemonService.addPokemon(pokemon).then(_ => {
          navigate('/')
        })
      }
    }
  }

  const validateForm = () => {
    let newForm: Form = form
    let isUrlValid: boolean = true;
    const nameRegex = /^[a-zA-Z àéè]{3,25}$/;
    const hpRegex = /^[0-9]{1,3}$/;
    const cpRegex = /^[0-9]{1,2}$/;

    if (!nameRegex.test(form.name.value)) {
      const errorMessage = "Le nom  est invalide"
      const newField: Field = { value: form.name.value, error: errorMessage, isValid: false }
      newForm = {...newForm,...{name: newField}}
    } else {
      const newField: Field = { value: form.name.value, error: "", isValid: true }
      newForm = {...newForm,...{name: newField}}
    }

    if (!hpRegex.test(form.hp.value)) {
      const errorMessage = "Les points sont entre 0 et 999"
      const newField: Field = { value: form.hp.value, error: errorMessage, isValid: false }
      newForm = {...newForm,...{hp: newField}}
    } else {
      const newField: Field = { value: form.hp.value, error: "", isValid: true }
      newForm = {...newForm,...{hp: newField}}
    }

    if (!cpRegex.test(form.cp.value)) {
      const errorMessage = "Les dégats sont entre 0 et 99"
      const newField: Field = { value: form.cp.value, error: errorMessage, isValid: false }
      newForm = {...newForm,...{cp: newField}}
    } else {
      const newField: Field = { value: form.cp.value, error: "", isValid: true }
      newForm = {...newForm,...{cp: newField}}
    }

    if (add) {
      const urlRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})(?:\/[^\s]*)?$/;
      if (!urlRegex.test(form.picture.value)) {
        const errorMessage = "Donnez une url valide"
        const newField: Field = { value: form.picture.value, error: errorMessage, isValid: false }
        isUrlValid = false
        newForm = {...newForm,...{picture: newField}}
      } else {
        const newField: Field = { value: form.picture.value, error: "", isValid: true }
        newForm = {...newForm,...{picture: newField}}
      }
    }
    setForm(newForm)

    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid && isUrlValid
  }

  const isTypeValid = (type: string): boolean => {
    if(form.types.value.length === 1 && !hasType(type)) return false
    if(form.types.value.length >= 3 && !hasType(type)) return false
    return true
  }
   
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col-md-12 col-sm-12">
            { !add &&
              <div className="card-image">
                <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
              </div>
            }
            <div className="card-stacked">
              <div className="card-content">
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input placeholder='nom du pokemon' name="name" onChange={(e) => handleInputChange(e)} id="name" type="text" value={form.name.value} className="form-control"></input>
                  {
                    !form.name.isValid && <p className='error'>
                      {form.name.error} 
                    </p>
                  }
                </div>
                {
                  add &&
                  <div className="form-group">
                    <label htmlFor="hp">Image</label>
                    <input placeholder='Image du pokémon' name="picture" onChange={(e) => handleInputChange(e)} id="picture" type="text" value={form.picture.value} className="form-control"></input>
                    {
                      !form.picture.isValid && <p className='error'>
                        {form.picture.error} 
                      </p>
                    }
                  </div>
                }
              
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input name="hp" onChange={(e) => handleInputChange(e)} id="hp" type="number" value={form.hp.value} className="form-control"></input>
                  {
                    !form.hp.isValid && <p className='error'>
                      {form.hp.error} 
                    </p>
                  }
                </div>
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input name="cp" onChange={(e) =>handleInputChange(e)} id="cp" value={ form.cp.value }  type="number" className="form-control"></input>
                  {
                    !form.cp.isValid && <p className='error'>
                      {form.cp.error} 
                    </p>
                  }  
              </div>
                <div className="form-group">
                  <label>Types</label>
                  {types.map((type,index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      <div className="row">

                        <div className="col-2">
                          <input onChange={(e) =>selectType(type,e)} id={type} type="checkbox" value={type} checked={ hasType(type) } disabled={!isTypeValid(type)} className="filled-in"></input>
                        </div>
                        <div className="col-3">
                          <label htmlFor={type.toString()}>
                            <span>
                              <p className='type-edit text-center' style={{ backgroundColor: getTypeColor(type) }}>{ type }</p>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
              <button type="submit" style={{ width: "100%", marginBottom: "50px" }} className="btn btn-primary">
                {
                  !add ? (
                    <span>Valider</span>
                  ) : (
                      <span>Ajouter</span>
                  )
                }
              </button>
              </div>
            </div>
          </div>
        </div>
    </form>
  );
};
   
export default PokemonForm;