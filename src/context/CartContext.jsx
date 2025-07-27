import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (item, cantidad) => {
        const existe = carrito.find((prod) => prod.id === item.id);

        if (existe) {
            const actualizado = carrito.map((prod) =>
                prod.id === item.id
                    ? { ...prod, cantidad: prod.cantidad + cantidad }
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
