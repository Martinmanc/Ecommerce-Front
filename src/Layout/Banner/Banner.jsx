import "./Banner.css";
import consolasBanner from "../../assets/images/consolas-banner.webp";

export default function Banner() {
	return (
		<div className="banner-container">
			<img className="banner-img" src={consolasBanner} alt="Consolas Banner" />
			<p className="banner-text">
				¡Bienvenidos a nuestra tienda de consolas de videojuegos! Sumérgete en
				el emocionante mundo del entretenimiento digital con nuestra amplia
				selección de consolas de videojuegos PlayStation y Xbox. En nuestra
				tienda, no solo vendemos productos, sino que también ofrecemos una
				puerta de acceso a aventuras inmersivas, desafíos emocionantes y mundos
				que te transportarán más allá de la realidad. Explora nuestra selección
				de las últimas consolas, ediciones especiales y accesorios que harán que
				tu experiencia de juego sea épica. Ya seas un héroe solitario en busca
				de aventuras o compitas con amigos en línea, tenemos todo lo que
				necesitas para jugar en grande.
			</p>
		</div>
	);
}
