import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

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
            <div>
                <h2>Tu carrito está vacío 🛒</h2>
                <Link to="/">Volver al catálogo</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Carrito de Compras</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {carrito.map((item) => (
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
                        <strong>{item.nombre}</strong> — {item.cantidad} x $
                        {item.precio} = ${item.cantidad * item.precio}
                        <br />
                        <button onClick={() => eliminarDelCarrito(item.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <hr />
            <p>Total de unidades: {totalUnidades()}</p>
            <p>Total a pagar: ${totalPrecio()}</p>
            <button onClick={vaciarCarrito}>Vaciar carrito</button>
            <Link to="/checkout">
                <button>Finalizar compra</button>
            </Link>
        </div>
    );
}

export default Cart;
