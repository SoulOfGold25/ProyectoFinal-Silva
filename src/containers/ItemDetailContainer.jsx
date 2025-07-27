import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemDetail from "../components/ItemDetail";

function ItemDetailContainer() {
    const [item, setItem] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        const docRef = doc(db, "productos", itemId);

        getDoc(docRef).then((resp) => {
            if (resp.exists()) {
                setItem({ ...resp.data(), id: resp.id });
            } else {
                setItem(undefined);
            }
        });
    }, [itemId]);

    if (item === null) return <p>Cargando detalle...</p>;
    if (item === undefined) return <p>Producto no encontrado 😢</p>;

    return <ItemDetail {...item} />;
}

export default ItemDetailContainer;
