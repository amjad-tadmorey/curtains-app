import { useParams } from "react-router";
import { getProductById } from "../services/productsApi";
import { useEffect, useState } from "react";
import Wrapper from "../ui/Wrapper";
import TableHeading from "../ui/TableHeading";
import Table from "../ui/Table";
import Card from "../ui/Card";
import Spinner from "../ui/Spinner";
import { formatDate } from "../utils/helpers";

function ItemView() {
    const { productId } = useParams()
    const [item, setitem] = useState()

    useEffect(() => {
        async function getProduct() {
            const itemApi = await getProductById(productId)
            setitem(itemApi)
        }
        getProduct()
    }, [productId])

    if (item === undefined) return <Spinner />

    const { created_at, id, sapID, price, productName, inStock, status } = item

    return (
        <>
            <div className="flex gap-2 p-2">
                <h2 className="heading-2">{sapID} - {productName}</h2>
                <h2 className="heading-2">Date Added: {formatDate(created_at)}</h2>
            </div>


            <div className="flex justify-center align-center gap-2">
                <Card>
                    <Card.Header>
                        <img src="/src/assets/icons/small-bag.svg" alt="" />
                        Last Order 12 Sept 2022

                        <div className="ml-auto">
                            <Card.Padge status={status}>{status}</Card.Padge>
                        </div>
                    </Card.Header>
                    <Card.Row>
                        <div className='flex flex-col gap-1'>
                            <p>Price</p>
                            <h2>{price}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>In-Stock</p>
                            <h2>{inStock}</h2>
                        </div>
                    </Card.Row>
                </Card>

                <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/pie.svg' />
                    </Card.Header>
                    <Card.Row>
                        <div className='flex flex-col gap-1'>
                            <p>Total Orders</p>
                            <h2>X</h2>
                        </div>
                    </Card.Row>
                </Card>
                <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/small-bag.svg' />
                    </Card.Header>
                    <Card.Row>
                        <div className='flex flex-col gap-1'>
                            <p>Canceled</p>
                            <h2>X</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Returned</p>
                            <h2>X</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Damaged</p>
                            <h2>X</h2>
                        </div>
                    </Card.Row>
                </Card>
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
                    {/* <Table.Body data={orders} render={(order => <CustomerOrderRow key={order.id} order={order} isLoading={isLoading} />)} /> */}
                </Table>
            </Wrapper>
        </>
    )
}

export default ItemView
