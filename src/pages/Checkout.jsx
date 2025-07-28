import { useState } from "react";
import { useCart } from "../context/CartContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

function Checkout() {
    const { carrito, totalPrecio, vaciarCarrito } = useCart();

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [orderId, setOrderId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orden = {
            comprador: { nombre, telefono, email },
            items: carrito,
            total: totalPrecio(),
            fecha: new Date(),
        };

        try {
            const docRef = await addDoc(collection(db, "ordenes"), orden);
            setOrderId(docRef.id);
            vaciarCarrito();
        } catch (error) {
            console.error("Error al guardar orden:", error);
        }
    };

    if (orderId) {
        return (
            <div>
                <h2>¡Gracias por tu compra! 🎉</h2>
                <p>
                    Tu número de orden es: <strong>{orderId}</strong>
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2>Finalizar compra</h2>
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
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Confirmar compra</button>
            </form>
        </div>
    );
}

export default Checkout;
