import { useParams } from "react-router"
import { getCustomerById } from "../services/customersApi";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import Wrapper from "../ui/Wrapper";
import TableHeading from "../ui/TableHeading";
import { useOrders } from "../features/orders/useOrders";
import CustomerOrderRow from "../features/customers/CustomerOrderRow";

function CusomerView() {
    const { customerId } = useParams()
    const [customer, setCustomer] = useState()
    const { isLoading, orders } = useOrders()

    useEffect(() => {
        async function getCustomer() {
            const customerApi = await getCustomerById(customerId)
            setCustomer(customerApi)
        }
        getCustomer()
    }, [customerId])

    if (customer === undefined || isLoading) return <Spinner />

    const { adress, customerName, email, id, phoneNumber, status } = customer
    const customerOrders = orders.filter((order) => order.generalInfo.customer.split(',')[1] === id)

    const totalOrders = customerOrders.reduce((acc, cur) => acc + cur.orderTotal, 0)
    const allOrders = customerOrders.length
    const pendingOrders = customerOrders.filter((order) => order.status === 'pending').length
    const completedOrders = customerOrders.filter((order) => order.status === 'completed').length
    const returnedOrders = customerOrders.filter((order) => order.status === 'returned').length
    const canceledOrders = customerOrders.filter((order) => order.status === 'canceled').length
    const damagedOrders = customerOrders.filter((order) => order.status === 'damaged').length


    return (
        <>
            <div className="flex justify-center align-center gap-2">
                <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/profile.svg' />
                        <div className='flex flex-col gap-1'>
                            <h2>{customerName}</h2>
                            <p>Last order X</p>
                        </div>
                        <div className="ml-auto">
                            <Card.Padge status={status}>{status}</Card.Padge>
                        </div>
                    </Card.Header>
                    <Card.Row>
                        <div className='flex flex-col gap-1'>
                            <p>Phone</p>
                            <h2>{phoneNumber}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Email</p>
                            <h2>{email}</h2>
                        </div>
                    </Card.Row>
                    <hr className="mt-1" />
                    <Card.Row>
                        {
                            adress.map((el) =>
                                <div key={adress.indexOf(el)} className='flex flex-col gap-1 mt-1'>

                                    <p className="flex align-center"> <img src="/src/assets/icons/pin.svg" alt="" className="w-25px" /> Home Adress - {adress.indexOf(el) + 1}</p>
                                    <h2>{el}</h2>
                                </div>
                            )
                        }
                    </Card.Row>
                </Card>
                <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/small-bag.svg' />
                        <div className="ml-auto flex align-center gap-1">
                            <img src='/src/assets/icons/pie.svg' />
                            <div className='flex flex-col gap-1'>
                                <p>Total Sales</p>
                                <h2>{totalOrders}</h2>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Row>
                        <div className='flex flex-col gap-1'>
                            <p>All Orders</p>
                            <h2>{allOrders}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Pending</p>
                            <h2>{pendingOrders}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Completed</p>
                            <h2>{completedOrders}</h2>
                        </div>
                    </Card.Row>
                    <hr className="mt-1" />
                    <Card.Row>
                        <div className='flex flex-col gap-1 mt-1'>
                            <p>Canceled</p>
                            <h2>{canceledOrders}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Returned</p>
                            <h2>{returnedOrders}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Damaged</p>
                            <h2>{damagedOrders}</h2>
                        </div>
                    </Card.Row>
                </Card>
                {/* <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/pie.svg' />
                    </Card.Header>
                    <Card.Row>

                        <div className='flex flex-col gap-1'>
                            <p>Total Orders</p>
                            <h2>X</h2>
                        </div>
                    </Card.Row>
                </Card> */}
            </div>

            <Wrapper>
                <TableHeading label="Orders" />
                <Table cols="repeat(5, 1fr)">
                    <Table.Header>
                        <div>Order Date</div>
                        <div>Order Type</div>
                        <div>Tracking ID</div>
                        <div>Order Total</div>
                        <div>Status</div>
                    </Table.Header>
                    <Table.Body data={orders} render={(order => <CustomerOrderRow key={order.id} order={order} isLoading={isLoading} />)} />
                </Table>
            </Wrapper>
        </>
    )
}

export default CusomerView
