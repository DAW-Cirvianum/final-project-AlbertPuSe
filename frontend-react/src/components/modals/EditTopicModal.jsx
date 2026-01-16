import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function EditTopicModal({show,onClose,onConfirm,object}){
    const [form, setForm] = useState({});
    const [image, setImage]= useState(null);
    const [validate, setValidated]=useState(false);
    const {t}=useTranslation();

    useEffect(()=>{
        if(object){
            setForm({
                title: object.title,
                content: object.content}
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
        formData.append('content', form.content);


        if(image){
            formData.append('image',image);
        }

        try{
            onConfirm(formData);
            setForm({ title: '', content:''});
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
                            <textarea className="form-control" name="description" value={form.content} onChange={handleChange} required/>
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