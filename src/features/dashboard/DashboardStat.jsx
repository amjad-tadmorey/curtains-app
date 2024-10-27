import { AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

import { useOrders } from "../orders/useOrders"
import { useCustomers } from "../customers/useCustomers"


import Card from '../../ui/Card'
import Spinner from '../../ui/Spinner'
import { getRecentSevenDays, getTotalOrdersByDate, summarizeOrders } from "../../utils/helpers"
import { useProducts } from '../inventory/useProducts';

export default function DashboardStat() {

    const { orders, isLoading: isLoadingOrders } = useOrders()
    const { customers, isLoading: isLoadingCustomers } = useCustomers()
    const { products, isLoading: isLoadingProducts } = useProducts()

    if (isLoadingOrders || isLoadingCustomers || isLoadingProducts) return <Spinner />

    const totalOrders = orders.reduce((acc, cur) => acc + cur.orderTotal, 0)
    const allOrders = orders.length
    const pendingOrders = orders.filter((order) => order.status === 'pending').length
    const completedOrders = orders.filter((order) => order.status === 'completed').length


    const allCustomers = customers.length
    const activeCustomers = customers.filter((customer) => customer.status === 'active').length


    const allItems = products.length
    const activeItems = products.filter((item) => item.status === 'active').length

    const recentOrders = getRecentSevenDays(orders)

    // Function to summarize the totals by showroom and include color property
    
    const showroomOrdersPie = (summarizeOrders(orders));
    const ordersSalesByDate = getTotalOrdersByDate(orders)

    return (
        <div className='dashboard'>
            <Card>
                <Card.Header>
                    <img src="/src/assets/icons/pie.svg" alt="" />
                </Card.Header>
                <Card.Row>
                    <div className='flex flex-col gap-1'>
                        <p>Sales</p>
                        <h2>{totalOrders}</h2>
                    </div>
                </Card.Row>
            </Card>
            <Card>
                <Card.Header>
                    <img src="/src/assets/icons/customers.svg" alt="" />
                </Card.Header>
                <Card.Row>
                    <div className='flex flex-col gap-1'>
                        <p>Customers</p>
                        <h2>{allCustomers}</h2>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p>Active</p>
                        <h2>{activeCustomers}</h2>
                    </div>
                </Card.Row>
            </Card>
            <Card>
                <Card.Header>
                    <img src="/src/assets/icons/small-bag.svg" alt="" />
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
            </Card>
            <Card>
                <Card.Header>
                    <h3 className='heading-2'>Branches</h3>
                </Card.Header>
                <Card.Row>
                    <div style={{ width: '100%', height: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart >
                                <Legend verticalAlign="middle" align="right" width="30%" layout="vertical" iconSize={15} iconType="circle" />
                                <Pie data={showroomOrdersPie} dataKey="value" nameKey="showRoom" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" >
                                    {showroomOrdersPie.map((entry) => <Cell fill={entry.color} stroke={entry.color} key={entry.duaration} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                </Card.Row>
            </Card >
            <Card color={'primary'}>
                <Card.Header>
                    <img src="/src/assets/icons/small-folder.svg" alt="" />
                </Card.Header>
                <Card.Row>
                    <div className='flex flex-col gap-1'>
                        <p>All Products</p>
                        <h2>{allItems}</h2>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p>Active</p>
                        <h2>{activeItems}</h2>
                    </div>
                </Card.Row>
            </Card>
            <Card>
                <Card.Header>
                    <img src="/src/assets/icons/small-folder.svg" alt="" />
                </Card.Header>
                <Card.Row>
                    <div className='flex flex-col gap-1'>
                        <p>X</p>
                        <h2>X</h2>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p>X</p>
                        <h2>X</h2>
                    </div>
                </Card.Row>
            </Card>
            <Card>
                <Card.Header>
                    <h3 className='heading-2'>Recent Orders</h3>
                </Card.Header>


                {
                    recentOrders.map((order) => <Card.Row key={recentOrders.indexOf(order)}>
                        <p>{order.generalInfo.customer.split(',')[0]}</p>
                        <p>{order.orderTotal}</p>
                        <p>{order.status}</p>
                    </Card.Row>)
                }

            </Card>
            <Card>
                <Card.Header>
                    <h3 className='heading-2'>Sales Summary - Last 7 Days</h3>
                </Card.Header>
                <Card.Row>
                    <div style={{ width: '100%', height: `100%` }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart width={730} height={250} data={ordersSalesByDate}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#CC5F5F" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#CC5F5F" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="totalOrders" stroke="#CC5F5F" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card.Row>
            </Card>
        </div >
    )
}
