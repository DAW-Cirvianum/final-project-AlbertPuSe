import { Button, Form, FormLabel } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SelectType from "./SelectType";
import SelectTag from "./SelectTag";

export default function CreateArtwork(){
    const { t } = useTranslation();
    
    const hanleSubmit = ()=>{

    }

    const handleCancel= ()=>{
        
    }

    return(
        <>
            <h1>{t('Create artwork')}</h1>
            <Form className="p-4" encType="multipart/form-data" onSubmit={hanleSubmit}>
                <Form.Group>
                    <FormLabel>{t('Label image artwork')}</FormLabel>
                    <Form.Control name="image" type="file"/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>{t('Label name artwork')}</Form.Label>
                    <Form.Control name="title" type="text"/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>{t('Label description artwork')}</Form.Label>
                    <Form.Control name="description" as="textarea"/>
                </Form.Group>
                <SelectType/>
                <SelectTag/>
                <Form.Group className="mt-3">
                    <Form.Label>{t('Label price artwork')}</Form.Label>
                    <Form.Control name="price" type="number" step={0.01} placeholder=""/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Button>{t('Create artwork')}</Button>
                    <Button onClick={handleCancel}>{t('Cancel')}</Button>
                </Form.Group>
            </Form>
        </>
    )
}