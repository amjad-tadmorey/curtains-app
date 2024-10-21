import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customerDetails: {}
}

const customerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {
        createCustomer(state, action) {
            state.customerDetails = action.payload
        }
    }
})

export const {
    createCustomer
} = customerSlice.actions
export default customerSlice.reducer

export const getCustomer = (state) => state.customer.customerDetails 