import { Link, Outlet } from "react-router-dom";
import { Container,Nav,Navbar, Form, Button } from "react-bootstrap"; 
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ROUTES } from "../../routes";
import { useTranslation } from "react-i18next";

export default function Layout() {
	const {user, logout}=useContext(AuthContext);
	const { t, i18n } = useTranslation();

	function linksUsers(){
		return !user? 
		(<>
			<Nav.Link as={Link} to={ROUTES.LOGIN}>Login</Nav.Link>
			<Nav.Link as={Link} to={ROUTES.REGISTER}>Register</Nav.Link>
		</>):
		(<>
			{user.role === "user" && (
					<Nav.Link as={Link} to={ROUTES.PROFILE}>{user.username}</Nav.Link>
			)}

			{user.role === "artist" && (
				<>
					<Nav.Link as={Link} to={ROUTES.ARTIST_PROFILE}>{user.username}</Nav.Link>
				</>
			)}

			{user.role === "admin" && (
				<Nav.Link as={Link} to={ROUTES.ADMIN_DASHBOARD}>{user.username}</Nav.Link>
			)}

			<Button variant='outline-secondary' onClick={logout}>Logout</Button>
		</>)
	}
	
	const handleIdiom= (e)=>{
		i18n.changeLanguage(e.target.value)
	}
  return (
    <>
		<Navbar collapseOnSelect expand="sm" className="bg-body-tertiary" >
			<Container fluid>
					<Navbar.Brand as={Link} to={ROUTES.HOME}>NovArt</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to={ROUTES.ARTISTS}>{t("Artists")}</Nav.Link>
							<Nav.Link as={Link} to={ROUTES.ARTWORKS}>{t("Artworks")}</Nav.Link>	
							<Nav.Link as={Link} to={ROUTES.ARTICLES}>{t("Articles")}</Nav.Link>	
							<Nav.Link as={Link} to={ROUTES.FORUM}>{t("Forum")}</Nav.Link>	
							{user?.role === "user" && (<Nav.Link as={Link} to={ROUTES.AUCTIONS}>{t("Auction")}</Nav.Link>)}
							<Form.Select onChange={handleIdiom} defaultValue={i18n.language} size="sm">
								<option value="en">EN</option>
								<option value="ca">CA</option>
								<option value="es">ES</option>
							</Form.Select>
						</Nav>
						<Nav>
							{linksUsers()}
						</Nav>
					</Navbar.Collapse>
			</Container>	
		</Navbar>		
		<div>
			<Outlet /> {/* Aquí es mostraran els continguts*/ }
		</div>
		<footer>
			<div className="bg-dark-subtle d-flex justify-content-around p-3">
				<div>
					<p>NovArt-{t('Footer desc')}</p>
				</div>
				<div className="text-body-primary">
					<Nav.Link className="fst-italic " as={Link} to={ROUTES.ARTISTS}>{t("Artists")}</Nav.Link>
					<Nav.Link className="fst-italic " as={Link} to={ROUTES.ARTWORKS}>{t("Artworks")}</Nav.Link>	
					<Nav.Link className="fst-italic " as={Link} to={ROUTES.ARTICLES}>{t("Articles")}</Nav.Link>	
				</div>
				<div>
					<p>Albert puertas-Desenvolupament web</p>
					<p><span>&copy;</span>2026 NovArt. All rights reserved.</p>
				</div>
			</div>
		</footer>
    </>
  );
}