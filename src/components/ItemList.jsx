import Item from "./Item";

export default function ItemList({ productos }) {
    if (!productos?.length) return <p>No hay productos para mostrar.</p>;

    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
        >
            {productos.map((p) => (
                <Item
                    key={p.id}
                    id={p.id}
                    nombre={p.nombre}
                    precio={p.precio}
                    imagen={p.imagen}
                />
            ))}
        </ul>
    );
}
