import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../modals/ConfirmModal';
import { deleteArtwork } from '../../../api/artworks.api';

export default function ArtworkCard({artwork,edit}){
    const [showDelete, setShowDelete] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [visible, setVisible]=useState(true);
    const {t}=useTranslation();

    function showImage(){
        if((artwork.image).includes('artworks')){
            return<Card.Img variant='top' src={`http://localhost/storage/${artwork.image}`} alt={artwork.title} fluid/>
        }

        return <Card.Img variant='top' src={artwork.image} alt={artwork.title} fluid/>
    }

    const confirmModify=()=>{
        setShowModal(true);

    }

    const confirmDelete= async (article)=>{
        setShowDelete(true);
        setSelectedArtwork(article);
    }

    const deleteArtworkF= async ()=>{
        const res= await deleteArtwork(artwork.id);
        setShowDelete(false);
        setVisible(false)
    }

    const cancelModal=()=>{
        setShowModal(false);
        setSelectedArticle(null);
    }

    const buttonEdit=()=>{
        if(edit)  return(<>
                <Button variant="danger" onClick={()=>confirmDelete(artwork)}>{t('Delete')}</Button>
                <Button variant="info" onClick={()=>confirmModify()}>{t('Modify')}</Button>
            </>)
        
    }
    
    if(!visible) return null

    return(
        <>
            <Card className='w-50' bg={'secondary'}>
                {showImage()}
                <Card.Body>
                    <Card.Title>{artwork.title}</Card.Title>
                    <Card.Text className='h-25 overflow-hidden'>
                        {artwork.description}
                    </Card.Text>
                    <Card.Text>
                        Price: {artwork.price}
                    </Card.Text>
                    <Button as={Link} to={`/artworks/${artwork.id}`} variant="primary">{t('See more')}</Button>
                    {buttonEdit()}
                </Card.Body>
            </Card>
            <ConfirmModal show={showDelete} onConfirm={deleteArtworkF} onClose={cancelModal} object={selectedArtwork} message={'Delete artwork'}/>
        </>
    )
}