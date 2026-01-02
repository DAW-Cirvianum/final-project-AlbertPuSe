import { useEffect, useState } from "react"
import { myArtworks } from "../../../api/artworks.api";
import ArtworkCard from "../../public/artworks/ArtworkCard";
import { useTranslation } from "react-i18next";
import { Row } from "react-bootstrap";

export default function MyArtworks(){
    const [artworks, setArtworks]=useState();
    const {t}=useTranslation();
    useEffect(()=>{
            async function fetchArtists(){
                const artworks= await myArtworks();
                setArtworks(artworks.data.artworks);
            }
            fetchArtists()
        },[]);


        function showArtworks(){
            if(!artworks)return <p>Loading</p>
            return artworks.map(a=><ArtworkCard key={a.id} artwork={a}/>)
        }
    return(
        <>
            <h1>{t('My art')}</h1>
            <Row xs={1} md={2} className="g-4">{showArtworks()}</Row>
        </>
    )
}