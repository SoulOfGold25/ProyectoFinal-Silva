import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartWidget() {
    const { totalUnidades } = useContext(CartContext);

    return (
        <Link
            to="/cart"
            style={{
                textDecoration: "none",
                color: "white",
                position: "relative",
            }}
        >
            🛒
            {totalUnidades() > 0 && (
                <span
                    style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-10px",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        color: "white",
                        fontSize: "0.75rem",
                    }}
                >
                    {totalUnidades()}
                </span>
            )}
        </Link>
    );
}

export default CartWidget;
