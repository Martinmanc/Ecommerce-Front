import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	const isAdmin = currentUser && currentUser.role === "ADMIN_ROLE";

	return isAdmin ? children : <Navigate to="/" replace />;
}
