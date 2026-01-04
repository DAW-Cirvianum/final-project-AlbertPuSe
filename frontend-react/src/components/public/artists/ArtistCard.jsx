import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function ArtistCard({artist}){
    const {t}=useTranslation();
    return(
        <Card className='mb-3' bg={'secondary'}>
            <Row className='g-0'>
                <Col md={4}>
                    <Card.Img src={artist.image} rounded alt={artist.name} fluid/>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title>{artist.name}</Card.Title>
                        <Card.Text>
                            {artist.description}
                        </Card.Text>
                        <Button variant="primary">{t('See profile')}</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}