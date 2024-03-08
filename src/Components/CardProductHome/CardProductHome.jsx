import React from "react";
import "./CardProductHome.css";
import { useOrder } from "../../context/OrderContext";
const URL = import.meta.env.VITE_SERVER_URL;

const ProductCard = ({ product }) => {
	const { addItem } = useOrder();

	return (
		<div className="product-card">
			<h3 className="poduct-name">{product.name}</h3>
			<img
				className="img-product"
				src={`${URL}/images/products/${product.image}`}
				alt="Imagen de producto"
			/>
			<p className="poduct-des">{product.description}</p>
			<p className="poduct-price">Precio: ${product.price}</p>
			<div className="buttons">
				<button className="buttons" id="button-mas">
					Ver Mas
				</button>
				<button
					className="buttons"
					id="button-compra"
					onClick={() => addItem(product)}
				>
					Comprar
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
