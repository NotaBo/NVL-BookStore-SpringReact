import { useSelector } from "react-redux";
import { BasketItem } from "../model/basket";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { store } from "../../../store";
import { addBasketItemThunk, removeBasketItemThunk } from "./BasketSlice";
import { LoadingButton } from "@mui/lab";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Cart() {
  const { basket, status } = useSelector((state: any) => state.basket);
  const subTotal = basket
    ? basket.basketItems.reduce(
        (sum: any, item: BasketItem) => sum + item.quantity * item.unitPrice,
        0
      )
    : 0;

  return (
    <div className="Cart">
      <TableContainer>
        <Table>
          <TableHead style={{ fontSize: "24" }}>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.basketItems.map((basket: BasketItem) => (
              <TableRow key={basket.productId}>
                <TableCell>
                  <img
                    src={`http://localhost:8080/api/file/image/${basket.imageUrl}`}
                    width="80"
                    height={100}
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </TableCell>
                <TableCell>
                  <div className="details">
                    <p className="name">{basket.name}</p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status === "pendingremoveItem" + basket.productId + "rem"
                    }
                    color="error"
                    onClick={() =>
                      store.dispatch(
                        removeBasketItemThunk({
                          productId: basket.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }>
                    -
                  </LoadingButton>
                  {basket.quantity}
                  <LoadingButton
                    loading={status === "pendingAddItem" + basket.productId}
                    color="success"
                    onClick={() =>
                      store.dispatch(
                        addBasketItemThunk({ productId: basket.productId })
                      )
                    }>
                    +
                  </LoadingButton>
                  <div className="price">${basket.unitPrice}</div>
                </TableCell>

                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status === "pendingremoveItem" + basket.productId + "del"
                    }
                    className="delete"
                    onClick={() =>
                      store.dispatch(
                        removeBasketItemThunk({
                          productId: basket.productId,
                          quantity: basket.quantity,
                          name: "del",
                        })
                      )
                    }>
                    <DeleteOutlinedIcon color="error" />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${subTotal.toFixed(2)}</span>
      </div>
      <button className="checkout">PROCEED TO CHECKOUT</button>
      <div className="reset">Reset cart</div>
    </div>
  );
}
