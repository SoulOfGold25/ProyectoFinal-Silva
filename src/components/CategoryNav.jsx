import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";

function CategoryNav() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const productosRef = collection(db, "productos");
                const snapshot = await getDocs(productosRef);

                const categoriasUnicas = new Set();
                snapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    if (data.categoria) {
                        categoriasUnicas.add(data.categoria);
                    }
                });

                setCategorias(Array.from(categoriasUnicas));
            } catch (error) {
                console.error("❌ Error al cargar categorías:", error);
            }
        };

        fetchCategorias();
    }, []);

    return (
        <>
            <li>
                <Link to="/">Inicio</Link>
            </li>
            {categorias.map((cat) => (
                <li key={cat}>
                    <Link to={`/categoria/${cat}`}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Link>
                </li>
            ))}
        </>
    );
}

export default CategoryNav;
