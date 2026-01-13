import Artists from "./Artists";
import { artistsList } from "../../../api/users.api";
import { useTranslation } from "react-i18next";
import Pagination from "../../Pagination";

export default function ArtistsPage(){
    const {t}=useTranslation();
    return(
        <>
            <h1>{t('Artists')}</h1>
            <Pagination request={artistsList}>
            {(data)=><Artists data={data}/>}
            </Pagination>
            
        </>
    )
}