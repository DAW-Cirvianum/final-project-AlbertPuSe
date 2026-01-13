import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { tags } from "../../../api/artworks.api";

export default function SelectTag({valueTag, changeFunciton}){
    const [tag, setTag]= useState(null);
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchTypes(){
            const tagsData= await tags();
            setTag(tagsData.data.tags);
        }
        fetchTypes()
    },[])

    function fillSelect(){
        if(!tag) return <option disabled>Loading tags</option>
        return tag.map(tag=>{return <option key={tag.id} value={tag.id}>{t(`tagsTL.${tag.name}`)}</option>})
    }
    return(
        <div className="mt-3">
            <label className="form-label">{t('Label tags artwork')}</label>
            <select value={valueTag} className="form-control" name="tag" required onChange={changeFunciton}>
                    <option value='' disabled>{t('Select a tag')}</option>
                    {fillSelect()}
            </select>
            <div className="invalid-feedback">
                {t('Invalid tag')}
            </div>
        </div>
    )
}