import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './features/orders/orderSlice'
import customerSlice from './features/customers/customerSlice'

const store = configureStore({
    reducer: {
        order: orderSlice,
        customer: customerSlice,
    },
});

export default store