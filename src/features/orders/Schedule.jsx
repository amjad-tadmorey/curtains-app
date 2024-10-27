import Spinner from "../../ui/Spinner"
import { useOrders } from "./useOrders"

/* eslint-disable react/prop-types */
function Schedule({ onCloseModal }) {

    const { orders, isLoading } = useOrders()

    if (isLoading) return <Spinner />
    console.log(orders);

    return (
        <div className='modal'>

            <button className='modal__close' onClick={onCloseModal}>x</button>

            <h1 className='heading-2'>Schedule</h1>


            <div className="modal__wrapper">


            </div>

        </div>
    )
}

export default Schedule
