import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./containers/ItemListContainer";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
    return (
        <div>
            <NavBar />

            <Routes>
                <Route
                    path="/"
                    element={
                        <ItemListContainer saludo="Bienvenido a la tienda" />
                    }
                />
                <Route
                    path="/categoria/:categoriaId"
                    element={
                        <ItemListContainer saludo="Filtrando productos..." />
                    }
                />
                <Route path="/item/:itemId" element={<ItemDetailContainer />} />
                {<Route path="/cart" element={<Cart />} />}
                {<Route path="/checkout" element={<Checkout />} />}
                <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
            </Routes>
        </div>
    );
}

export default App;
