import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    create,
    getProducts,
    updateById,
    deleteById,
} from "@/services/product";

const initialState = {
    products: null,
    status: "idle",
    error: null,
    success: null,
};

export const createProduct = createAsyncThunk(
    "product/create",
    async (payload, thunkAPI) => {
        try {
            await create(payload);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

export const getAllProducts = createAsyncThunk(
    "product/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await getProducts();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

export const updateProductById = createAsyncThunk(
    "product/updateById",
    async (payload, thunkAPI) => {
        const { productId, newProduct } = payload;

        try {
            const response = await updateById(productId, newProduct);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

export const deleteProductById = createAsyncThunk(
    "product/deleteById",
    async (payload, thunkAPI) => {
        const productId = payload;

        try {
            const response = await deleteById(productId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.status = "pending";
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = "success";
                state.success = "Successfully create product";
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getAllProducts.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProductById.pending, (state) => {
                state.status = "pending";
            })
            .addCase(updateProductById.fulfilled, (state, action) => {
                state.status = "success";
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                state.products[index] = action.payload;
                state.success = "Successfully update the product";
            })
            .addCase(updateProductById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteProductById.pending, (state) => {
                state.status = "pending";
            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                state.status = "success";
                state.products = state.products.filter(
                    (product) => product._id !== action.payload._id
                );
                state.success = "Successfully delete the product";
            })
            .addCase(deleteProductById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default productSlice;
