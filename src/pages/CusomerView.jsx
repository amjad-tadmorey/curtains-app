import { useParams } from "react-router"
import { useGetCustomerById } from "../features/customers/useGetCustomerById"
import Spinner from "../ui/Spinner"

function CusomerView() {

    const {customerId} = useParams()
    console.log(customerId);

    const { customer, isLoadingCustomer } = useGetCustomerById(customerId)

    if(isLoadingCustomer) return <Spinner />
    console.log(customer);
    
    return (
        <div>
            CusomerView
        </div>
    )
}

export default CusomerView
