import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Input,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { store } from "../../../store";
import { productCreateThunk } from "../../Product/productSlice";
import {
  categoryAdapter,
  categoryFetchThunk,
} from "../../Products/categorySlice";
import { Product } from "../model/products";
import "./ProductForm.scss";

export default function ProductForm() {
  const [image, setImage] = useState();

  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  const onFileChangeHandler = (e: any) => {
    e.preventDefault();
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
    console.log(formData);
  };

  const categoryInput = categoryAdapter
    .getSelectors()
    .selectAll(store.getState().category);

  useEffect(() => {
    store.dispatch(categoryFetchThunk());
  });

  return (
    <div className="ProductForm">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                fullWidth
                defaultValue=""
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="filled-basic"
                label="Description"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="filled-basic"
                label="Price"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="filled-basic"
                label="Instock"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <div className="filterItem">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Categories
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    defaultValue="">
                    <MenuItem>--None--</MenuItem>
                    {categoryInput.map((categories, index) => (
                      <MenuItem value={categories.id} key={index}>
                        {categories.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="filled-basic"
                label="Author"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Input value={image} type="file" onChange={onFileChangeHandler} />
            </Grid>
            <Grid item xs={4}>
              <LoadingButton
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                sx={{ margin: "20px" }}>
                Add product
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}
