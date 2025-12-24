import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { ROUTES } from "../../../routes";

export default function Layout() {
	const {user, logout}=useContext(AuthContext)

	function linksUsers(){
		return !user? 
		(<>
			<Link to={ROUTES.LOGIN}>Login</Link>
			<Link to={ROUTES.REGISTER}>Registre</Link>
		</>):
		(<>
			
			{user.role === "user" && (
				<>
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
	
  return (
    <div>
		<div>
			<nav>
				<Link to={ROUTES.HOME}>Home</Link>
				<Link to={ROUTES.ARTWORKS}>Art</Link>	
				<Link to={ROUTES.ARTICLES}>Articles</Link>	
				<Link to={ROUTES.FORUM}>Forum</Link>	
				{linksUsers()}
				<select name="language" id="language">
					<option value="ca">CA</option>
					<option value="es">ES</option>
					<option value="en">EN</option>
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