import { t } from "i18next";
import Artists from "./Artists";

export default function ArtistsPage(){
    
    return(
        <>
            <h1>{t('Artists')}</h1>
            <Artists/>
        </>
    )
}