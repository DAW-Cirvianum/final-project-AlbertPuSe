import { useContext, useState } from "react"
import { api } from "../../../api"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ROUTES } from "../../../routes";

export default function Login(){
    const [form, setForm] = useState({ login: '', password: '' })
    const { user, setUser} = useContext(AuthContext);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const fetchUsers = async () => {
      try {
        const res = await api.post('/login',{ "login":form.login, "password":form.password});
        const token = res.data.token
        setUser(res.data.user)
        localStorage.setItem("token",token);
        <Navigate to={ROUTES.HOME}/>
    } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login">Nom d'usuari o email</label>
      <input 
        name="login" 
        type="text"
        value={form.nom} 
        onChange={handleChange} 
        placeholder="Nom o email" 
      />
      <label htmlFor="password">Contrasenya</label>
      <input 
        name="password" 
        type="password"
        value={form.password} 
        onChange={handleChange} 
        placeholder="Contrasenya" 
      />
      <button>Enviar</button>
    </form>
  )
}