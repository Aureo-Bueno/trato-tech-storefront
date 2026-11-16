import { createStandaloneToast } from '@chakra-ui/toast';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from 'services/useGetCategories';

export interface Category {
  name: string;
  thumbnail: string;
  header: string;
  id: string;
  description: string;
}

const initialState: Category[] = [];

const { toast } = createStandaloneToast();

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetch',
  getCategories
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (_state, { payload }: PayloadAction<Category[]>) => payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (_state, { payload }) => {
        toast({
          title: 'Categories loaded successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        return payload;
      })
      .addCase(fetchCategories.pending, () => {
        toast({
          title: 'Loading categories...',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      })
      .addCase(fetchCategories.rejected, () => {
        toast({
          title: 'Error loading categories!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
