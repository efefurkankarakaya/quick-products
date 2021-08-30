import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'activeProduct',
  initialState: {
    productId: -1,
    productName: '',
    productDescription: '',
    productPrice: 0,
    productImages: [],
  },
  reducers: {
    updateActiveProduct: (state, action) => {
      const {
        productId,
        productName,
        productDescription,
        productPrice,
        productImages,
      } = action.payload;
      state.productId = productId;
      state.productName = productName;
      state.productDescription = productDescription;
      state.productPrice = productPrice;
      state.productImages = productImages;
    },
  },
});

export const {updateActiveProduct} = productSlice.actions;
export default productSlice.reducer;
