import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import "./app.scss";
import ProductDetail from "./pages/Product/ProductDetail";
import Footer from "./pages/components/Footer/Footer";
import Navbar from "./pages/components/navbar/Navbar";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { setBasketReducer } from "./pages/components/Cart/BasketSlice";
import { store } from "./store";
import { getCookie } from "./util/util";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/error/NotFound";
import LoadingComponent from "./pages/components/Loading/LoadingComponent";

function App() {
  const [loading, setLoading] = useState<Boolean>();

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      axios
        .get("baskets")
        .then((response: AxiosResponse) => {
          store.dispatch(setBasketReducer(response.data));
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <div>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products/:categoryId" element={<Products />} />
        <Route path="product/:productId" element={<ProductDetail />} />
        <Route path="not-found" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
