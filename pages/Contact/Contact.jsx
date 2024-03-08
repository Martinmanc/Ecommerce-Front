import "./Contact.css";

export default function Contact() {
	return (
		<>
			<section className="main-section">
				<div className="div-contacto">
					<h1 className="titulo-contacto">Formulario de Contacto</h1>
					<form className="form-contacto">
						<div className="div-input">
							<label htmlFor="nombrecompleto" className="label-contact">
								Nombre Completo
							</label>
							<input
								type="text"
								name="nombre"
								id="nombrecompleto"
								placeholder="Nombre Completo"
								required
								className="input-contact"
							/>
						</div>
						<div className="div-input">
							<label htmlFor="email" className="label-contact">
								Correo Electrónico
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="@gmail.com"
								required
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
								className="input-contact"
							/>
						</div>
						<div className="div-input">
							<label htmlFor="message" className="label-contact">
								Consulta
							</label>
							<textarea
								className="textarea-contact"
								name="message"
								id="message"
								rows="4"
								required
								minLength="10"
								maxLength="400"
							></textarea>
						</div>
						<div className="div-input">
							<button className="boton" type="submit">
								Enviar
							</button>
						</div>
					</form>
				</div>
				<div className="div-mapa">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.0060198131296!2d-60.23406232353963!3d-33.31865809077635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b767e7d1e21cc9%3A0x197b8e09338df474!2sAvellaneda%20143%2C%20San%20Nicol%C3%A1s%20de%20Los%20Arroyos%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1694013201283!5m2!1ses-419!2sar"
						width="100%"
						height="100%"
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className="mapa"
					></iframe>
				</div>
			</section>
		</>
	);
}
