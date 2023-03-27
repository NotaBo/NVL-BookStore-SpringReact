import { LoadingButton } from '@mui/lab';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { store } from '../../../store';
import { productCreateThunk } from '../../Product/productSlice';
import { categoryAdapter, categoryFetchThunk } from '../../Products/categorySlice';
import FormInput from '../form/FormInput';
import { Select } from '../form/Select';
import { Product } from '../model/products';
import './ProductForm.scss';

export default function ProductForm() {
  const [image, setImage] = useState();

  const methods = useForm();

  const onFileChangeHandler = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    fetch('http://localhost:8080/api/file/upload', {
      method: 'post',
      body: formData,
    }).then((res) => {
      if (res.ok) {
        alert('File uploaded successfully');
      }
    });
    console.log(formData);
  };

  const categoryInput = categoryAdapter.getSelectors().selectAll(store.getState().category);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    store.dispatch(categoryFetchThunk());
  });

  return (
    <div className="ProductForm">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormInput name="name" label="Name" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormInput name="description" label="Description" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormInput name="unitPrice" label="Price" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormInput name="unitsInStock" label="Instock" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <div className="filterItem">
                <Select name="category">
                  <MenuItem value="0">-- None --</MenuItem>
                  {categoryInput.map((categories: any, index: any) => (
                    <MenuItem value={categories.id} key={index}>
                      {categories.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Grid>

            <Grid item xs={4}>
              <FormInput name="brand" label="Author" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Input value={image} name="imageUrl" type="file" onChange={onFileChangeHandler} />
            </Grid>
            <Grid item xs={4}>
              <LoadingButton type="submit" color="primary" size="large" variant="contained" sx={{ margin: '20px' }}>
                Add product
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}
