import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const URL = import.meta.env.VITE_SERVER_URL;

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
	const localUser = localStorage.getItem("currentUser");
	const user = JSON.parse(localUser);

	const [order, setOrder] = useState(
		() => JSON.parse(localStorage.getItem("order")) || [],
	);

	const [cartMenu, setCartMenu] = useState(false);
	const [total, setTotal] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		calculateTotalItems();
		calculateTotal();
	}, [order]);

	function addItem(item) {
		const itemIndex = order.findIndex((prod) => prod.productId === item._id);
		let newOrder;
		if (itemIndex >= 0) {
			newOrder = order.map((producto) => {
				if (producto.productId === item._id) {
					return { ...producto, quantity: producto.quantity + 1 };
				}

				return producto;
			});
		} else {
			const product = {
				productId: item._id,
				quantity: 1,
				price: item.price,
				productName: item.name,
				image: item.image,
			};
			newOrder = [...order, product];
		}

		localStorage.setItem("order", JSON.stringify(newOrder));
		setOrder(newOrder);
	}

	function calculateTotalItems() {
		let totalItems = 0;
		order.forEach((prod) => {
			totalItems += prod.quantity;
		});

		setTotalItems(totalItems);
	}

	function calculateTotal() {
		let total = 0;

		order.forEach((prod) => {
			total += prod.price * prod.quantity;
		});

		setTotal(total);
	}

	async function finishOrder() {
		try {
			console.log("Valor de user:", user);
			if (!user)
				return Swal.fire(
					"Debe loguearse",
					"Para finalizar la orden debe estar logueado",
					"error",
				);

			const newOrder = {
				user: user._id,
				total,
				products: order,
			};

			console.log("Nueva orden:", newOrder);

			await axios.post(`${URL}/orders`, newOrder);

			Swal.fire({
				icon: "success",
				title: "Compra realizada!",
				text: "Gracias por su compra!",
			});

			clearCart();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Algo salió mal!",
			});
		}
	}

	function removeItem(id) {
		const updatedOrder = order.filter((prod) => prod.productId !== id);
		localStorage.setItem("order", JSON.stringify(updatedOrder));
		setOrder(updatedOrder);
	}

	function clearCart() {
		setOrder([]);
	}

	function toggleMenu() {
		setCartMenu(!cartMenu);
	}

	return (
		<OrderContext.Provider
			value={{
				order,
				cartMenu,
				total,
				totalItems,
				addItem,
				removeItem,
				clearCart,
				toggleMenu,
				finishOrder,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
