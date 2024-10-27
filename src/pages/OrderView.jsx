import { useGetOrderById } from '../features/orders/useGetOrderById'
import { useEffect, useState } from 'react'
import { getCustomerById } from '../services/customersApi'
import Card from '../ui/Card'
import Table from '../ui/Table'
import Spinner from '../ui/Spinner'
import ItemRow from '../features/orders/ItemRow'
import Wrapper from '../ui/Wrapper'
import Button from '../ui/Button'
import { useNavigate } from 'react-router'

function OrderView() {

    const navigate = useNavigate()
    const { isLoadingOrder, order } = useGetOrderById()
    const [customer, setCustomer] = useState()


    useEffect(() => {
        async function getCustomer() {
            if (isLoadingOrder) return
            const customerApi = await getCustomerById(order?.generalInfo?.customer.split(',')[1])
            setCustomer(customerApi)
        }
        getCustomer()
    }, [order])

    if (isLoadingOrder) return <Spinner />

    const { id: orderId, created_at, generalInfo: { orderType, date }, staticItems, rooms, status, orderTotal } = order
    const customerId = customer?.id
    const customerName = customer?.customerName
    const adress = customer?.adresses
    const phoneNumber = customer?.phoneNumber
    const email = customer?.email

    console.log(order);


    function handleToPDF() {
        navigate(`/orders/PDF/${orderId}`)
    }


    return (
        <>
            <div className='flex justify-center align-center gap-2'>
                <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/profile.svg' />
                        <div className='flex flex-col gap-1'>
                            <h2>{customerName}</h2>
                            <p>Last order X</p>
                        </div>
                        <div className='ml-auto'>
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
                        <div className='flex flex-col gap-1'>
                            <p>Date</p>
                            <h2>{date} X</h2>
                        </div>
                    </Card.Row>
                </Card>
                <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/pin.svg' />
                    </Card.Header>
                    <Card.Row>
                        <div className='flex flex-col gap-1'>
                            <p>Home Adress</p>
                            <h2>{adress?.at(0)}</h2>
                        </div>
                    </Card.Row>
                </Card>
            </div>
            <Wrapper>
                <Table cols="repeat(6, 1fr)">
                    <Table.Header>
                        <div>Product Name</div>
                        <div>Unit Price</div>
                        <div>Qty</div>
                        <div>Discount</div>
                        <div>Action</div>
                        <div>Status</div>
                    </Table.Header>
                    <Table.Body data={staticItems} render={(item => <ItemRow key={item.code} item={item} />)} />
                </Table>
                <div className='ml-auto p-2'>
                    <Button type='primary' text="Preview As PDF" size="big" onClick={handleToPDF} />
                </div>
            </Wrapper>
        </>
    )
}

export default OrderView