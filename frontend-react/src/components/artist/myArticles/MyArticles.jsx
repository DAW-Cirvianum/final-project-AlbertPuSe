import { useTranslation } from "react-i18next";
import { myArticles } from "../../../api/articles.api";
import Articles from "../../public/articles/Articles";
import Pagination from "../../Pagination";
import { useState } from "react";

export default function MyArticles(){
    const {t}=useTranslation();


    return(
        <>
            <h1>{t('My articles')}</h1>
            <Pagination request={myArticles} >
            {(data)=><Articles data={data} editable={true}/>}
            </Pagination>
        </>
    )
}