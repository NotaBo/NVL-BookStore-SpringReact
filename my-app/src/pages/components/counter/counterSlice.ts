import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetchCount from "./counterAPI";

export interface CounterSlice{
    value: number;
    status: 'idle'| 'loading' | 'failed';
}

const initialState: CounterSlice ={
    value: 0,
    status: 'idle',
}

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount:number) => {
        const response = await fetchCount(amount);
        return response.data;
    }
);


export const counterSlice = createSlice ({
    name: "counter",
    initialState,
    reducers: {
        increment:(state) => {
            state.value += 1;   
        },
        decrement:(state) => {
            state.value -= 1; 
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, (state) => {
            state.status ='loading'
        })
        builder.addCase(incrementAsync.fulfilled, (state, action) => {
            state.status ='idle'
            state.value += action.payload;
        })
        builder.addCase(incrementAsync.rejected, (state) => {
            state.status ='failed'
            
        })
    },
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;