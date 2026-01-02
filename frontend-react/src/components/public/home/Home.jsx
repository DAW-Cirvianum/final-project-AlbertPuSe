import { Button } from "react-bootstrap";
import { latestArtists } from "../../../api/users.api";
import Artists from "../artists/Artists";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { latestArtworks } from "../../../api/artworks.api";
import Artworks from "../artworks/Artworks";
import { useEffect, useState } from "react";

export default function Home(){
    const [artists, setArtists]=useState(null);
    const [artworks, setArtworks]=useState(null);
    const {t}= useTranslation();
    useEffect(()=>{
            async function fetchArtists(){
                const artists= await latestArtists();
                setArtists(artists.data.artists)
            }async function fetchArtworks(){
                const artworks= await latestArtworks();
                setArtworks(artworks.data.artworks)
            }
            fetchArtists()
            fetchArtworks()
        },[]);
    return(
        <>
            <h1>{t('Home')}</h1>
            <div>
                <h2>{t('Most recent artworks')}</h2>
                <Button as={Link} to={ROUTES.ARTWORKS} variant="outline-info">{t('See more')}</Button>
            </div>
            <Artworks data={artworks}/>
            
            <div>
                <h2>{t('Most recent artists')}</h2>
                <Button as={Link} to={ROUTES.ARTISTS} variant="outline-info">{t('See more')}</Button>
            </div>
            <Artists data={artists}/>
            
        </>
    )
}