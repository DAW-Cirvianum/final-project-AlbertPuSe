import { useState } from "react";
import { useTranslation } from "react-i18next"
import { createTopic } from "../../../api/forum.api";

export default function CreateTopic(){
    const [form, setForm] = useState({ title: '', content: '' });
    const [images, setImages]= useState(null);
    const [validate, setValidated]=useState(false);
    const [message, setMessage]=useState(null);
    const {t}=useTranslation();
    
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    
    const handleSubmit= async e =>{
        e.preventDefault();
        const formElement = e.currentTarget;
    
        if (!formElement.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            console.log('Article no creat')
            return;
        }
        const formData = new FormData();
    
        formData.append('title', form.title);
        formData.append('content', form.content);

        if(images){
            formData.append('image',images);
        }
        
        try{
            const res= await createTopic(formData);
            setMessage(res.data.message);
            setForm({ title: '', content: '' });
            setImages(null);
            setValidated(false);
        }catch(error){
            console.error(error);
        }
    }
    
        const handleImages = (e) => {
            const file = e.target.files[0];
            setImages(file);
        };
    
        const handleCancel= e=>{
            setForm({ title: '', content: '' });
            setValidated(false);
            setImages(null);
        }
    
        function showImages(){
            if(!images) return <span>Not uploaded any image</span>
    
            return <img src={URL.createObjectURL(images)} width={100}/>
        }
    
    return(
        <>
            <h1>{t('Create topic')}</h1>
            <form noValidate className={validate ? 'was-validated' : ''} encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="d-flex flex-column w-50">
                    <label className="form-label">{t('Label title topic')}</label>
                    <input className="form-control" name="title" type="text" required
                    value={form.title} onChange={handleChange}/>
                    <div className="invalid-feedback">
                        {t('Invalid title')}
                    </div>
                </div>
                <div className="d-flex flex-column w-50">
                    <label className="form-label">{t('Label content topic')}</label>
                    <textarea className="form-control" name="content" type="text" required
                    value={form.content} onChange={handleChange}/>
                    <div className="invalid-feedback">
                        {t('Invalid content')}
                    </div>
                </div>
                <div className="d-flex flex-column w-50">
                    <label className="form-label">{t('Label images topic')}</label>
                    <input className="form-control" name="images" type="file"
                    accept="image/*" onChange={handleImages}/>
                    <div className="invalid-feedback">
                        {t('Invalid images')}
                    </div>
                </div>
                <div className="d-flex flex-wrap mt-2">
                    {showImages()}
                </div>
                <button className="btn btn-primary" type="submit">{t('Create topic')}</button>
                <button className="btn btn-danger" type="reset" onClick={handleCancel}>{t('Cancel')}</button>
            </form>
        </>
    )
}