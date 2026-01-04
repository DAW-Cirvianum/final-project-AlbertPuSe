import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { topic_Id } from "../../../api/forum.api";

export default function TopicPage(){
    const [data, setData]=useState(null);
    const params= useParams();
    const navigate= useNavigate();
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchTopic(){
            const res= await topic_Id(params.forumId);
            setData(res.data.data);
        }
        fetchTopic()
    })

    if(!data) return<span>{t('Loading')}</span>

    
    return(
        <>
            <Button onClick={()=>navigate(ROUTES.FORUM)}>{t('Back')}</Button>
            <h1>{data.title}</h1>
        </>
    )
}