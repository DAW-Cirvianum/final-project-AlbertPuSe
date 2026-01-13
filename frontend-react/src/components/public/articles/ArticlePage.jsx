import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { articleById } from "../../../api/articles.api";
import BackButton from "../../BackButton";

export default function ArtcilePage(){
    const [article,setArticle]=useState();
    const params=useParams();
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchArticle(){
            const res= await articleById(params.articleId)
            setArticle(res.data.article)
        }
        fetchArticle()
    },[])

    function showImage(){
        if(article.image){
        if((article.image).includes('articles')){
            return <img className="img-fluid" src={`http://localhost/storage/${article.image}`} alt={article.title} width={300}/>
        }

        return <img className="img-fluid" src={article.image} alt={article.title} width={300}/>
        }
    }

    if(!article){
        return <span>{t('Loading')}</span>
    }
    return(
        <>
            <BackButton/>
            <div className="d-flex justify-content-center">
                <div className="w-75">
                    <h1>{article.title}</h1>
                    <div className="d-flex ">
                        {showImage()}
                        <p>{article.content}</p>
                    </div>   
                </div> 

            </div>   
        </>
    )
}