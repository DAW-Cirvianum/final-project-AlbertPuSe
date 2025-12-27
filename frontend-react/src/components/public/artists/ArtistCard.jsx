import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Button } from 'react-bootstrap';

export default function ArtistCard({artist}){
    return(
        <Card className='mb-3' bg={'secondary'}>
            <Row className='g-0'>
                <Col md={4}>
                    <Card.Img src={artist.image} alt={artist.name}/>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title>{artist.name}</Card.Title>
                        <Card.Text>
                            {artist.username}<br/>
                            {artist.email}
                        </Card.Text>
                        <Button variant="primary">Veure perfil</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}