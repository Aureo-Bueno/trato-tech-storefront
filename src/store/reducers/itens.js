import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetItens } from "services/useGetItens";

const initialState = [];

export const searchItens = createAsyncThunk("itens/search", useGetItens);

const itensSlice = createSlice({
  name: "itens",
  initialState,
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state = state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchItens.fulfilled, (state, { payload }) => {
        console.log("Fulfilled itens");
        return payload;
      })
      .addCase(searchItens.pending, (state, { payload }) => {
        console.log("Pending itens");
      })
      .addCase(searchItens.rejected, (state, { payload }) => {
        console.log("Rejected itens");
      });
  },
});

export const { mudarFavorito } = itensSlice.actions;

export default itensSlice.reducer;
