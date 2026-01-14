import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ROUTES } from "../../../routes";
import {loginUser} from "../../../api/users.api";
import { useTranslation } from "react-i18next";

export default function Login(){
    const [form, setForm] = useState({ login: '', password: '' })
    const { setUser } = useContext(AuthContext);
    const [validate, setValidated]=useState(false);
    const [error,setError]=useState();
    const navigate = useNavigate();
    const {t}=useTranslation();
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
    const fetchUsers = async () => {
      try {
        const res = await loginUser(form.login,form.password);
        const token = res.data.token
        setUser(res.data.user)
        localStorage.setItem("token",token);
        navigate(ROUTES.HOME)
      } catch (error) {
        console.error(error);
        setError("No s'ha trobat l'usuari, torni a intentar")
      }
    };
    fetchUsers();
  }

  function showError(){
    if(error){
      return <span>{error}</span>
    }
  }
  
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="flex-column w-25">
            <h1>Login</h1>
            <form noValidate className={validate ? 'was-validated p-4' : 'p-4'} onSubmit={handleSubmit}>
              <div>
                <label className="form-label" htmlFor="login">{t('Username or email')}</label>
                <input className="form-control"
                  name="login" 
                  type="text"
                  value={form.nom} 
                  onChange={handleChange} 
                  placeholder="Nom o email" 
                  required
                />
                <div className="invalid-feedback">
                  <p>{t('Invalid email or username')}</p>
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="password">{t('Password')}</label>
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
              {showError()}
              <button className="btn btn-primary mt-3">{t('Send')}</button>
            </form>
        </div>
      </div>
    </>
  )
}