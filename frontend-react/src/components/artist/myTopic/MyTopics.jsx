import { useTranslation } from "react-i18next";
import Pagination from "../../Pagination";
import Topics from "../../public/forum/Topics";
import { myTopics } from "../../../api/forum.api";

export default function MyTopics(){
    const {t}=useTranslation();

    return(
        <>
            <h1>{t('My topics')}</h1>
            <Pagination request={myTopics}>
            {(data)=><Topics data={data} editable={true}/>}
            </Pagination>
        </>
    )
}