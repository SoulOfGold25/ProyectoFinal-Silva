import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

function NavBar() {
    return (
        <nav style={{ padding: "10px", background: "#eee" }}>
            <h2>Mi Tienda</h2>
            <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/categoria/calzado">Calzado</Link>
                </li>
                <li>
                    <Link to="/categoria/ropa">Ropa</Link>
                </li>
                <li>
                    <CartWidget />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
