import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { topic_Id } from "../../../api/forum.api";
import BackButton from "../../BackButton";
import CommentCard from "./CommentCard";

export default function TopicPage(){
    const [data, setData]=useState(null);
    const params= useParams();
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchTopic(){
            const res= await topic_Id(params.forumId);
            setData(res.data.data);
        }
        fetchTopic()
    },[])

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
                    <img src={data.images[0].image}/>
                    <p>{data.content}</p>
                </div>
            </div>

            <div>
                <h2>Comments</h2>
                {comments()}
            </div>
        </>
    )
}