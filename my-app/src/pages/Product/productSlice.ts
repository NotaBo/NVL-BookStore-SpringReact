import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "../components/model/category";
import { Product } from "../components/model/products";

export const productsAdapter = createEntityAdapter<Product>();
export const categoryProductAdapter = createEntityAdapter<Category>();

export const fetchProductThunk = createAsyncThunk<Product[]>(
    'catalog/fetchProduct',
    async () => {
        try{
            const response = await axios.get('products');    
            return response.data;    
        } catch (error){
            console.log(error);
        }
    },
); 

export const fetchProductByIdThunk = createAsyncThunk<Product, number>(
    'catalog/fetchProductById',
    async (productId) => {
        try{
            const response = await axios.get(`products/${productId}`);    
            return response.data;    
        } catch (error){
            console.log(error);
        }
    }
);

export const categoryProductFetchThunk = createAsyncThunk<Product[], number>(
    'category/fetchCategoryProducts',
    async (categoryId) => {
        try{
            const response = await axios.get(`categories/${categoryId}`,{})
            return response.data;
        }catch (error:any) {
            console.log(error)
        }
    }
)

export const productCreateThunk = createAsyncThunk<Product>(
    'catalog/productcreate',
    async () => {
        try{
            const response = await axios.post(`add`)
            return response.data;
        }catch(error:any){
            console.log(error)
        }
    }
)

export const fetchProductSearch = createAsyncThunk<Product[]> (
    'catalog/fetchProductSearch',
    async (name) => {
        try{
            const response = await axios.get(`products/search?=${name}`);    
            return response.data;    
        } catch (error){
            console.log(error);
        }
    }
);


export const productSlice = createSlice({
    name: 'product',
    initialState: productsAdapter.getInitialState({
        status: 'idle',
        productLoaded: false,
    }),
    reducers: { 
        setProducts:(state, action)=>{
            productsAdapter.setAll(state,action.payload);
            state.productLoaded = true;
        }
    },
    extraReducers(builder) {

        builder.addCase(fetchProductThunk.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductThunk.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
            productsAdapter.setAll(state,action.payload);
            state.status = 'idle';
            state.productLoaded = true;
        });

        builder.addCase(fetchProductByIdThunk.pending, (state) => {
            state.status = 'pendingFetchProductByID'
        });
        builder.addCase(fetchProductByIdThunk.rejected, (state) => {
            state.status = 'idle'
        });
        builder.addCase(fetchProductByIdThunk.fulfilled, (state,action) => {
            state.status = 'idle'
            productsAdapter.upsertOne(state, action.payload)
        });

        builder.addCase(fetchProductSearch.pending, (state) => {
            state.status = 'pendingFetchProductSearch'
        });
        builder.addCase(fetchProductSearch.rejected, (state) => {
            state.status = 'idle'
        });
        builder.addCase(fetchProductSearch.fulfilled, (state,action) => {
            state.status = 'idle'
            productsAdapter.setAll(state, action.payload)
        });

        builder.addCase(productCreateThunk.pending,(state)=>{
            state.status = "pendingProductCreate";
        });
        builder.addCase(productCreateThunk.rejected,(state)=>{
            state.status = "idle";
        })
        builder.addCase(productCreateThunk.fulfilled,(state,action)=>{
            state.status = "idle";
            productsAdapter.addOne(state, action.payload)
        })

    },
});

export const productByCategorySlice = createSlice({
    name: 'productByCat',
    initialState: categoryProductAdapter.getInitialState({
        status: 'idle',
        productLoaded: false,
    }),
    reducers:{},
    extraReducers(builder) {
        // builder.addCase(categoryProductFetchThunk.pending, (state)=>{
        //     state.status = 'pendingFetchCategoryProduct';
        // });
        // builder.addCase(categoryProductFetchThunk.rejected, (state)=>{
        //     state.status = 'idle';
        // });
        // builder.addCase(categoryProductFetchThunk.fulfilled, (state,action)=>{
        //     state.status = 'idle';
        //     categoryProductAdapter.setAll(state,action.payload)
        // });
    },
});