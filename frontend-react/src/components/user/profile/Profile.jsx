import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { modifyUser } from "../../../api/users.api";

export default function Profile(){
    const [form, setForm] = useState({});
    const [editEnabled,setEditEnabled]=useState(true);
    const [validate, setValidated]=useState(false);
    const {user}=useContext(AuthContext);
    const {t}=useTranslation();

    useEffect(()=>{
        setForm({ name: '', username: '', email:''})
    },[])
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

   const handleSubmit = async e=>{
           e.preventDefault();
   
           const formElement = e.currentTarget;
   
            if (!formElement.checkValidity()) {
                e.stopPropagation();
                setValidated(true);
                return;
            }
            const formData = new FormData();
   
            formData.append('title', form.name);
            formData.append('description', form.username);
            formData.append('price', form.email);
            formData.append('image',image);
            try{
                const res= await modifyUser(formData);
                setForm({ name: '', username: '', email:''});
                setValidated(false);
                setMessage(res.data.message);
                setEditEnabled(false);
            }catch(error){
                console.error(error);
            }
        }

        const handleEnableEdit=()=>{
            setEditEnabled(false);
        }

        const handleDesableEdit=()=>{
            setEditEnabled(false);
        }
    return(
        <>
            <p>{t('User information')}</p>
            <div>
                <div>
                    <form noValidate className={validate ? 'was-validated p-4' : 'p-4'} onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label" htmlFor="username">{t('Name')}</label>
                            <input className="form-control"
                            name="name" 
                            type="text"
                            value={user.name} 
                            onChange={handleChange} 
                            placeholder="Nom d'usuari"
                            disabled={editEnabled}
                            required 
                            />
                            <div className="invalid-feedback">
                                <p>{t('Invalid username')}</p>
                            </div>
                        </div>
                        <div>
                            <label className="form-label" htmlFor="login">{t('Username')}</label>
                            <input className="form-control"
                            name="login" 
                            type="text"
                            value={user.username} 
                            onChange={handleChange} 
                            placeholder="Nom o email" 
                            disabled={editEnabled}
                            required
                            />
                            <div className="invalid-feedback">
                            <p>{t('Invalid email or username')}</p>
                            </div>
                        </div>
                        <div>
                            <label className="form-label" htmlFor="email">{t('Email')}</label>
                            <input className="form-control"
                            name="email" 
                            type="text"
                            value={user.email} 
                            onChange={handleChange} 
                            placeholder="Email"
                            disabled={editEnabled}
                            required
                            />
                            <div className="invalid-feedback">
                                <p>{t('Invalid email')}</p>
                            </div>
                        </div>
                        {editEnabled&&(<button className="btn btn-primary mt-3" type="button" onClick={handleEnableEdit}>{t('Edit')}</button>)}
                        {!editEnabled&&(<>
                        <button className="btn btn-primary mt-3" type="button" onClick={handleDesableEdit}>{t('Cancel')}</button>
                        <button className="btn btn-primary mt-3" type="submit">{t('Send')}</button>
                        </>)}
                    </form>
                </div>
            </div>
        </>
    )
}