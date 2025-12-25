import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ROUTES } from "../../routes";
import { useTranslation } from "react-i18next";

export default function Layout() {
	const {user, logout}=useContext(AuthContext)
	const { t, i18n } = useTranslation();

	function linksUsers(){
		return !user? 
		(<>
			<Link to={ROUTES.LOGIN}>Login</Link>
			<Link to={ROUTES.REGISTER}>Register</Link>
		</>):
		(<>
			
			{user.role === "user" && (
				<>
					<Link to={ROUTES.AUCTIONS}>{t("Auction")}</Link>
					<Link to={ROUTES.PROFILE}>{user.username}</Link>
				</>
			)}

			{user.role === "artist" && (
				<>
					<Link to={ROUTES.ARTIST_DASHBOARD}>{user.username}</Link>
				</>
			)}

			{user.role === "admin" && (
				<Link to={ROUTES.ADMIN_DASHBOARD}>{user.username}</Link>
			)}

			<button onClick={logout}>Logout</button>
		</>)
	}
	
	const handleIdiom= (e)=>{
		i18n.changeLanguage(e.target.value)
	}
  return (
    <div>
		<div>
			<nav>
				<Link to={ROUTES.HOME}>{t("Home")}</Link>
				<Link to={ROUTES.ARTWORKS}>{t("Art")}</Link>	
				<Link to={ROUTES.ARTICLES}>{t("Articles")}</Link>	
				<Link to={ROUTES.FORUM}>{t("Forum")}</Link>	
				{linksUsers()}
				<select name="language" id="language" value={i18n.language} onChange={handleIdiom}>
					<option value="en">EN</option>
					<option value="ca">CA</option>
					<option value="es">ES</option>
				</select>	
			</nav>
		</div>
		<div>
			<Outlet /> {/* Aquí es mostraran els continguts*/ }
		</div>
		<footer>
			<p>Footer</p>
		</footer>
    </div>
  );
}