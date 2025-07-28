import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (item, cantidad) => {
        const productoEnCarrito = carrito.find((prod) => prod.id === item.id);
        const cantidadExistente = productoEnCarrito
            ? productoEnCarrito.cantidad
            : 0;
        const nuevaCantidad = cantidadExistente + cantidad;

        if (nuevaCantidad > item.stock) {
            alert(
                `No puedes agregar más de ${item.stock} unidades de ${item.nombre}.`
            );
            return;
        }

        if (productoEnCarrito) {
            const actualizado = carrito.map((prod) =>
                prod.id === item.id
                    ? { ...prod, cantidad: nuevaCantidad }
                    : prod
            );
            setCarrito(actualizado);
        } else {
            setCarrito([...carrito, { ...item, cantidad }]);
        }
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter((prod) => prod.id !== id));
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const totalUnidades = () => {
        return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    };

    const totalPrecio = () => {
        return carrito.reduce(
            (acc, prod) => acc + prod.cantidad * prod.precio,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                vaciarCarrito,
                totalUnidades,
                totalPrecio,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

import { useContext } from "react";

export const useCart = () => useContext(CartContext);
