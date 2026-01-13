import { Row } from "react-bootstrap";
import ArtworkCard from "./ArtworkCard";
import { useTranslation } from "react-i18next";

export default function Artworks({data,editable}){
    const {t}=useTranslation();
    function showArtworks(){
        if(!data)return <p>{t('Loading')}</p>
        if(editable) return data.map( a=> <ArtworkCard key={a.id} artwork={a} edit={editable}/>)
        return data.map( a=> <ArtworkCard key={a.id} artwork={a}/>)
    }
    
    return(
        <>
            <Row xs={1} md={2} lg={3} className="g-4">{showArtworks()}</Row>
        </>
    )
}