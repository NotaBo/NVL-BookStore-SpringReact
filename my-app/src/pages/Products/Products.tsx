import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { store } from "../../store";
import { addBasketItemThunk } from "../components/Cart/BasketSlice";
import {
  categoryProductFetchThunk,
  fetchProductSearch,
  fetchProductThunk,
  productDeleteThunk,
  productsAdapter,
} from "../Product/productSlice";
import { categoryAdapter, categoryFetchThunk } from "./categorySlice";
import "./Products.scss";
import SearchIcon from "@mui/icons-material/Search";
import { Product } from "../components/model/products";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Products() {
  const products = productsAdapter
    .getSelectors()
    .selectAll(store.getState().product);
  const category = categoryAdapter
    .getSelectors()
    .selectAll(store.getState().category);

  const { categoryId } = useParams();
  const [InitialProduct, setInitialProduct] = useState<Product[]>();
  const [filterCategory, setFilterCategory] = useState(0);
  const [maxPrice, setMaxPrice] = useState<any | null>(1000);
  const [sort, setSort] = useState<any | null>(null);
  const [searchbar, setSearchbar] = useState<any | null>();
  const [open, setOpen] = useState(false);

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) {
      setFilterCategory(event.target.value);
    }
  };

  const handleSearch = (event: any) => {
    if (event.target.input !== 0) {
      setSearchbar(event.target.input);
    }
  };

  const handleSearchProduct = () => {
    store.dispatch(fetchProductSearch());
  };

  if (categoryId) {
    const test = store.dispatch(categoryProductFetchThunk(+categoryId));
  }
  // const test = products.filter(
  //   (i:Product) => i.categoryId === filterCategory
  // );

  useEffect(() => {
    store.dispatch(fetchProductThunk());

    store.dispatch(categoryFetchThunk());
  }, [filterCategory, products]);

  return (
    <div className="Products">
      <div className="left">
        <div className="searchbar">
          <h2>Search</h2>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <LoadingButton onClick={handleSearchProduct}>
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                </LoadingButton>
              ),
            }}></TextField>
        </div>

        <div className="filterItem">
          <h2>Product Categories</h2>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={categoryId ? categoryId : 0}
              label="Age"
              onChange={handleInputChange}>
              <MenuItem value={0}>--None--</MenuItem>
              {category.map((categories, index) => (
                <MenuItem value={categories.id} key={index}>
                  {categories.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem"></div>
          <span>0</span>
          <input
            type="range"
            min={0}
            max={1000}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <span>{maxPrice}</span>
        </div>

        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price(Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price(Highest first)</label>
          </div>
        </div>
        <div className="addProduct">
          <LoadingButton
            component={Link}
            to={`/products/add`}
            color="primary"
            size="large"
            variant="contained"
            sx={{ margin: "20px" }}>
            Add product
          </LoadingButton>
        </div>
      </div>

      <div className="right">
        <img
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <div className="card">
                <div className="image">
                  <img
                    src={`http://localhost:8080/api/file/image/${product.imageUrl}`}
                    alt=""
                    className="mainImg"
                  />
                </div>
                <h2>{product.name}</h2>
                <div className="prices">
                  <h3>${product.unitPrice}</h3>
                  <h3>${product.unitPrice}</h3>
                </div>
                <div className="button">
                  <LoadingButton
                    // loading={status === "pendingAddItem" + product.id}
                    size="small"
                    onClick={() =>
                      store.dispatch(
                        addBasketItemThunk({ productId: product.id })
                      )
                    }>
                    Add to cart
                  </LoadingButton>
                  <LoadingButton
                    size="small"
                    component={Link}
                    to={`/product/${product.id}`}>
                    View
                  </LoadingButton>
                </div>
                <div className="button">
                  <LoadingButton
                    size="small"
                    component={Link}
                    to={`/products/update/${product.id}`}>
                    Update
                  </LoadingButton>
                  <LoadingButton
                    size="small"
                    onClick={() => {
                      store.dispatch(productDeleteThunk(product.id));
                    }}>
                    <DeleteIcon color="error" />
                  </LoadingButton>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
