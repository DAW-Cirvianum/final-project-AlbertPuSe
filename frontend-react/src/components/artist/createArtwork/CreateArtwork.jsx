import { useTranslation } from "react-i18next";
import SelectType from "./SelectType";
import SelectTag from "./SelectTag";
import { useState } from "react";
import { createArtwork } from "../../../api/artworks.api";

export default function CreateArtwork(){
    const [form, setForm] = useState({ title: '', description: '', price:'', tag:'', type:''});
    const [image, setImage]= useState(null);
    const [validate, setValidated]=useState(false);
    const [message, setMessage]=useState(null);
    const { t } = useTranslation();
    
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

        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('tag', form.tag);
        formData.append('type', form.type);
        formData.append('image',image);

        try{
            const res= await createArtwork(formData);
            setMessage(res.data.message);
            setForm({ title: '', description: '', price:'', tag:'', type:''});
            setValidated(false);
            setImage(null)
        }catch(error){
            console.error(error);
        }
    }

    const handleImages = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleCancel= ()=>{
        setForm({ title: '', description: '', price:'', tag:'', type:''});
        setValidated(false);
        setImage(null);
    }

    function showImages(){
        if(!image) return <span>Not uploaded any image</span>

        return <img src={URL.createObjectURL(image)} width={100}/>
    }

    return(
        <>
            <h1>{t('Create artwork')}</h1>
            <form noValidate className={validate ? 'was-validated p-4' : 'p-4'} encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="mt-3">
                    <label className="form-label">{t('Label name artwork')}</label>
                    <input className="form-control" name="title" type="text" onChange={handleChange} required/>
                    <div className="invalid-feedback">
                        {t('Invalid title')}
                    </div>
                </div>
                <div className="mt-3">
                    <label className="form-label">{t('Label description artwork')}</label>
                    <textarea className="form-control" name="description" onChange={handleChange} required/>
                    <div className="invalid-feedback">
                        {t('Invalid description')}
                    </div>
                </div>
                <div>
                    <label className="form-label">{t('Label image artwork')}</label>
                    <input className="form-control" name="image" type="file"
                    accept="image/*" onChange={handleImages} required/>
                    <div className="invalid-feedback">
                        {t('Invalid image')}
                    </div>
                </div>
                <SelectType valueType={form.type} changeFunciton={handleChange}/>
                <SelectTag valueTag={form.tag} changeFunciton={handleChange}/>
                <div className="mt-3">
                    <label className="form-label">{t('Label price artwork')}</label>
                    <input className="form-control" name="price" type="number" step={0.01} placeholder="" onChange={handleChange} required/>
                    <div className="invalid-feedback">
                        {t('Invalid price')}
                    </div>
                </div>
                {showImages()}
                <div className="mt-3">
                    <button className="btn btn-primary" type="submit">{t('Create artwork')}</button>
                    <button className="btn btn-danger" type="reset" onClick={handleCancel}>{t('Cancel')}</button>
                </div>
            </form>
            {message&&(<span>{message}</span>)}
        </>
    )
}