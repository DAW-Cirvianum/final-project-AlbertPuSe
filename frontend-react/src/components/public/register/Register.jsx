import { useContext, useState } from "react"
import { ROUTES } from "../../../routes"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"
import {registerUser} from "../../../api/users.api";

export default function Register(){
    const [form, setForm] = useState({ name: '', username: '', email: '', phone: '', password: '', password_confirmation: '' })
    const [error, setError]= useState(null)
    const {setUser}=useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

    const handleSubmit = e => {
    e.preventDefault()
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nom</label>
                <input 
                    name="name" 
                    type="text"
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Nom complet" 
                    required
                />
                <label htmlFor="username"> Nom d'usuari</label>
                <input 
                    name="username" 
                    type="text"
                    value={form.username} 
                    onChange={handleChange} 
                    placeholder="Nom d'usuari"
                    required 
                />
                <label htmlFor="email">Email</label>
                <input 
                    name="email" 
                    type="text"
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    required
                />
                <label htmlFor="phone">Telefon</label>
                <input 
                    name="phone" 
                    type="text"
                    value={form.phone} 
                    onChange={handleChange} 
                    placeholder="Telefon" 
                />
                <label htmlFor="password">Contrasenya</label>
                <input 
                    name="password" 
                    type="password"
                    value={form.password} 
                    onChange={handleChange} 
                    placeholder="Contrasenya" 
                    required
                />
                <label htmlFor="password_confirmation">Confirmar contrasenya</label>
                <input 
                    name="password_confirmation" 
                    type="password"
                    value={form.password_confirmation} 
                    onChange={handleChange} 
                    placeholder="Repeteix la contrasenya" 
                    required
                />
                {showError()}
                <button>Enviar</button>
            </form>
        </>
    )
}