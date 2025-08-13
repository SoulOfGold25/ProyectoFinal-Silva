import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

const fmt = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
});

function ItemDetail({ id, nombre, descripcion, precio = 0, stock = 0 }) {
    const [agregado, setAgregado] = useState(false);
    const { agregarAlCarrito } = useContext(CartContext);

    const handleAdd = (cantidad) => {
        const qty = Number(cantidad);
        if (!Number.isFinite(qty) || qty < 1) return;
        agregarAlCarrito({ id, nombre, precio }, qty);
        setAgregado(true);
    };

    if (stock === 0) {
        return (
            <div>
                <h2>{nombre}</h2>
                <p>{descripcion ?? ""}</p>
                <p>
                    <strong>Precio:</strong> {fmt.format(precio)}
                </p>
                <p style={{ color: "crimson" }}>Producto sin stock</p>
            </div>
        );
    }

    return (
        <div>
            <h2>{nombre}</h2>
            <p>{descripcion ?? ""}</p>
            <p>
                <strong>Precio:</strong> {fmt.format(precio)}
            </p>
            <p>
                <strong>Stock:</strong> {stock}
            </p>

            {!agregado ? (
                <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
            ) : (
                <div style={{ display: "grid", gap: 8 }}>
                    <p>✔ Producto agregado al carrito</p>
                    <div style={{ display: "flex", gap: 8 }}>
                        <Link to="/cart">
                            <button>Ir al carrito</button>
                        </Link>
                        <Link to="/">
                            <button>Seguir comprando</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemDetail;
