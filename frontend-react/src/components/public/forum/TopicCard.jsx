import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ConfirmModal from "../../modals/ConfirmModal";
import { useState } from "react";
import EditTopicModal from "../../modals/EditTopicModal";
import { deleteTopic } from "../../../api/forum.api";

export default function TopicCard({topic, edit}){
    const [showDelete, setShowDelete] = useState(false);
    const [showModify, setShowModify] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [visible, setVisible]=useState(true);
    const {t}=useTranslation();

    const confirmModify= async ()=>{
        setShowModify(true);
        setSelectedTopic(topic)
    }

    const modifyTopicF= async (data)=>{
        const res= await modifyTopic(topic.id, data);
        setShowModify(false);
        setSelectedTopic(null);
    }

    const confirmDelete= async (topic)=>{
        setShowDelete(true);
        setSelectedTopic(topic);
    }
    
    const deleteTopicF= async ()=>{
        const res= await deleteTopic(topic.id);
        setShowDelete(false);
        setVisible(false)
    }

    const cancelModal=()=>{
        setShowDelete(false);
        setShowModify(false);
        setSelectedTopic(null);
    }
    
    const buttonEdit=()=>{
        if(edit)  return(<>
                <Button variant="danger" onClick={()=>confirmDelete(topic)}>{t('Delete')}</Button>
                <Button variant="info" onClick={()=>confirmModify(topic)}>{t('Modify')}</Button>
            </>)
        
    }

    if(!visible) return null;
    return(
        <>
            <Card bg={'secondary'}>
                {topic?.images&& <Card.Img variant='top' src={topic.image} alt={topic.title}/>}
                    <Card.Body>
                        <Card.Title>{topic.title}</Card.Title>
                        <Card.Text className='h-25 overflow-hidden'>
                            {topic.content}
                        </Card.Text>
                        <Button as={Link} to={`/forum/${topic.id}`} variant="primary">{t('See more')}</Button>
                        {buttonEdit()}
                    </Card.Body>
            </Card>
            <ConfirmModal show={showDelete} onConfirm={deleteTopicF} onClose={cancelModal} object={selectedTopic} message={'Delete topic'}/>
            <EditTopicModal show={showModify} onConfirm={modifyTopicF} onClose={cancelModal} object={selectedTopic}/>
        </>
    )
}