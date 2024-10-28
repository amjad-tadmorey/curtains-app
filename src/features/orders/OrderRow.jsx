import { useNavigate } from "react-router"
import Button from "../../ui/Button"
import Table from "../../ui/Table"
import Tag from "../../ui/Tag"
import Menus from "../../ui/Menus"
import Modal from "../../ui/Modal"

/* eslint-disable react/prop-types */
function OrderRow({ order }) {
    const navigate = useNavigate()

    const { id, status, generalInfo, orderTotal, orderDate } = order
    const { customer, orderType } = generalInfo
    const [customerName, customerId] = customer.split(",")


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
                            <Menus.Button icon={'/src/assets/icons/show.svg'}>mark as Completed</Menus.Button>
                            <Menus.Button icon={'/src/assets/icons/show.svg'}>mark as Returned</Menus.Button>
                            <Menus.Button icon={'/src/assets/icons/show.svg'}>mark as Damaged</Menus.Button>
                            <Menus.Button icon={'/src/assets/icons/show.svg'}>mark as Closed</Menus.Button>
                        </Menus.List>
                    </Menus>
                </Modal>
            </td>
        </Table.Row>
    )
}

export default OrderRow
