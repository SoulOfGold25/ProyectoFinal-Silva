import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartWidget() {
    const { totalUnidades } = useCart(); // número, no función

    return (
        <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            🛒 Carrito
            {totalUnidades > 0 && (
                <span
                    style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 8px",
                        marginLeft: "8px",
                        fontSize: "0.9rem",
                    }}
                >
                    {totalUnidades}
                </span>
            )}
        </Link>
    );
}

export default CartWidget;
