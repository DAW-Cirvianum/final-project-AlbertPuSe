import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { tags } from "../../../api/artworks.api";

export default function SelectTag(){
    const [tag, setTag]= useState();
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchTypes(){
            const types= await tags();
            setTag(types.data.tags);
        }
        fetchTypes()
    },[])

    function fillSelect(){
        if(!tag) return <option disabled>Loading tags</option>
        return tag.map(tag=>{return <option value={tag.id}>{t(`tagsTL.${tag.name}`)}</option>})
    }
    return(
        <Form.Group className="mt-3">
            <Form.Label>{t('Label tags artwork')}</Form.Label>
            <Form.Select name="tag" required>
                    <option selected disabled>{t('Select a tag')}</option>
                    {fillSelect()}
            </Form.Select>
        </Form.Group>
    )
}