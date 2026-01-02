import ArtistCard from "./ArtistCard";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Artists({data}){
    const {t}=useTranslation();
    function showArtists(){
        if(!data)return <p>{t('Loading')}</p>
        return data.map( a=> <ArtistCard key={a.id} artist={a}/>)
    }
    
    return(
        <>
            <Row xs={1} md={2} className="g-4">{showArtists()}</Row>
        </>
    )
}