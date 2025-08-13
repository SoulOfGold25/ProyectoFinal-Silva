import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemDetail from "../components/ItemDetail";

export default function ItemDetailContainer() {
    const { itemId } = useParams();
    const [item, setItem] = useState(null); // null = loading, undefined = no encontrado, objeto = ok
    const [error, setError] = useState(null);

    useEffect(() => {
        let isActive = true;

        const fetchItem = async () => {
            try {
                setError(null);
                setItem(null); // fuerza loading al cambiar itemId
                if (!itemId) {
                    if (isActive) setItem(undefined);
                    return;
                }
                const ref = doc(db, "productos", itemId);
                const snap = await getDoc(ref);

                if (!isActive) return;

                if (snap.exists()) {
                    setItem({ id: snap.id, ...snap.data() });
                } else {
                    setItem(undefined);
                }
            } catch (err) {
                if (isActive)
                    setError("Ocurrió un error cargando el producto.");
            }
        };

        fetchItem();
        return () => {
            isActive = false;
        };
    }, [itemId]);

    if (error) return <p style={{ color: "crimson" }}>{error}</p>;
    if (item === null) return <p>Cargando detalle...</p>;
    if (item === undefined) return <p>Producto no encontrado 😢</p>;

    return <ItemDetail {...item} />;
}
