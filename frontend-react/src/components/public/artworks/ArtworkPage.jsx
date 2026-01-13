import { useEffect, useState } from "react"
import { artworkById, relatedArtworks } from "../../../api/artworks.api";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import ArtworkCard from "./ArtworkCard";
import BackButton from "../../BackButton";

export default function ArtworkPage(){
    const [artwork,setArtwork]=useState(null);
    const [artworksRelated,setArtworkRelated]=useState(null);
    const {t}=useTranslation();
    const params=useParams();

    useEffect(()=>{
        async function fetchArtwork(){
            const res= await artworkById(params.artworkId);
            setArtwork(res.data.artwork);
        }
        
        fetchArtwork();

        async function fetchArtworksArtist(){
            const res= await relatedArtworks(params.artworkId);
            setArtworkRelated(res.data.artworks);
        }
        fetchArtworksArtist();

    },[params])

    function loadTags(){
        return artwork.tags.map(a=><p key={a.id}>{t(`tagsTL.${a.name}`)}</p>)
    }

    function loadArtworRandom(){
        if(!artworksRelated) return <p>{t('Loading')}</p>
        return artworksRelated.map(a=><ArtworkCard key={a.id} artwork={a}/>)
    }

    if(!artwork){
        return <span>{t('Loading')}</span>
    }

    return(
        <>
            <BackButton/>
            <h1>{artwork.title}</h1>
            <div>
            <img src={artwork.image} alt={`Image of ${artwork.title}`}/>
            <p>{t(`artTypesTL.${artwork.art_type.name}`)}</p>
            {loadTags()}
            <p>{t('Price')}{artwork.price}</p>
            </div>
            <div>
                <p>{artwork.description}</p>
            </div>

            <h2>{t('About artist')}</h2>
            <img src={artwork.avatar} alt={`Avatar of ${artwork.user.name}`}/>
            <div>
                <p>{artwork.user.description}</p>
                <Button as={Link} to={`/artists/${artwork.user.id}`}>{t('See profile')}</Button>
            </div>

            <div>
                <h2>{t('Other works by the author')}</h2>
                {loadArtworRandom()}
            </div>

        </>
    )
}