import { BrowserRouter, Route, Routes } from "react-router-dom"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

import AppLayout from "./ui/AppLayout"
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Inventory from './pages/Inventory'
import Settings from './pages/Settings'
import Auth from "./pages/Auth"
import PageNotFound from "./pages/PageNotFound"
import OrderView from "./pages/OrderView"
import CustomerView from "./pages/CusomerView"
import ProductView from "./pages/ProductView"
import PDF from "./pages/PDF"


function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000
            },
            error: {
              duration: 5000
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)'
            }
          }}
        />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderView />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:customerId" element={<CustomerView />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="inventory/:itemId" element={<ProductView />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="orders/PDF/:id" element={<PDF />} />
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
