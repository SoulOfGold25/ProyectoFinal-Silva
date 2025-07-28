import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useCart } from "../context/CartContext";

function ItemListContainer({ saludo }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoriaId } = useParams(); // ✅
    const { agregarAlCarrito } = useCart();

    const handleAgregar = (item) => {
        agregarAlCarrito(item, 1);
    };

    useEffect(() => {
        setLoading(true);

        const productosRef = collection(db, "productos");

        const consulta = categoriaId
            ? query(productosRef, where("categoria", "==", categoriaId))
            : productosRef;

        getDocs(consulta)
            .then((res) => {
                const docs = res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                console.log("🔥 Productos:", docs);
                setProductos(docs);
            })
            .catch((error) => {
                console.error("❌ Error:", error);
                setProductos([]);
            })
            .finally(() => setLoading(false));
    }, [categoriaId]);

    return (
        <div style={{ padding: "1rem" }}>
            <h2>{saludo}</h2>
            {loading ? (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <div className="spinner" />
                    <p>Cargando productos...</p>
                </div>
            ) : productos.length === 0 ? (
                <div>
                    <h2>Tu carrito está vacío 🛒</h2>
                    <Link to="/">Volver al catálogo</Link>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {productos.map((prod) => (
                        <div
                            key={prod.id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "16px",
                                textAlign: "center",
                                background: "#fafafa",
                            }}
                        >
                            <h3>{prod.nombre}</h3>
                            <p>${prod.precio}</p>
                            <p>
                                <small>Stock: {prod.stock}</small>
                            </p>

                            {prod.stock === 0 ? (
                                <p style={{ color: "red" }}>
                                    ⚠ Producto sin stock
                                </p>
                            ) : (
                                <button onClick={() => handleAgregar(prod)}>
                                    Agregar al carrito
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ItemListContainer;
