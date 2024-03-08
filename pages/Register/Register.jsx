import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import "./Register.css";

const URL = import.meta.env.VITE_SERVER_URL;

export default function Register() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	async function sumbitedData(data) {
		const formData = new FormData();

		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("age", data.age);
		formData.append("location", data.location);
		if (data.image.length > 0) {
			formData.append("image", data.image[0]);
		}

		if (data.password) {
			formData.append("password", data.password);
		}

		try {
			const response = await axios.post(`${URL}/users`, formData);
			Swal.fire({
				icon: "success",
				title: "Usuario creado correctamente",
				text: `El usuario ${response.data.user.name} fue creado correctamente`,
			});

			navigate("/login");
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se pudo crear el usuario",
				text: "Alguno de los datos no es correcto",
			});
		}
	}

	return (
		<main className="main-register">
			<form className="admin-form" onSubmit={handleSubmit(sumbitedData)}>
				<div className="input-group">
					<label htmlFor="name" className="user-label">
						Nombre Completo
					</label>
					<input
						type="text"
						id="product"
						className="user-input"
						{...register("name")}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="mail" className="user-label">
						Correo electronico
					</label>
					<input type="text" className="user-input" {...register("email")} />
				</div>
				<div className="input-group">
					<label htmlFor="password" className="user-label">
						Contraseña
					</label>
					<input
						type="password"
						className="user-input"
						{...register("password")}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="age" className="user-label">
						Edad
					</label>
					<input type="number" className="user-input" {...register("age")} />
				</div>
				<div className="input-group">
					<label htmlFor="location" className="user-label">
						Provincia
					</label>
					<select
						className="user-input"
						name="location"
						{...register("location")}
					>
						<option value="Buenos Aires">Buenos Aires</option>
						<option value="Catamarca">Catamarca</option>
						<option value="Chaco">Chaco</option>
						<option value="Chubut">Chubut</option>
						<option value="Córdoba">Córdoba</option>
						<option value="Corrientes">Corrientes</option>
						<option value="Entre Ríos">Entre Ríos</option>
						<option value="Formosa">Formosa</option>
						<option value="Jujuy">Jujuy</option>
						<option value="La Pampa">La Pampa</option>
						<option value="La Rioja">La Rioja</option>
						<option value="Mendoza">Mendoza</option>
						<option value="Misiones">Misiones</option>
						<option value="Neuquén">Neuquén</option>
						<option value="Río Negro">Río Negro</option>
						<option value="Salta">Salta</option>
						<option value="San Juan">San Juan</option>
						<option value="San Luis">San Luis</option>
						<option value="Santa Cruz">Santa Cruz</option>
						<option value="Santa Fe">Santa Fe</option>
						<option value="Santiago del Estero">Santiago del Estero</option>
						<option value="Tierra del Fuego">Tierra del Fuego</option>
						<option value="Tucumán">Tucumán</option>
					</select>
				</div>
				<div className="input-group">
					<label htmlFor="user" className="user-label">
						Imagen
					</label>
					<input
						type="file"
						accept="image/*"
						id="image-input"
						{...register("image")}
					/>
				</div>
				<div className="parte-boton">
					<button type="submit" id="boton-registro">
						Registrarse
					</button>
					<NavLink className="parte-login" to="/login">
						¿Ya tienes cuenta?
					</NavLink>
				</div>
			</form>
		</main>
	);
}
