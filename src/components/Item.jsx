import { Link } from "react-router-dom";

export default function Item({ id, nombre, precio, imagen }) {
    return (
        <li
            style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 12,
                display: "grid",
                gap: 8,
                background: "#fff",
            }}
        >
            {imagen && (
                <img
                    src={imagen}
                    alt={nombre}
                    style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderRadius: 8,
                    }}
                />
            )}
            <h3 style={{ margin: 0, fontSize: 18 }}>{nombre}</h3>
            <p style={{ margin: 0 }}>${precio}</p>
            <Link to={`/item/${id}`} style={{ marginTop: 8 }}>
                Ver detalle
            </Link>
        </li>
    );
}
