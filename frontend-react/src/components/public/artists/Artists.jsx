import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { artistsList } from "../../../api/users.api";
import ArtistCard from "./ArtistCard";
import { Row } from "react-bootstrap";

export default function Artists(){
    const [artists, setArtists]= useState(null)
    const {t}=useTranslation();
    useEffect(()=>{
        async function fetchArtists(){
            const artists= await artistsList();
            setArtists(artists.data.artists)
        }
        fetchArtists()
    },[]);
    
    function showArtists(){
        if(!artists)return <p>Loading</p>
        return artists.map( a=> <ArtistCard key={a.id} artist={a}/>)
    }
    return(
        <>
            <Row xs={1} md={2} className="g-4">{showArtists()}</Row>
        </>
    )
}