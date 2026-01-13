import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { artTypes } from "../../../api/artworks.api";

export default function SelectType({valueType, changeFunciton}){
    const [types, setTypes]= useState(null);
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchTypes(){
            const typesData= await artTypes();
            setTypes(typesData.data.artTypes);
        }
        fetchTypes()
    },[])

    function fillSelect(){
        if(!types) return <option disabled>Loading types</option>
        return types.map(type=>{return <option key={type.id} value={type.id}>{t(`artTypesTL.${type.name}`)}</option>})
    }

    return(
        <div className="mt-3">
            <label className="form-label">{t('Label type artwork')}</label>
            <select value={valueType} className="form-control" name="type" required onChange={changeFunciton}>
                    <option value='' disabled >{t('Select a type')}</option>
                    {fillSelect()}
            </select>
            <div className="invalid-feedback">
                {t('Invalid type artwork')}
            </div>
        </div>
    )
}