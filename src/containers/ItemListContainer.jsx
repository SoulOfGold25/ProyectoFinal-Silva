import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

function ItemListContainer({ saludo }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoriaId } = useParams();

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
                setProductos(docs);
            })
            .finally(() => setLoading(false));
    }, [categoriaId]);

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h2>{saludo}</h2>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        <strong>{prod.nombre}</strong> — ${prod.precio}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemListContainer;
