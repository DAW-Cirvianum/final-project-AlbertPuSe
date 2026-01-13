import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function BackButton(){
    const {t}=useTranslation();
    const navigate = useNavigate();

    return (
        <Button variant="primary" onClick={() => navigate(-1)}>{t('Back')}</Button>
    );   
}