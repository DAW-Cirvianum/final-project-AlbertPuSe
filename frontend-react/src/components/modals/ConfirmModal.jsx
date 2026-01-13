import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ConfirmModal({show,onClose,onConfirm,object,message}){
    const {t}=useTranslation();
    if(!object) return null
    return(
        <>
            <Modal show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Confirm delete')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{t(message)}</p>
                    <p>{object.title}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        {t('Cancel')}
                    </Button>
                    <Button variant="danger" onClick={onConfirm}>
                        {t('Confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}