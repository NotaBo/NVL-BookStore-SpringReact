import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../src/pages/components/counter/counterSlice";
import { productSlide } from "./pages/Product/productSlice";
import { basketSlice } from "./pages/components/Cart/BasketSlice";
import { categorySlice } from "./pages/Products/categorySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    basket: basketSlice.reducer,
    product: productSlide.reducer,
    category: categorySlice.reducer,
  },
});
