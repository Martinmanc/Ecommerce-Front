import { useForm } from "react-hook-form";
import "./AdminProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductTable } from "../../src/Components/ProductTable/ProductTable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_SERVER_URL;
const TOKEN = localStorage.getItem("token");

export default function AdminProduct() {
	const { register, handleSubmit, setValue } = useForm();
	const [categories, setCategories] = useState([]);
	const [dbProducts, setDbProducts] = useState([]);
	const navigate = useNavigate();
	const [categoryMap, setCategoryMap] = useState({});
	const [productId, setProductId] = useState();

	// Obtener los productos LISTO
	async function getProducts() {
		try {
			const response = await axios.get(`${URL}/products`);
			const products = response.data.products;
			setDbProducts(products);
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se pudo obtener los productos",
			});
		}
	}

	// Borrar un producto LISTO
	async function deleteProduct(id) {
		Swal.fire({
			icon: "warning",
			title: "Confirma borrar este producto",
			text: `¿Realmente deseas borrar el producto ${id}?`,
			showCancelButton: true,
			confirmButtonText: "Borrar",
			denyButtonText: "Cancelar",
		}).then(async function (resultado) {
			if (resultado.isConfirmed) {
				try {
					console.log(`Producto a borrar ${id}`);

					await axios.delete(`${URL}/products/${id}`, {
						headers: {
							authorization: TOKEN,
						},
					});

					Swal.fire({
						icon: "success",
						title: "Producto borrado",
						text: `El producto ${id} fue borrado correctamente`,
						timer: 1500,
					});

					getProducts();
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

	// Crear Producto y Editar(terminar)
	async function sumbitedData(data) {
		console.log(data);
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("price", data.price);
		formData.append("description", data.description);
		formData.append("image", data.image[0]);
		formData.append("active", data.active || false);
		formData.append("category", data.category);
		try {
			if (productId) {
				if (!TOKEN) return;

				const response = await axios.put(
					`${URL}/products/${productId}`,
					formData,
					{
						headers: {
							authorization: TOKEN,
						},
					},
				);
				Swal.fire({
					icon: "success",
					title: "Producto editado correctamente",
					text: `El producto ${response.data.product?.name} fue editado correctamente`,
				});
				getCategories();
				setProductId(null);

				return;
			}

			const response = await axios.post(`${URL}/products`, formData);
			Swal.fire({
				icon: "success",
				title: "Producto creado correctamente",
				text: `El producto ${response.data.product?.name} fue creado correctamente`,
			});
			getCategories();
			getProducts();
			setFormValue();
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "No se pudo crear el producto",
				text: "Alguno de los datos no es correcto",
			});
			if (error.response && error.response.status === 401) logout();
		}
	}

	function setFormValue(product) {
		setValue("name", product?.name || "");
		setValue("price", product?.price || "");
		setProductId(product?._id || "");
		setValue("description", product?.description || "");
		setValue("image", product?.image[0] || "");
		setValue("active", product?.active || "");
		setValue("category", product?.category || "");
	}

	function logout() {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token");
		navigate("/");
	}

	async function getCategories() {
		try {
			const response = await axios.get(`${URL}/categories`);
			const categoriesDB = response.data.categories;

			const categoryMap = {};
			categoriesDB.forEach((category) => {
				categoryMap[category._id] = category.name;
			});

			setCategories(categoriesDB);
			setCategoryMap(categoryMap);
		} catch (error) {
			console.log("No se pudieron obtener las categorias");
		}
	}

	async function handleSearch(e) {
		try {
			const search = e.target.value;

			if (!search) getProducts();

			if (search.length <= 2) {
				return;
			}

			const response = await axios.get(`${URL}/products/search/${search}`);

			const products = response.data.products;

			setDbProducts(products);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getCategories();
		getProducts();
	}, []);

	return (
		<>
			<div className="admin">
				<div className="principal">
					<h2 className="h2-tittle">
						Formulario
						{productId && (
							<button onClick={() => setFormValue(undefined)}>
								<FontAwesomeIcon className="icon-x" icon={faXmark} />
							</button>
						)}
					</h2>
					<form className="admin-form" onSubmit={handleSubmit(sumbitedData)}>
						<div className="input-group">
							<label htmlFor="product" className="admin-label">
								Producto
							</label>
							<input
								type="text"
								id="product"
								className="admin-input"
								{...register("name")}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="product" className="admin-label">
								Precio
							</label>
							<input
								type="number"
								className="admin-input"
								{...register("price")}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="product" className="admin-label">
								Descripcion
							</label>
							<textarea
								className="admin-input"
								{...register("description")}
							></textarea>
						</div>
						<div className="input-group">
							<label htmlFor="product" className="admin-label">
								Imagen
							</label>
							<input
								type="file"
								accept="image/*"
								className="image-input"
								{...register("image")}
							/>
						</div>
						<div className="input-group" id="checkbox">
							<label htmlFor="product" className="admin-label">
								Activo
							</label>
							<input
								type="checkbox"
								className="admin-input"
								{...register("active")}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="pproduct" className="admin-label">
								Categoria
							</label>
							<select className="admin-input" {...register("category")}>
								{categories.map((category) => (
									<option key={category._id} value={category._id}>
										{" "}
										{category.name}
									</option>
								))}
							</select>
						</div>
						<div className="input-group">
							<button type="submit" id="button-form-product">
								{productId ? "Editar Producto" : "Añadir Producto"}
							</button>
						</div>
					</form>
				</div>
				<div className="secundario">
					<h2>Tabla de productos</h2>
					<div className="input-group">
						<label htmlFor="search">Buscar Producto</label>
						<input type="text" id="search" onKeyUp={(e) => handleSearch(e)} />
					</div>
					<ProductTable
						products={dbProducts}
						deleteProduct={deleteProduct}
						setFormValue={setFormValue}
						categoryMap={categoryMap}
					/>
				</div>
			</div>
		</>
	);
}
