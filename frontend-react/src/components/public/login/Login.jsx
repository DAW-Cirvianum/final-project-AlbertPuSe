import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ROUTES } from "../../../routes";
import {loginUser} from "../../../api/users.api";

export default function Login(){
    const [form, setForm] = useState({ login: '', password: '' })
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const fetchUsers = async () => {
      try {
        const res = await loginUser(form.login,form.password);
        const token = res.data.token
        setUser(res.data.user)
        localStorage.setItem("token",token);
        navigate(ROUTES.HOME)
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