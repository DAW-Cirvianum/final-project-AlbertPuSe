import { useTranslation } from "react-i18next";
import { artworksList } from "../../../api/artworks.api";
import Artworks from "./Artworks";
import Pagination from "../Pagination";

export default function ArtworksPage(){
    const {t}=useTranslation();
    return(
        <>
            <h1>{t('Artworks')}</h1>
            <Pagination request={artworksList}>
            {(data)=><Artworks data={data}/>}
            </Pagination>
        </>
    )
}