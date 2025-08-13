// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

const fmt = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
});

export default function Checkout() {
    const { carrito, totalPrecio, vaciarCarrito } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({ nombre: "", telefono: "", email: "" });
    const [orderId, setOrderId] = useState(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);

    // Si el carrito está vacío, vuelve al catálogo
    if (carrito.length === 0 && !orderId) {
        return (
            <div style={{ padding: "1rem" }}>
                <h2>No tienes productos en el carrito</h2>
                <button onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setError(null);

        try {
            // armamos la orden:
            const orden = {
                comprador: form,
                items: carrito.map((p) => ({
                    id: p.id,
                    nombre: p.nombre,
                    precio: p.precio,
                    cantidad: p.cantidad,
                })),
                total: totalPrecio,
                fecha: serverTimestamp(),
            };

            const ref = collection(db, "ordenes");
            const doc = await addDoc(ref, orden);
            setOrderId(doc.id);
            vaciarCarrito();
        } catch (err) {
            console.error(err);
            setError(
                "Ocurrió un error al procesar tu orden. Intenta nuevamente."
            );
        } finally {
            setSending(false);
        }
    };

    // Orden creada: pantalla de confirmación
    if (orderId) {
        return (
            <div style={{ padding: "1rem" }}>
                <h2>✅ ¡Gracias por tu compra!</h2>
                <p>
                    Tu número de orden es: <strong>{orderId}</strong>
                </p>
                <Link to="/">Volver al inicio</Link>
            </div>
        );
    }

    // Formulario de checkout
    return (
        <div style={{ padding: "1rem", maxWidth: 480 }}>
            <h2>🧾 Finalizar compra</h2>
            <p>
                Total a pagar: <strong>{fmt.format(totalPrecio)}</strong>
            </p>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Tu teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Tu email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={sending}>
                    {sending ? "Procesando..." : "Confirmar compra"}
                </button>

                {error && <p style={{ color: "crimson" }}>{error}</p>}
            </form>
        </div>
    );
}
