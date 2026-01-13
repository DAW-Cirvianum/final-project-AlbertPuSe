import { useContext, useState } from "react"
import { ROUTES } from "../../../routes"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"
import {registerUser} from "../../../api/users.api";
import { useTranslation } from "react-i18next";

export default function Register(){
    const [form, setForm] = useState({ name: '', username: '', email: '', password: '', password_confirmation: '' })
    const [error, setError]= useState(null)
    const {setUser}=useContext(AuthContext)
    const [validate, setValidated]=useState(false);
    const {t}=useTranslation()
    const navigate = useNavigate();

    const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

    const handleSubmit = e => {
    e.preventDefault()

     const formElement = e.currentTarget;

        if (!formElement.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

    const fetchUser = async () => {
      try {
        console.log(form);
        const user={ 
                name:form.name, 
                username:form.username, 
                email:form.email, 
                password:form.password, 
                password_confirmation:form.password_confirmation
            }
        const res = await registerUser(user)
        console.log(res.data.user.name)
        setUser(res.data.user)
        localStorage.setItem("token",res.data.token);
        navigate(ROUTES.HOME)
    } catch (error) {
        console.error(error);
        setError("No s'ha pogut crear l'usuari, torni a intentar")
      }
    };
    fetchUser();
  }

    function showError(){
        if(error){
            return <p>{error}</p>
        }
    }

    return(
        <>
            <div className="d-flex justify-content-center">
                <div className="flex-column w-25">
                <h1>Register</h1>
                    <form noValidate className={validate ? 'was-validated p-4' : 'p-4'} onSubmit={handleSubmit}>
                        <div>
                        <label className="form-label" htmlFor="name">Nom</label>
                        <input className="form-control"
                            name="name" 
                            type="text"
                            value={form.name} 
                            onChange={handleChange} 
                            placeholder="Nom complet" 
                            required
                        />
                        <div className="invalid-feedback">
                            <p>{t('Invalid name')}</p>
                        </div>
                        </div>
                        <div>
                        <label className="form-label" htmlFor="username"> Nom d'usuari</label>
                        <input className="form-control"
                            name="username" 
                            type="text"
                            value={form.username} 
                            onChange={handleChange} 
                            placeholder="Nom d'usuari"
                            required 
                        />
                        <div className="invalid-feedback">
                            <p>{t('Invalid username')}</p>
                        </div>
                        </div>
                        <div>
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-control"
                            name="email" 
                            type="text"
                            value={form.email} 
                            onChange={handleChange} 
                            placeholder="Email" 
                            required
                        />
                        <div className="invalid-feedback">
                            <p>{t('Invalid email')}</p>
                        </div>
                        </div>
                        <div>
                        <label className="form-label" htmlFor="password">Contrasenya</label>
                        <input className="form-control"
                            name="password" 
                            type="password"
                            value={form.password} 
                            onChange={handleChange} 
                            placeholder="Contrasenya" 
                            required
                        />
                        <div className="invalid-feedback">
                            <p>{t('Invalid password')}</p>
                        </div>
                        </div>
                        <div>
                        <label className="form-label" htmlFor="password_confirmation">Confirmar contrasenya</label>
                        <input className="form-control"
                            name="password_confirmation" 
                            type="password"
                            value={form.password_confirmation} 
                            onChange={handleChange} 
                            placeholder="Repeteix la contrasenya" 
                            required
                        />
                        <div className="invalid-feedback">
                            <p>{t('Invalid password_confirmation')}</p>
                        </div>
                        </div>
                        {showError()}
                        <button className="btn btn-primary mt-3">{t('Send')}</button>
                    </form>
                </div>
            </div>
        </>
    )
}