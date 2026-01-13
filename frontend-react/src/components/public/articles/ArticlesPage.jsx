import { useTranslation } from "react-i18next"
import Articles from "./Articles";
import Pagination from "../../Pagination";
import { articleList } from "../../../api/articles.api";

export default function ArticlesPage(){
    const {t}=useTranslation();
    return(
        <>
            <h1>{t('Articles')}</h1>
            <Pagination request={articleList}>
            {(data)=><Articles data={data} editable={false}/>}
            </Pagination>
        </>
    )
}