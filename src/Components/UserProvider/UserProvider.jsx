import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext"; // Corregido aquí

const URL = import.meta.env.VITE_SERVER_URL;

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	async function login(data) {
		try {
			const response = await axios.post(`${URL}/login`, data);

			const { token, user } = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("currentUser", JSON.stringify(user));

			setUser(user);

			Swal.fire({
				title: "Login correcto",
				text: "Sera redireccionado en breve",
				icon: "success",
				timer: 1500,
			}).then(() => navigate("/"));
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Error al ingresar",
				text: "Algnuno de los datos no es correcto",
				icon: "error",
			});
		}
	}

	function logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("currentUser");
		setUser(null);
	}

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};
