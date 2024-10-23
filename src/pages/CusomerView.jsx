import { useParams } from "react-router"
import { getCustomerById } from "../services/customersApi";
import { useEffect, useState } from "react";

function CusomerView() {
    const { customerId } = useParams()
    const [customer, setCustomer] = useState()

    useEffect(() => {
        async function getCustomer() {
            const customerApi = await getCustomerById(customerId)
            setCustomer(customerApi)
        }
        getCustomer()
    }, [customerId])
    console.log(customer);
    return (
        <div>
            CusomerView
        </div>
    )
}

export default CusomerView
