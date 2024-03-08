import defaultPicture from "../../assets/images/default-profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ProductTable.css";

const URL = import.meta.env.VITE_SERVER_URL;

export const ProductTable = ({
	products,
	deleteProduct,
	setFormValue,
	categoryMap,
}) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Imagen</th>
						<th>Nombre Completo</th>
						<th>Precio</th>
						<th>Descripcion</th>
						<th>Activo</th>
						<th>Categoria</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{products.map((pro) => (
						<tr key={pro._id}>
							<td className="table-img">
								<img
									src={
										pro.image
											? `${URL}/images/products/${pro.image}`
											: defaultPicture
									}
									alt={`${pro.image}`}
								/>
							</td>
							<td className="table-name">{pro.name}</td>
							<td className="table-price">{pro.price}</td>
							<td id="table-description">{pro.description}</td>
							<td className="table-active">{pro.active ? "true" : "false"}</td>
							<td className="table-category">{categoryMap[pro.category]}</td>
							<td className="table-action">
								<button
									className="btn btn-trash"
									onClick={() => deleteProduct(pro._id)}
								>
									<FontAwesomeIcon icon={faTrash} />
								</button>
								<button
									className="btn btn-edit"
									onClick={() => setFormValue(pro)}
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
