import { useTranslation } from "react-i18next";
import Topics from "./Topics";
import Pagination from "../../Pagination";
import { forumList } from "../../../api/forum.api";

export default function ForumPage(){
    const {t}=useTranslation();
    return(
        <>
            <h1>{t('Forum')}</h1>
            <Pagination request={forumList}> 
            {(data)=><Topics data={data}/>}
            </Pagination>
        </>
    )
}