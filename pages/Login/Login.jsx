import { useUser } from "../../src/context/UserContext";
import "./Login.css";

export default function Login() {
	const { login } = useUser();

	function handleSubmit(event) {
		event.preventDefault();
		const el = event.target.elements;

		const data = {
			email: el.email.value,
			password: el.password.value,
		};

		login(data);
	}

	return (
		<div className="login-div">
			<form onSubmit={handleSubmit} className="login-form">
				<div className="input-group">
					<label htmlFor="email">Correo Electrónico</label>
					<input type="email" name="email" required />
				</div>
				<div className="input-group">
					<label htmlFor="password">Contraseña</label>
					<input type="password" name="password" required />
				</div>

				<button type="submit" className="btn-form">
					Ingresar
				</button>
			</form>
		</div>
	);
}
