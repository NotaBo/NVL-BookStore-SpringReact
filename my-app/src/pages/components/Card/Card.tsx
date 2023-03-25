import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../model/products";
import "./Card.scss";
import "swiper/swiper-bundle.css";
import { LoadingButton } from "@mui/lab";
import { store } from "../../../store";
import { addBasketItemThunk } from "../Cart/BasketSlice";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay, Virtual } from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);
interface Props {
  products: Product[];
}
export default function Card(props: Props) {
  const { products } = props;
  const { status } = useSelector((state: any) => state.basket);

  return (
    <Swiper
      id="swiper"
      slidesPerView={4}
      spaceBetween={30}
      navigation
      pagination>
      <div className="container">
        <Stack direction="row">
          {products.map((products, index) => (
            <SwiperSlide key={`slide-${index}`} style={{ listStyle: "none" }}>
              <div className="card">
                <div className="image">
                  <img
                    src={`http://localhost:8080/api/file/image/${products.imageUrl}`}
                    alt=""
                    className="mainImg"
                  />
                </div>
                <h2>{products.name}</h2>
                <div className="prices">
                  <h3>${products.unitPrice}</h3>
                  <h3>${products.unitPrice}</h3>
                </div>
                <div className="button">
                  <LoadingButton
                    loading={status === "pendingAddItem" + products.id}
                    size="small"
                    onClick={() =>
                      store.dispatch(
                        addBasketItemThunk({ productId: products.id })
                      )
                    }>
                    Add to cart
                  </LoadingButton>
                  <Button
                    size="small"
                    component={Link}
                    to={`/product/${products.id}`}>
                    View
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
          ;
        </Stack>
      </div>
    </Swiper>
  );
}
