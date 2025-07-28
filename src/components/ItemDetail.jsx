import { useState, useContext } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

function ItemDetail({ id, nombre, descripcion, precio, stock }) {
    const [agregado, setAgregado] = useState(false);
    const { agregarAlCarrito } = useContext(CartContext); // ✅

    const handleAdd = (cantidad) => {
        const item = {
            id,
            nombre,
            precio,
        };

        agregarAlCarrito(item, cantidad); // ✅
        setAgregado(true);
    };

    return (
        <div>
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
            <p>Precio: ${precio}</p>
            <p>Stock: {stock}</p>

            {!agregado ? (
                <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
            ) : (
                <p>✔ Producto agregado al carrito</p>
            )}
        </div>
    );
}

export default ItemDetail;
