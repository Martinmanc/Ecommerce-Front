import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserTable } from "@/Components/UsersCard/UserTable";
import "./AdminUser.css";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_SERVER_URL;
const TOKEN = localStorage.getItem("token");

export default function AdminUser() {
	const [dbUsers, setDbUsers] = useState([]);
	const [userId, setUserId] = useState();
	const [totalButtons, setTotalButtons] = useState([]);
	const [limit] = useState(5);
	const navigate = useNavigate();

	async function getUsers(page = 0) {
		try {
			const response = await axios.get(`${URL}/users?page=${page}`);
			const users = response.data.users;
			const total = response.data.total;

			const buttonsQuantity = Math.ceil(total / limit);

			const arrayButtons = [];
			for (let i = 0; i < buttonsQuantity; i++) {
				arrayButtons.push(i);
			}

			setTotalButtons(arrayButtons);
			setDbUsers(users);
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se pudo obtener los usuarios",
			});
		}
	}

	async function deleteUser(id) {
		Swal.fire({
			icon: "warning",
			title: "Confirma borrar este usuario",
			text: `¿Realmente deseas borrar el usuario ${id}?`,
			showCancelButton: true,
			confirmButtonText: "Borrar",
			denyButtonText: "Cancelar",
		}).then(async function (resultado) {
			if (resultado.isConfirmed) {
				try {
					if (!TOKEN) return;

					console.log(`Usuario a borrar ${id}`);

					// Borrar el usuario de la base de datos
					await axios.delete(`${URL}/users/${id}`, {
						headers: {
							authorization: TOKEN,
						},
					});

					Swal.fire({
						icon: "success",
						title: "Usuario borrado",
						text: `El usuario ${id} fue borrado correctamente`,
						timer: 1500,
					});

					// Actualizar el estado de mi dbUsers para que vuelva a pintar sin el usuario borrado
					getUsers();
					//	Debo actualizar el estado de mis usuarios quitando el usuario que se BORRÓ
				} catch (error) {
					console.log(error);
					Swal.fire({
						icon: "error",
						title: "No se pudo borrar el usuario",
					});
					if (error.response.status === 401) return logout();
				}
			}
		});
	}

	function logout() {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token");
		navigate("/");
	}

	useEffect(() => {
		getUsers();
	}, []);

	const { register, handleSubmit, setValue } = useForm();

	async function sumbitedData(data) {
		const formData = new FormData();

		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("age", data.age);
		formData.append("location", data.location);
		if (data.image[0]) {
			formData.append("image", data.image[0]);
		}
		if (data.password) {
			formData.append("password", data.password);
		}

		try {
			if (userId) {
				if (!TOKEN) return;

				const response = await axios.put(`${URL}/users/${userId}`, formData, {
					headers: {
						authorization: TOKEN,
					},
				});
				Swal.fire({
					icon: "success",
					title: "Usuario editado correctamente",
					text: `El usuario ${response.data.user?.name} fue editado correctamente`,
				});
				getUsers();
				setUserId(null);

				return;
			}

			const response = await axios.post(`${URL}/users`, formData);
			Swal.fire({
				icon: "success",
				title: "Usuario creado correctamente",
				text: `El usuario ${response.data.user?.name} fue crado correctamente`,
			});
			getUsers();
			setFormValue();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se creo el usuario",
				text: "Alguno de los datos no es correcto",
			});
			if (error.response.status === 401) return logout();
		}
	}

	function setFormValue(user) {
		setValue("name", user?.name || "");
		setValue("email", user?.email || "");
		setUserId(user?._id || "");
		setValue("age", user?.age || "");
		setValue("image", user?.image || "");
		setValue("location", user?.location || "");
		setValue("password", user?.password || "");
	}

	async function handleSearch(e) {
		try {
			const search = e.target.value;

			if (!search) getUsers();

			if (search.length <= 2) {
				return;
			}

			const response = await axios.get(`${URL}/users/search/${search}`);

			const users = response.data.users;

			setDbUsers(users);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="admin">
			<div className="principal">
				<h2 className="h2-tittle">
					Formulario
					{userId && (
						<button onClick={() => setFormValue(undefined)}>
							<FontAwesomeIcon className="icon-x" icon={faXmark} />
						</button>
					)}
				</h2>
				<form className="admin-form" onSubmit={handleSubmit(sumbitedData)}>
					<div className="input-group">
						<label htmlFor="name" className="admin-label">
							Nombre Completo
						</label>
						<input
							type="text"
							id="product"
							className="admin-input"
							{...register("name")}
						/>
					</div>
					<div className="input-group">
						<label htmlFor="mail" className="admin-label">
							Correo electronico
						</label>
						<input type="text" className="admin-input" {...register("email")} />
					</div>
					<div className="input-group">
						<label htmlFor="password1" className="admin-label">
							Contraseña
						</label>
						<input
							type="password"
							className="admin-input"
							disabled={userId}
							{...register("password")}
						/>
					</div>
					<div className="input-group">
						<label htmlFor="age" className="admin-label">
							Edad
						</label>
						<input type="number" className="admin-input" {...register("age")} />
					</div>
					<div className="input-group">
						<label htmlFor="location" className="admin-label">
							Provincia
						</label>
						<select
							className="admin-input"
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
					<div className="input-group" id="input-group">
						<label htmlFor="user" className="admin-label">
							Imagen
						</label>
						<input
							type="file"
							accept="image/*"
							className="image-input"
							{...register("image")}
						/>
					</div>

					<button type="submit" id="button-form-user">
						{userId ? "Editar Usuario" : "Añadir usuario"}
					</button>
				</form>
			</div>
			<div className="secundario">
				<h2>Tabla de Usuarios</h2>
				<div className="input-group">
					<label htmlFor="search">Buscar usuario</label>
					<input type="text" id="search" onKeyUp={(e) => handleSearch(e)} />
				</div>
				<UserTable
					users={dbUsers}
					deleteUser={deleteUser}
					setFormValue={setFormValue}
				/>
				<div className="botones-pag">
					{totalButtons.map((btnNumber) => {
						return (
							<button
								className="button-page"
								key={btnNumber}
								onClick={() => getUsers(btnNumber)}
							>
								{btnNumber + 1}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
