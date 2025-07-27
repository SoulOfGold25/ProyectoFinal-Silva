import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
    const { carrito, eliminarDelCarrito, vaciarCarrito, totalPrecio } =
        useContext(CartContext);

    if (carrito.length === 0) {
        return (
            <div style={{ padding: "1rem" }}>
                <h2>🛒 Tu carrito está vacío</h2>
                <Link to="/">Volver al inicio</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: "1rem" }}>
            <h2>🛒 Carrito de compras</h2>
            <ul>
                {carrito.map((prod) => (
                    <li key={prod.id} style={{ marginBottom: "10px" }}>
                        <strong>{prod.nombre}</strong> — {prod.cantidad}{" "}
                        unidad(es) — ${prod.precio * prod.cantidad}
                        <button
                            onClick={() => eliminarDelCarrito(prod.id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            <h3>Total: ${totalPrecio()}</h3>

            <button onClick={vaciarCarrito}>Vaciar carrito</button>
            <br />
            <Link to="/checkout">
                <button style={{ marginTop: "10px" }}>Finalizar compra</button>
            </Link>
        </div>
    );
}

export default Cart;
