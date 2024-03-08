import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStore,
	faTruckFast,
	faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import "./Caracteristicas.css";

export default function Caracteristicas() {
	return (
		<section className="caract">
			<article className="art-caract">
				<div className="div-i">
					<FontAwesomeIcon icon={faCreditCard} className="icon" />
				</div>
				<h3 className="art-titulo1">Elegí Como Pagar</h3>
				<h4 className="art-titulo2">MercadoPago, débito o efectivo</h4>
			</article>
			<article className="art-caract">
				<div className="div-i">
					<FontAwesomeIcon icon={faStore} className="icon" />
				</div>
				<h3 className="art-titulo1">Envío a Todo El Pais</h3>
				<h4 className="art-titulo2">Atraves de OCA</h4>
			</article>
			<article className="art-caract">
				<div className="div-i">
					<FontAwesomeIcon icon={faTruckFast} className="icon" />
				</div>
				<h3 className="art-titulo1">Retiro en Sucursal</h3>
				<h4 className="art-titulo2">
					Retira tu pedido gratis en nuestra Sucursal
				</h4>
			</article>
		</section>
	);
}
