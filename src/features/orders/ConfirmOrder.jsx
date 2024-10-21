/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useAddOrder } from "./useAddOrder"

import { clearState, getGeneralInfo, getRooms, getStaticItems } from "./orderSlice"
import Button from "../../ui/Button"
import { generateNumberId } from "../../utils/helpers"
import toast from "react-hot-toast"


function ConfirmOrder({ onCloseModal }) {

    const { addOrder, isAdding } = useAddOrder()
    const navigate = useNavigate()

    const generalInfo = useSelector(getGeneralInfo)
    const staticItems = useSelector(getStaticItems)
    const rooms = useSelector(getRooms)

    const dispatch = useDispatch()

    function handleCreateOrder() {
        const newOrder = {
            created__at: new Date(),
            id: generateNumberId(),
            status: "pending",
            staticItems,
            rooms,
            generalInfo,
        }
        addOrder(newOrder, {
            onSuccess: () => {
                !isAdding &&
                    dispatch(clearState())
                onCloseModal()
                toast.success("order created successfuly")
                navigate(`/orders/${newOrder.id}`)
            }
        })
    }

    return (
        <div className="modal w-fit min-h-fit position-center">
            <h1 className="heading-3 text-align-center">Are you Sure You Want To Create A new Order</h1>
            <div className="flex justify-center gap-3 mt-3">
                <Button type={'primary-transparent'} text={'Cancel'} size={'big'} onClick={() => onCloseModal()} />
                <Button type={'primary'} text={'Confirm'} size={'big'} onClick={handleCreateOrder} />
            </div>
        </div>
    )
}

export default ConfirmOrder
