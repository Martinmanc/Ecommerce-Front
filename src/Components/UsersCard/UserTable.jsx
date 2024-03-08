import defaultPicture from "../../assets/images/default-profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./UserTable.css";

const URL = import.meta.env.VITE_SERVER_URL;

export const UserTable = ({ users, deleteUser, setFormValue }) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Imagen</th>
						<th>Nombre Completo</th>
						<th>Email</th>
						<th>Localidad</th>
						<th>Rol</th>
						<th>Edad</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{users.map((usr) => (
						<tr key={usr._id}>
							<td className="table-img">
								<img
									src={
										usr.image
											? `${URL}/images/users/${usr.image}`
											: defaultPicture
									}
									alt={`${usr.image}`}
								/>
							</td>
							<td className="table-name">{usr.name}</td>
							<td className="table-email">{usr.email}</td>
							<td className="table-location">
								{usr.location ? usr.location : "NO DATA"}
							</td>
							<td className="table-role">{usr.role}</td>
							<td className="table-role">{usr.age}</td>
							<td className="table-action">
								<button
									className="btn btn-trash"
									onClick={() => deleteUser(usr._id)}
								>
									<FontAwesomeIcon icon={faTrash} />
								</button>
								<button
									className="btn btn-edit"
									onClick={() => setFormValue(usr)}
								>
									<FontAwesomeIcon icon={faPencilAlt} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
