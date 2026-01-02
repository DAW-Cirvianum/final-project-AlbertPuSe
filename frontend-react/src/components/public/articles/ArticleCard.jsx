import { Card, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ArticleCard({article}){
    const {t}=useTranslation();
    return(
        <Card className='mb-3' bg={'secondary'}>
            <Row className='g-0'>
                <Col md={4}>
                    <Card.Img src={article.images[0].image} alt={article.title}/>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text className='h-25 overflow-hidden'>
                            {article.content}
                        </Card.Text>
                        <Button variant="primary">{t('See more')}</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}