import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

function Checkout() {
    const { carrito, totalPrecio, vaciarCarrito } = useContext(CartContext);

    const [orderId, setOrderId] = useState(null);
    const [form, setForm] = useState({
        nombre: "",
        telefono: "",
        email: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const orden = {
            comprador: form,
            items: carrito,
            total: totalPrecio(),
            fecha: serverTimestamp(),
        };

        const ordenesRef = collection(db, "ordenes");

        addDoc(ordenesRef, orden).then((doc) => {
            setOrderId(doc.id);
            vaciarCarrito();
        });
    };

    if (orderId) {
        return (
            <div style={{ padding: "1rem" }}>
                <h2>✅ ¡Gracias por tu compra!</h2>
                <p>
                    Tu número de orden es: <strong>{orderId}</strong>
                </p>
            </div>
        );
    }

    return (
        <div style={{ padding: "1rem" }}>
            <h2>🧾 Finalizar compra</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "400px",
                }}
            >
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
                <button type="submit">Confirmar compra</button>
            </form>
        </div>
    );
}

export default Checkout;
