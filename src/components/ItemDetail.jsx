import { useState } from "react";
import ItemCount from "./ItemCount";

function ItemDetail({ nombre, descripcion, precio, stock }) {
    const [agregado, setAgregado] = useState(false);

    const handleAdd = (cantidad) => {
        console.log(`Agregado al carrito: ${cantidad}`);
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
