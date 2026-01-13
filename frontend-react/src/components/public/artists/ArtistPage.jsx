import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { artistById } from "../../../api/users.api";
import { useTranslation } from "react-i18next";
import ArtworkCard from "../artworks/ArtworkCard";
import ArticleCard from "../articles/ArticleCard";
import BackButton from "../../BackButton";

export default function ArtistPage(){
    const [artistData, setArtistData]=useState(null);
    const params=useParams();
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchArtist(){
            const res= await artistById(params.artistId);
            setArtistData(res.data.artist);
            console.log(artistData)
        }
        fetchArtist();
    },[])

    function latestArtworks(){
        if(!artistData.artworks) return <p>El artista no ha subido ninguna obra</p>
        if(artistData.artworks.length<3) return artistData.artworks.reverse().map(a=><ArtworkCard key={a.id} artwork={a}/>)
        return artistData.artworks.reverse().slice(1,4).map(a=><ArtworkCard key={a.id} artwork={a}/>)
    }

    function articlesUser(){
        if(!artistData.articles) return <p>El artista no ha publicado </p>
        if(artistData.articles.length<3) return artistData.articles.map(a=><ArticleCard key={a.id} article={a}/>)
        return artistData.articles.slice(1,4).map(a=><ArticleCard key={a.id} article={a}/>)
    }

    if(!artistData){return<span>{t('Loading')}</span>}
    
    return(
        <>
            <BackButton/>
            <h1>{ artistData.name}</h1>
            <div>
                <img src={artistData.avatar} alt={`Avatar of ${artistData.name}`}/>
                <p>{artistData.description}</p>
            </div>
            <div>
                <h2>{t('Recent artworks by the artist')}</h2>
                {latestArtworks()}
            </div>
            <div>
                <h2>{t('Articles')}</h2>
                {articlesUser()}
            </div>
        </>
    )
}