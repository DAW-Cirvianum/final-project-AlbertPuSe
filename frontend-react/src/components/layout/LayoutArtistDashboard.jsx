import { useState } from "react"
import { Button, Offcanvas, Nav } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next";

export default function LayoutArtistDashboard(){
    const [show, setShow]=useState(false)
    const { t } = useTranslation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <Button className="d-sm-none" onClick={handleShow}>
                Menu
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menú</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to={'dashboard'} onClick={handleClose} >{t('Profile')}</Nav.Link>
                        <Nav.Link as={Link} to={'artwork'} onClick={handleClose} >{t('Artworks')}</Nav.Link>
                        <Nav.Link as={Link} to={'article'} onClick={handleClose} >{t('Articles')}</Nav.Link>
                        <Nav.Link as={Link} to={'artwork/create'} onClick={handleClose} >{t('Add art')}</Nav.Link>
                        <Nav.Link as={Link} to={'article/create'} onClick={handleClose}>{t('Add article')}</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            <aside className="d-none d-sm-block" style={{ width: '200px', position: 'fixed', height: '100vh', backgroundColor: '#f8f9fa' }}>
                <Nav className="flex-column p-2">
                    <Nav.Link as={Link} to={'dashboard'} >{t('Profile')}</Nav.Link>
                    <Nav.Link as={Link} to={'artwork'} >{t('Artworks')}</Nav.Link>
                    <Nav.Link as={Link} to={'article'} >{t('Articles')}</Nav.Link>
                    <Nav.Link as={Link} to={'artwork/create'} >{t('Add art')}</Nav.Link>
                    <Nav.Link as={Link} to={'article/create'} >{t('Add article')}</Nav.Link>
                </Nav>
            </aside>

            <div style={{ marginLeft: '200px' }}>
                <Outlet/>
            </div>
        </>
    )
}