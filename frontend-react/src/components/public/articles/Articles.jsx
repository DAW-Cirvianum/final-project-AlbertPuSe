import { useTranslation } from "react-i18next";
import ArticleCard from "./ArticleCard";
import { Row } from "react-bootstrap";

export default function Articles({data,editable}){
    const {t}=useTranslation();

    function showArticles(){
        if(!data)return <p>{t('Loading')}</p>
        if(editable){
            return data.map( a=> <ArticleCard key={a.id} article={a} edit={editable}/>)
        }else{
            return data.map( a=> <ArticleCard key={a.id} article={a}/>)
        }
    }

    return(
        <>
            <Row xs={1} md={2} className="g-4">{showArticles()}</Row>
        </>
    )
}