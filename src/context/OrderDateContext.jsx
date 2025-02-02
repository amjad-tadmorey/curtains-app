/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const OrderDateContext = createContext()

function OrderDateProvider({ children }) {
    const [orderDate, setOrderDate] = useState("")

    return <OrderDateContext.Provider value={{ orderDate, setOrderDate }}>
        {children}
    </OrderDateContext.Provider>
}

function useOrderDate() {
    const context = useContext(OrderDateContext)
    if (context === undefined) throw new Error('Order Context context was used outside of dark mode provider')
    return context
}

export { OrderDateProvider, useOrderDate }