import { useState } from "react";

function ItemCount({ stock, initial = 1, onAdd }) {
    const [cantidad, setCantidad] = useState(initial);

    const aumentar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };

    const disminuir = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    return (
        <div style={{ marginTop: "1rem" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button onClick={disminuir}>-</button>
                <span>{cantidad}</span>
                <button onClick={aumentar}>+</button>
            </div>
            <button
                onClick={() => onAdd(cantidad)}
                style={{ marginTop: "10px", padding: "5px 15px" }}
            >
                Agregar al carrito
            </button>
        </div>
    );
}

export default ItemCount;
