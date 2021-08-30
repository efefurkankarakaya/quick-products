import {configureStore} from '@reduxjs/toolkit';

import {formReducer, loginReducer, productReducer} from './reducers';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    form: formReducer,
    product: productReducer,
  },
});
