import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { categoryItem } from "../components/model/category";

export const categoryAdapter = createEntityAdapter<categoryItem>();

export const categoryFetchThunk = createAsyncThunk<categoryItem[]>(
    'category/fetchCategories',
    async () => {
        try {
            const response = await axios.get('categories');
            return response.data
        } catch (error:any){
            console.log(error)
        }
    },
);



export const categorySlice = createSlice({
    name: 'category',
    initialState: categoryAdapter.getInitialState ({
        status: 'idle' 
    }),
    reducers: { },
    extraReducers(builder) {

        builder.addCase(categoryFetchThunk.pending,(state)=>{
            state.status = 'pendingFetchCategories';
        });
        builder.addCase(categoryFetchThunk.fulfilled,(state,action)=>{
            state.status = 'idle';
            categoryAdapter.setAll(state,action.payload);
        });
        builder.addCase(categoryFetchThunk.rejected,(state)=>{
            state.status = 'idle';
        });


    },
}); 