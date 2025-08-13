import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemList from "../components/ItemList";

function ItemListContainer({ saludo }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoriaId } = useParams();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                const ref = collection(db, "productos");
                const q = categoriaId
                    ? query(ref, where("categoria", "==", categoriaId))
                    : ref;
                const snap = await getDocs(q);
                const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                setProductos(docs);
            } catch (e) {
                console.error("Error cargando productos:", e);
                setProductos([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, [categoriaId]);

    return (
        <section style={{ padding: "1rem" }}>
            <h2>{saludo}</h2>

            {loading ? (
                <p>Cargando productos…</p>
            ) : productos.length === 0 ? (
                <div>
                    <h3>No hay productos para mostrar</h3>
                    <Link to="/">Volver al catálogo</Link>
                </div>
            ) : (
                <ItemList productos={productos} />
            )}
        </section>
    );
}

export default ItemListContainer;
