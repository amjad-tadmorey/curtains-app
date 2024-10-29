/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import Table from "../../ui/Table"
import Tag from "../../ui/Tag";
import { formatDate } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCustomerState } from "../../services/customersApi";

function CustomerRow({ customer }) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { id, customerName, adresses, phoneNumber, orders, created_at, status } = customer


    function handleAction(e) {
        console.log(e.target.className);
        console.log(id);

        updateCustomerState(id, e.target.className)
        queryClient.invalidateQueries({ queryKey: ['customers'] })
        toast.success("the customer status has been updated successfuly")
    }

    return (
        <Table.Row>
            <td className="table__item ">{customerName}</td>
            <td className="table__item ">{adresses[0]}</td>
            <td className="table__item ">{phoneNumber}</td>
            <td className="table__item ">{orders}</td>
            <td className="table__item ">{formatDate(created_at)}</td>
            <td className="">
                <Tag role="table__item " status={status}>{status}</Tag>
            </td>
            <td className="flex gap-1 align-center">
                <img src="/src/assets/icons/show.svg" alt="" onClick={() => navigate(`/customers/${id}`)} className="tool-icon" />
                <Modal>
                    <Menus>
                        <Menus.Toggle id={id}></Menus.Toggle>
                        <Menus.List id={id}>
                            <Menus.Button onClick={handleAction} status={'in-active'} icon={'/src/assets/icons/closed.svg'}>mark as in-active</Menus.Button>
                            <Menus.Button onClick={handleAction} status={'active'} icon={'/src/assets/icons/completed.svg'}>mark as Active</Menus.Button>
                        </Menus.List>
                    </Menus>
                </Modal>
            </td>
        </Table.Row>
    )
}

export default CustomerRow
