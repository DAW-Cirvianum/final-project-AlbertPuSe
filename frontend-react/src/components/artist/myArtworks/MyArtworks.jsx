import { myArtworks } from "../../../api/artworks.api";
import { useTranslation } from "react-i18next";
import Artworks from "../../public/artworks/Artworks";
import Pagination from "../../public/Pagination";

export default function MyArtworks(){
    const {t}=useTranslation();

    return(
        <>
            <h1>{t('My artworks')}</h1>
            <Pagination request={myArtworks}>
            {(data)=><Artworks data={data}/>}
            </Pagination>
        </>
    )
}