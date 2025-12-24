import { useState } from "react"

export default function Register(){
    const [form, setForm] = useState({ name: '', username: '', email: '', phone: '', password: '', password_confirmation: '' })
    
    const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

    const handleSubmit = e => {
    e.preventDefault()
    const fetchUser = async () => {
      try {
        const res = await api.post('/register',{ "name":form.login, "username":form.password, "email":form.email, "phone":form.phone, "password":form.password, "password_confirmation":form.password_confirmation});
        <Navigate to={ROUTES.HOME}/>
    } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
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
                <button>Enviar</button>
            </form>
        </>
    )
}