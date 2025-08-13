import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const fmt = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
});

function Cart() {
    const {
        carrito,
        eliminarDelCarrito,
        vaciarCarrito,
        totalUnidades,
        totalPrecio,
    } = useCart();

    if (carrito.length === 0) {
        return (
            <div style={{ padding: "1rem" }}>
                <h2>Tu carrito está vacío 🛒</h2>
                <Link to="/">Volver al catálogo</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Carrito de Compras</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {carrito.map((item) => {
                    const subtotal = item.cantidad * item.precio;
                    return (
                        <li
                            key={item.id}
                            style={{
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                                padding: "10px",
                                borderRadius: "6px",
                                background: "#fff",
                            }}
                        >
                            <strong>{item.nombre}</strong> — {item.cantidad} ×{" "}
                            {fmt.format(item.precio)} ={" "}
                            <strong>{fmt.format(subtotal)}</strong>
                            <br />
                            <button
                                onClick={() => eliminarDelCarrito(item.id)}
                                style={{ marginTop: 8 }}
                            >
                                Eliminar
                            </button>
                        </li>
                    );
                })}
            </ul>

            <hr />
            <p>
                Total de unidades: <strong>{totalUnidades}</strong>
            </p>
            <p>
                Total a pagar: <strong>{fmt.format(totalPrecio)}</strong>
            </p>

            <div style={{ display: "flex", gap: 10 }}>
                <button onClick={vaciarCarrito}>Vaciar carrito</button>
                <Link to="/checkout">
                    <button>Finalizar compra</button>
                </Link>
            </div>
        </div>
    );
}

export default Cart;
