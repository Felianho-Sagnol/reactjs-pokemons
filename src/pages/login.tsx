import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthentificationService from '../services/authentication-service';

type Field = {
  value?: any,
  error?: string,
  isValid?: boolean
};

type Form = {
  [key:string]: Field,
}
const Login: FunctionComponent = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState<Form>({
        username: { value: '' },
        password: { value: '' },
    });

    const [message, setMessage] = useState<string>('Vous êtes déconnecté. (pikachu / pikachu)');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        const newField: Field = {
        ...form[name], ...{ value: value }
        }
        setForm((prevState) => ({
        ...prevState,
        [name]: newField,
        }))
    }

    const validateForm = () => {
        let newForm: Form = form;

        // Validator username
        if(form.username.value.length < 3) {
            const errorMsg: string = 'Votre prénom doit faire au moins 3 caractères de long.';
            const newField: Field = { value: form.username.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ username: newField } };
        } else {
            const newField: Field = { value: form.username.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ username: newField } };
        }

        // Validator password
        if(form.password.value.length < 6) {
            const errorMsg: string = 'Votre mot de passe doit faire au moins 6 caractères de long.';
            const newField: Field = {value: form.password.value, error: errorMsg, isValid: false};
            newForm = { ...newForm, ...{ password: newField } };
        } else {
            const newField: Field = { value: form.password.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ password: newField } };
        }

        setForm(newForm);

        return newForm.username.isValid && newForm.password.isValid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if(isFormValid) {
            setMessage('👉 Tentative de connexion en cours ...');
            AuthentificationService.login(form.username.value, form.password.value).then(isAuthenticated => {
                if(!isAuthenticated) {
                setMessage('🔐 Identifiant ou mot de passe incorrect.');
                return;
                }
                navigate('/');
            });
        }
    }

    return (
        <div className="container">
            <div className="row mt-5"> 
                <form onSubmit={(e) => handleSubmit(e)} className='col-sm-12 col-md-12'>
                    {message && <div className="form-group">
                    <div className="card-panel grey lighten-5">
                        {message}
                    </div>
                    </div>}
                    <div className="form-group">
                        <label htmlFor="username">Identifiant</label>
                        <input type="text" className="form-control" id="username" name="username" value={form.username.value} onChange={e => handleInputChange(e)} placeholder="..." />
                        {form.username.error &&
                            <p className='error'>
                                {form.username.error}
                            </p>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" className="form-control" id="password" name="password" value={form.password.value} onChange={e => handleInputChange(e)} placeholder="......"/>
                        {form.password.error &&
                            <p className='error'>
                                {form.password.error}
                            </p>
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">Valider</button>
                </form>
            </div>
        </div>
    );
}
  
export default Login;