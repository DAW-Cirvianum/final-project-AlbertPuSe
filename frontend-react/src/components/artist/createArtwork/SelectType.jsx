import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { artTypes } from "../../../api/artworks.api";

export default function SelectType(){
    const [types, setTypes]= useState();
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchTypes(){
            const types= await artTypes();
            setTypes(types.data.artTypes);
        }
        fetchTypes()
    },[])

    function fillSelect(){
        if(!types) return <option disabled>Loading types</option>
        return types.map(type=>{return <option value={type.id}>{t(`artTypesTL.${type.name}`)}</option>})
    }
    return(
        <Form.Group className="mt-3">
            <Form.Label>{t('Label type artwork')}</Form.Label>
            <Form.Select name="type" required>
                    <option selected disabled>{t('Select a type')}</option>
                    {fillSelect()}
            </Form.Select>
        </Form.Group>
    )
}