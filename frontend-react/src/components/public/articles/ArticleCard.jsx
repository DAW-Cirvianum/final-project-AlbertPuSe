import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ConfirmModal from "../../modals/ConfirmModal";
import { deleteArticle } from "../../../api/articles.api";

export default function ArticleCard({article, edit}){
    const [showDelete, setShowDelete] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [visible, setVisible]=useState(true);
    const {t}=useTranslation();

    const showImage=()=>{
        if(article.image){
            if((article.image).includes('articles')){
                return <Col md={4}>
                        <Card.Img  src={`http://localhost/storage/${article.image}`} alt={article.title}/>
                    </Col>
            }

            return  <Col md={4}>
                        <Card.Img src={article.image} alt={article.title}/>
                    </Col>
        }
    }

    const confirmModify= async ()=>{
        setShowModal(true);
        setOnConfirm()
    }

    const confirmDelete= async (article)=>{
        setShowDelete(true);
        setSelectedArticle(article);
    }

    const deleteArticleF= async ()=>{
            const res= await deleteArticle(article.id);
            setShowDelete(false);
            setVisible(false)
    }

    const cancelModal=()=>{
        setShowDelete(false);
        setSelectedArticle(null);
    }

    const buttonEdit=()=>{
        if(edit)  return(<>
                <Button variant="danger" onClick={()=>confirmDelete(article)}>{t('Delete')}</Button>
                <Button variant="info" onClick={()=>confirmModify()}>{t('Modify')}</Button>
            </>)
        
    }
    if(!visible) return null
    return(
        <>
            <Card className='mb-3 ' bg={'secondary'}>
                <Row className='g-0'>
                    {showImage()}
                    <Col>
                        <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Text className='h-25 overflow-hidden'>
                                {article.content}
                            </Card.Text>
                            <Button as={Link} to={`/articles/${article.id}`} variant="primary">{t('See more')}</Button>
                            {buttonEdit()}
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <ConfirmModal show={showDelete} onConfirm={deleteArticleF} onClose={cancelModal} object={selectedArticle} message={'Delete article'}/>
        </>
    )
}