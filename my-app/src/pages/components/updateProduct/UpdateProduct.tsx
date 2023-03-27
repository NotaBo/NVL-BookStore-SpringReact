import { useEffect, useState } from "react";
import "./UpdateProduct.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BalanceIcon from "@mui/icons-material/Balance";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { store } from "../../../store";
import { productsAdapter, fetchProductByIdThunk } from "../../Product/productSlice";
import { addBasketItemThunk, removeBasketItemThunk } from "../Cart/BasketSlice";
import LoadingComponent from "../Loading/LoadingComponent";
import { BasketItem } from "../model/basket";


const images = [
  "https://images.pexels.com/photos/10026491/pexels-photo-10026491.png?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  "https://images.pexels.com/photos/12179283/pexels-photo-12179283.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
];

export default function ProductDetail() {
  let params = useParams();
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { basket, status } = useSelector((state: any) => state.basket);
  const [submitting, setSubmitting] = useState(false);
    const product = productsAdapter.getSelectors().selectById(store.getState().product, +params.productId!);
    const productStatus = useSelector((state:any)=>state.product.status)


  const basketItem = basket?.basketItems.find(
    (i: BasketItem) => i.productId === product?.id
  );

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) {
      setQuantity(event.target.value);
    }
  };

  const handleUpdateCart = () => {
    setSubmitting(true);
    if (!basketItem || quantity > basketItem?.quantity) {
      const updatedQuantity = basketItem
        ? quantity - basketItem.quantity
        : quantity;
      store.dispatch(
        addBasketItemThunk({
          productId: product!.id,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = basketItem.quantity - quantity;
      store.dispatch(
        removeBasketItemThunk({
          productId: product!.id,
          quantity: updatedQuantity,
        })
      );
    }
  };

  useEffect(() => {
    if (!product) {
        store.dispatch(fetchProductByIdThunk(+params.productId!));
    }
    if (basketItem) {
      setQuantity(basketItem.quantity);
    }
  }, [basketItem, params.productId, product]);

  
  if (productStatus.includes('pending')) 
     return <LoadingComponent/>
  

  if (!product)
    return <h3>Product not Found</h3>   

  return (
    <div className="Product">
      <div className="left">
        <div className="images">
          <img src={images[0]} alt="" onClick={(e) => setSelectedImg(0)} />
          <img src={images[1]} alt="" onClick={(e) => setSelectedImg(1)} />
        </div>
        <div className="mainImg">
          <img
            src={`http://localhost:8080/api/file/image/${product?.imageUrl}`}
            alt=""
          />
        </div>
      </div>

      <div className="right">
        <h1>{product?.name}</h1>

        <h2>{product?.brand}</h2>
        
        <span className="price">${product?.unitPrice}</span>

        <div className="description">
          <h2>Description</h2>
          <p>{product?.description}</p>
        </div>
        
        <div className="link">
          <div className="item">
            <h2>Units in stock</h2>
            <p>{product?.unitsInStock}</p>
          </div>
        </div>
        <div className="info">
          <span>Vendor: Polo</span>
          <span>Product type: T-shirt</span>
          <span>Tag: T-shirt, men, Top</span>
        </div>
        <hr />
        <div className="details">
          <span>DESCRIPTION</span>
          <hr />
          <span>ADDITIONAL INFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
}
