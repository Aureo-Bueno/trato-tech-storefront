import { createStandaloneToast } from "@chakra-ui/toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetCategories } from "services/useGetCategories";

const initialState = [];

const { toast } = createStandaloneToast();

export const searchCategories = createAsyncThunk(
  "categorias/search",
  useGetCategories
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCategories.fulfilled, (state, { payload }) => {
        toast({
          title: "Categorias carregadas com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        return payload;
      })
      .addCase(searchCategories.pending, (state, { payload }) => {
        toast({
          title: "Carregando categorias...",
          status: "info",
          duration: 3000,
          isClosable: true,})
      })
      .addCase(searchCategories.rejected, (state, { payload }) => {
        toast({
          title: "Erro ao carregar categorias!",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      });
  },
});

export default categoriasSlice.reducer;
