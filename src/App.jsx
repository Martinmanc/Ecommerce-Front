import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import Register from "../pages/Register/Register";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import AdminProduct from "../pages/AdminProduct/AdminProduct";
import AdminUser from "../pages/AdminUser/AdminUser";
import AdminRoute from "./guard/AdminRoute/AdminRoute";
import Login from "../pages/Login/Login";
import { Cart } from "./Layout/Cart/Cart";

function App() {
	return (
		<>
			<Header />
			<Cart />
			<main className="main">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />

					<Route
						path="/admin-product"
						element={
							<AdminRoute>
								{" "}
								<AdminProduct />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin-user"
						element={
							<AdminRoute>
								{" "}
								<AdminUser />{" "}
							</AdminRoute>
						}
					/>
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
