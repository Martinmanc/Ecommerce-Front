import { useState, useEffect } from "react";
import Banner from "../../src/Layout/Banner/Banner.jsx";
import Caracteristicas from "../../src/Layout/Caracteristicas/Caracteristicas.jsx";
import ProductCard from "../../src/Components/CardProductHome/CardProductHome.jsx";
import "./Home.css";

const URL = import.meta.env.VITE_SERVER_URL;

export default function Home() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(`${URL}/categories`);
				if (response.ok) {
					const data = await response.json();
					setCategories(data.categories);
				} else {
					throw new Error("Error fetching categories");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		const fetchProducts = async () => {
			try {
				const response = await fetch(`${URL}/products`);
				if (response.ok) {
					const data = await response.json();
					setProducts(data.products);
				} else {
					throw new Error("Error fetching products");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchCategories();
		fetchProducts();
	}, []);

	return (
		<>
			<div className="banner-div">
				<Banner />
			</div>
			<div className="products">
				{categories.map((category) => (
					<div key={category._id}>
						<h2 className="titulo-category">{category.name}</h2>
						<div className="div-categoy">
							{products
								.filter(
									(product) =>
										product.category === category._id && product.active,
								)
								.map((product) => (
									<ProductCard key={product._id} product={product} />
								))}
						</div>
					</div>
				))}
			</div>
			<Caracteristicas />
		</>
	);
}
