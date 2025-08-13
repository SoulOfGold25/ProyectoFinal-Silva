import { createContext, useState, useMemo, useContext, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        const raw = localStorage.getItem("carrito");
        return raw ? JSON.parse(raw) : [];
    });

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const isInCart = (id) => carrito.some((p) => p.id === id);
    const getItemQty = (id) => carrito.find((p) => p.id === id)?.cantidad ?? 0;

    const agregarAlCarrito = (item, cantidad) => {
        const { id, nombre, precio, stock } = item;
        setCarrito((curr) => {
            const existente = curr.find((p) => p.id === id);
            const actualQty = existente?.cantidad ?? 0;
            const nuevaQty = actualQty + cantidad;

            if (Number.isFinite(stock) && nuevaQty > stock) {
                alert(
                    `No puedes agregar más de ${stock} unidades de ${nombre}.`
                );
                return curr;
            }

            if (existente) {
                return curr.map((p) =>
                    p.id === id ? { ...p, cantidad: nuevaQty } : p
                );
            }
            return [...curr, { id, nombre, precio, stock, cantidad }];
        });
    };

    const updateQty = (id, cantidad) => {
        setCarrito((curr) =>
            curr.map((p) => (p.id === id ? { ...p, cantidad } : p))
        );
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((curr) => curr.filter((p) => p.id !== id));
    };

    const vaciarCarrito = () => setCarrito([]);

    const totalUnidades = useMemo(
        () => carrito.reduce((acc, p) => acc + p.cantidad, 0),
        [carrito]
    );

    const totalPrecio = useMemo(
        () => carrito.reduce((acc, p) => acc + p.cantidad * p.precio, 0),
        [carrito]
    );

    const value = {
        carrito,
        isInCart,
        getItemQty,
        agregarAlCarrito,
        updateQty,
        eliminarDelCarrito,
        vaciarCarrito,
        totalUnidades,
        totalPrecio,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

// Custom hook estable
export function useCart() {
    return useContext(CartContext);
}
