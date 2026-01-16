import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { createComment, topic_Id } from "../../../api/forum.api";
import BackButton from "../../BackButton";
import CommentCard from "./CommentCard";

export default function TopicPage(){
    const [data, setData]=useState(null);
    const [form, setForm] = useState({ content: '' });
    const [validate, setValidated]=useState(false);
    const [message, setMessage]=useState(null);
    const params= useParams();
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchTopic(){
            const res= await topic_Id(params.forumId);
            setData(res.data.data);
        }
        fetchTopic()
    },[form])
    
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    
    const handleSubmit= async e =>{
        e.preventDefault();
        const formElement = e.currentTarget;
    
        if (!formElement.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        const formData = new FormData();
    
        formData.append('content', form.content);
        
        try{
            const res= await createComment(params.forumId,formData);
            setMessage(res.data.message);
            setForm({ content: '' });
            setValidated(false);
        }catch(error){
            console.error(error);
        }
    }

        const handleCancel=()=>{
            setForm({ content: '' });
            setValidated(false);
        }

    function comments(){
        if(!data.comments) return <span>{t('Loading')}</span>
        return data.comments.map(a=><CommentCard key={a.id} comment={a}/>)
    }
    if(!data) return<span>{t('Loading')}</span>

    return(
        <>
            <BackButton/>
            <div>
                <div>
                    <img src={data.user.avatar} alt={`Avatar of ${data.user.name}`}/>
                    <p>{data.user.name}</p>
                    <p>Published on {data.created_at}</p>
                    <p>Updated on {data.updated_at}</p>
                </div>
                <div>
                    <h1>{data.title}</h1>
                    <img src={data.image}/>
                    <p>{data.content}</p>
                </div>
            </div>

            <div>
                <h2>Comments</h2>
                <form noValidate className={validate ? 'was-validated' : ''} encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h1>{t('Create article')}</h1>
                    <div className="d-flex flex-column w-50">
                        <label className="form-label">{t('Label content article')}</label>
                        <textarea className="form-control" name="content" type="text" required
                        value={form.content} onChange={handleChange}/>
                        <div className="invalid-feedback">
                            {t('Invalid content')}
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">{t('Commentate')}</button>
                    <button className="btn btn-danger" type="reset" onClick={handleCancel}>{t('Cancel')}</button>
                </form>
                {comments()}
            </div>
        </>
    )
}