import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import CategoryNav from "./CategoryNav";

function NavBar() {
    return (
        <nav style={{ padding: "10px", background: "#eee" }}>
            <h2>Mi Tienda</h2>
            <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
                <CategoryNav />
                <li>
                    <CartWidget />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
