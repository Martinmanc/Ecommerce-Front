import "./Cart.css";
import { useOrder } from "../../context/OrderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const URL = import.meta.env.VITE_SERVER_URL;
export const Cart = () => {
	const {
		order,
		cartMenu,
		total,
		totalItems,
		finishOrder,
		clearCart,
		removeItem,
	} = useOrder();

	const handleRemoveItem = (id) => {
		removeItem(id);
	};

	return (
		<div className={`cart-wrapper ${cartMenu ? "active" : ""}`}>
			<div className="list-container">
				<h2>Orden actual:</h2>
				<ul className="order-list">
					{order.map((prod, idx) => {
						return (
							<li className="order-item" key={idx}>
								<img
									className="order-image"
									src={`${URL}/images/products/${prod.image}`}
									alt={prod.productName}
								/>
								<span className="product-name">{prod.productName}</span>

								<div className="order-quantity">
									{prod.quantity}
									<div className="order-delete-item">
										<FontAwesomeIcon
											icon={faTrash}
											onClick={() => handleRemoveItem(prod.productId)}
										/>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<div className="order-finish">
				<div className="total">
					<div className="total-count">Items: {totalItems}</div>
					<div className="total-price">
						Total $ <span>{total}</span>
					</div>
				</div>
				<div className="order-purchase">
					<span className="clear-cart-div">
						<a onClick={() => clearCart()}>Limpiar carrito </a>
						<FontAwesomeIcon
							icon={faTrash}
							onClick={() => clearCart()}
							className="clear-cart"
						/>
					</span>

					<button className="btn-buy" onClick={() => finishOrder()}>
						Comprar
					</button>
				</div>
			</div>
		</div>
	);
};
