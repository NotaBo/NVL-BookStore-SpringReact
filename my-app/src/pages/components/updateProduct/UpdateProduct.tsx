import { LoadingButton } from "@mui/lab";
import { Input, MenuItem, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { store } from "../../../store";
import {
  fetchProductByIdThunk,
  productsAdapter,
  productUpdateThunk,
} from "../../Product/productSlice";
import {
  categoryAdapter,
  categoryFetchThunk,
} from "../../Products/categorySlice";
import FormInput from "../form/FormInput";
import { Select } from "../form/Select";
import { Product } from "../model/products";
import "./UpdateProduct.scss";

export default function ProductForm() {
  const [image, setImage] = useState();

  const { productId } = useParams();

  let product: any = null;
  if (productId) {
    product = productsAdapter
      .getSelectors()
      .selectById(store.getState().product, +productId!);
  }

  const defaultValues: Omit<Product, "id"> = {
    name: "Name",
    description: "Description",
    unitPrice: 0,
    imageUrl: "",
    brand: "String",
    unitsInStock: 0,
    category: "0",
  };

  const methods = useForm<any>({
    defaultValues,
  });

  const onFileChangeHandler = (e: any) => {
    e.preventDefault();

    console.log(e.target.files[0]);

    methods.setValue("imageUrl", e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    fetch("http://localhost:8080/api/file/upload", {
      method: "post",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        alert("File uploaded successfully");
      }
    });
  };

  const categoryInput = categoryAdapter
    .getSelectors()
    .selectAll(store.getState().category);

  const onSubmit = (data: any) => {
    if (data) {
      store.dispatch(productUpdateThunk(data));
    }
    console.log(data);
  };

  useEffect(() => {
    if (productId) {
      store.dispatch(fetchProductByIdThunk(+productId!));
      if (product) {
        const fields = [
          "id",
          "name",
          "description",
          "unitPrice",
          "imageUrl",
          "brand",
          "unitsInStock",
        ];
        fields.forEach((field) => methods.setValue<any>(field, product[field]));
        methods.setValue("category", product.categoryId);
      }
    }
  }, [methods, product, productId]);

  useEffect(() => {
    store.dispatch(categoryFetchThunk());
  });

  return (
    <div className="ProductForm">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInput name="name" label="Name" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="description"
                label="Description"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="unitPrice"
                label="Price"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="unitsInStock"
                label="Instock"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <div className="filterItem">
                <Select name="category" fullWidth>
                  <MenuItem value="0">-- None --</MenuItem>
                  {categoryInput.map((categories: any, index: any) => (
                    <MenuItem value={categories.id} key={index}>
                      {categories.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Grid>

            <Grid item xs={12}>
              <FormInput
                name="brand"
                label="Author"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                value={image}
                name="imageUrl"
                type="file"
                onChange={onFileChangeHandler}
              />
            </Grid>
            <Grid item xs={4}>
              <LoadingButton
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                sx={{ margin: "20px" }}>
                Update Product
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}
