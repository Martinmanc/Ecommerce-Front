import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faGamepad,
	faCartShopping,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useOrder } from "@/context/OrderContext";
import { useRef, useEffect, useState } from "react";

export default function Header() {
	const { toggleMenu, totalItems } = useOrder();
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	const isAdmin = currentUser && currentUser.role === "ADMIN_ROLE";

	const sidebarRef = useRef(null);
	const [sidebarVisible, setSidebarVisible] = useState(false);

	useEffect(() => {
		sidebarRef.current = document.querySelector(".sidebar");
	}, []);

	function toggleSidebar() {
		if (sidebarRef.current) {
			// Cambiar el estado de la visibilidad del menú
			setSidebarVisible(!sidebarVisible);
			// Actualizar el estilo del menú según el estado
			sidebarRef.current.style.display = sidebarVisible ? "none" : "flex";
		}
	}

	function closeSidebar() {
		sidebarRef.current.style.display = "none";
	}

	return (
		<header className="header">
			<div className="header-1">
				<div className="boton-burger">
					<input className="input-check" type="checkbox" id="check-menu" />
					<label className="burger-menu" htmlFor="check-menu">
						<FontAwesomeIcon
							icon={faBars}
							size="2x"
							id="burger"
							onClick={toggleSidebar}
						/>
					</label>
				</div>
				<FontAwesomeIcon id="icono-joy" icon={faGamepad} size="2x" />
			</div>

			<div className="header-2">
				<NavLink to="/" className="nav-link">
					Principal
				</NavLink>
				<NavLink to="/contact" className="nav-link">
					Contacto
				</NavLink>
				<NavLink to="/about-us" className="nav-link">
					Acerca de
				</NavLink>
				<NavLink to="/register" className="nav-link">
					Registro
				</NavLink>

				{isAdmin && (
					<>
						<NavLink to="/admin-product" className="nav-link">
							Admin Products
						</NavLink>
						<NavLink to="/admin-user" className="nav-link">
							Admins Users
						</NavLink>
					</>
				)}
			</div>
			<div className="sidebar">
				<NavLink to="/" className="nav-link" onClick={closeSidebar}>
					Principal
				</NavLink>
				<NavLink to="/contact" className="nav-link" onClick={closeSidebar}>
					Contacto
				</NavLink>
				<NavLink to="/about-us" className="nav-link" onClick={closeSidebar}>
					Acerca de
				</NavLink>
				<NavLink to="/register" className="nav-link" onClick={closeSidebar}>
					Registro
				</NavLink>

				{isAdmin && (
					<>
						<NavLink
							to="/admin-product"
							className="nav-link"
							onClick={closeSidebar}
						>
							Admin Products
						</NavLink>
						<NavLink
							to="/admin-user"
							className="nav-link"
							onClick={closeSidebar}
						>
							Admins Users
						</NavLink>
					</>
				)}
			</div>

			<div className="header-3">
				<FontAwesomeIcon
					id="icono-user"
					icon={faUser}
					style={{ color: "#000000" }}
					size="2x"
				/>

				{currentUser && (
					<>
						<FontAwesomeIcon
							onClick={() => toggleMenu()}
							id="icono-carro"
							icon={faCartShopping}
							style={{ color: "#000000" }}
							size="2x"
							data-count={totalItems}
						/>
					</>
				)}
			</div>
		</header>
	);
}
