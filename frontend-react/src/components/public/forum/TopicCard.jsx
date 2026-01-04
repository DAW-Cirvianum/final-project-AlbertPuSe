import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function TopicCard({topic}){
    const {t}=useTranslation();
    return(
        <>
            <Card bg={'secondary'}>
                {topic?.images&& <Card.Img variant='top' src={topic.image} alt={topic.title}/>}
                    <Card.Body>
                        <Card.Title>{topic.title}</Card.Title>
                        <Card.Text className='h-25 overflow-hidden'>
                            {topic.content}
                        </Card.Text>
                        <Button as={Link} to={`${topic.id}`} variant="primary">{t('See more')}</Button>
                    </Card.Body>
            </Card>
        </>
    )
}