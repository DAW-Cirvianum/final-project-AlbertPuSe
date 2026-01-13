import { useTranslation } from "react-i18next"
import TopicCard from "./TopicCard";
import { Row } from "react-bootstrap";

export default function Topics({data}){
    const {t}=useTranslation();
    
    function showForumTopics(){
        !data && <span>{t('Loading')}</span>
        return data.map(a=><TopicCard key={a.id} topic={a}/>)
    }
    return(
        <>
            <Row xs={1} md={2} >{showForumTopics()}</Row>
        </>
    )
}