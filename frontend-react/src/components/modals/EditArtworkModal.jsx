import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SelectType from "../artist/createArtwork/SelectType";
import SelectTag from "../artist/createArtwork/SelectTag";

export default function EditArtworkModal({show,onClose,onConfirm,object}){
    const [form, setForm] = useState({});
    const [image, setImage]= useState(null);
    const [validate, setValidated]=useState(false);
    const {t}=useTranslation();
    useEffect(()=>{
        if(object){
            setForm({
                title: object.title,
                description: object.description,
                price: object.price,
                tag: object.tag,
                type: object.type}
            )
        }
    },[object]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
        
    const handleSubmit =e=>{
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

        if(image){
            formData.append('image',image);
        }

        try{
            onConfirm(formData);
            setForm({ title: '', description: '', price:'', tag:'', type:''});
            setValidated(false);
            setImage(null);
        }catch(error){
            console.error(error);
        }
    }

    const handleImages = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    function showImages(){
        if(!image) return <span>Not uploaded any image</span>

        return <img src={URL.createObjectURL(image)} width={100}/>
    }


    if(!object) return null

    return(
        <>
            <Modal show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Confirm modify article')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                   <form noValidate className={validate ? 'was-validated p-4' : 'p-4'} encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="mt-3">
                           <label className="form-label">{t('Label name artwork')}</label>
                           <input className="form-control" name="title" value={form.title} type="text" onChange={handleChange} required/>
                            <div className="invalid-feedback">
                                {t('Invalid title')}
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="form-label">{t('Label description artwork')}</label>
                            <textarea className="form-control" name="description" value={form.description} onChange={handleChange} required/>
                            <div className="invalid-feedback">
                                {t('Invalid description')}
                           </div>
                        </div>
                        <div>
                            <label className="form-label">{t('Label image artwork')}</label>
                            <input className="form-control" name="image" type="file"
                            accept="image/*" onChange={handleImages}/>
                            <div className="invalid-feedback">
                                {t('Invalid image')}
                            </div>
                        </div>
                        <SelectType valueType={form.type} changeFunciton={handleChange}/>
                        <SelectTag valueTag={form.tag} changeFunciton={handleChange}/>
                        <div className="mt-3">
                            <label className="form-label">{t('Label price artwork')}</label>
                            <input className="form-control" name="price" value={form.price} type="number" step={0.01} placeholder="" onChange={handleChange} required/>
                            <div className="invalid-feedback">
                                {t('Invalid price')}
                            </div>
                        </div>
                        {showImages()}
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onClose}>
                                {t('Cancel')}
                            </Button>
                            <Button variant="primary" type="submit" onSubmit={handleSubmit}>
                                {t('Confirm')}
                            </Button>
                        </Modal.Footer>
                        </form>
                </Modal.Body>
            </Modal>
        </>
    )
}