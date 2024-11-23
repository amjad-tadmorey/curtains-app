import { useNavigate } from "react-router"
import Table from "../../ui/Table"
import Tag from "../../ui/Tag"
import Menus from "../../ui/Menus"
import Modal from "../../ui/Modal"
import { updateOrderState } from "../../services/ordersApi"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
// import { useUpdateOrderStatus } from "./useUpdateOrderStatus"

/* eslint-disable react/prop-types */
function OrderRow({ order }) {
    const navigate = useNavigate()
    // const { updateOrderState, isUpdating } = useUpdateOrderStatus()
    const queryClient = useQueryClient()

    const { id, status, generalInfo, orderTotal, orderDate } = order
    console.log(order);

    const { customer, orderType } = generalInfo
    const [customerName, customerId] = customer.split(",")

    function handleAction(e) {

        if (status !== 'closed') {
            updateOrderState(id, e.target.className)
            toast.success("the order status has been updated successfuly")
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        } else {
            toast('Order is Already Closed!', {
                icon: '😐',
            });
        }

    }


    return (
        <Table.Row>
            <td className="table__item">{customerName}</td>
            <td className="table__item">{orderDate}</td>
            <td className="table__item">{orderType}</td>
            <td className="table__item">{id}</td>
            <td className="table__item">{orderTotal}</td>
            <td><Tag role="table__item" status={status}>{status}</Tag></td>
            <td className="flex gap-1 align-center">
                <img src="/src/assets/icons/show.svg" alt="" onClick={() => navigate(`/orders/${id}`)} className="tool-icon" />
                <Modal>
                    <Menus>
                        <Menus.Toggle id={id}></Menus.Toggle>
                        <Menus.List id={id}>
                            {status !== 'closed' && <>

                                <Menus.Button onClick={handleAction} status={'completed'} icon={'/src/assets/icons/completed.svg'}>mark as Completed</Menus.Button>
                                <Menus.Button onClick={handleAction} status={'returned'} icon={'/src/assets/icons/returned.svg'}>mark as Returned</Menus.Button>
                                <Menus.Button onClick={handleAction} status={'damaged'} icon={'/src/assets/icons/damaged.svg'}>mark as Damaged</Menus.Button>                            </>}

                            <Menus.Button onClick={handleAction} status={'closed'} icon={'/src/assets/icons/closed.svg'}>mark as Closed</Menus.Button>
                        </Menus.List>
                    </Menus>
                </Modal>
            </td>
        </Table.Row>
    )
}

export default OrderRow
