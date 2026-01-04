import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function ArtworkCard({artwork}){
    const {t}=useTranslation();
    return(
        <Card className='w-50' bg={'secondary'}>
            <Card.Img  variant='top' src={artwork.image} alt={artwork.title} fluid/>
                <Card.Body>
                    <Card.Title>{artwork.title}</Card.Title>
                    <Card.Text className='h-25 overflow-hidden'>
                        {artwork.description}
                    </Card.Text>
                    <Card.Text>
                        Price: {artwork.price}
                    </Card.Text>
                    <Button variant="primary">{t('See more')}</Button>
                </Card.Body>
        </Card>
    )
}