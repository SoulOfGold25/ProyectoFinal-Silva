import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import CategoryNav from "./CategoryNav"; // ✅ nuevo import

function NavBar() {
    return (
        <nav style={{ padding: "10px", background: "#eee" }}>
            <h2>Mi Tienda</h2>
            <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
                <CategoryNav /> {/* ✅ reemplaza links fijos */}
                <li>
                    <CartWidget />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
