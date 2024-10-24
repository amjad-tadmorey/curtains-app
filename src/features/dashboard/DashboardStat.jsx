import { AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

import { useOrders } from "../orders/useOrders"
import { useCustomers } from "../customers/useCustomers"
import { useItems } from "../inventory/useItems"


import Card from '../../ui/Card'
import Spinner from '../../ui/Spinner'
import { getRecentSevenDays } from "../../utils/helpers"

export default function DashboardStat() {

    const { orders, isLoading: isLoadingOrders } = useOrders()
    const { customers, isLoading: isLoadingCustomers } = useCustomers()
    const { items, isLoading: isLoadingItems } = useItems()

    if (isLoadingOrders || isLoadingCustomers || isLoadingItems) return <Spinner />

    const totalOrders = orders.reduce((acc, cur) => acc + cur.orderTotal, 0)
    const allOrders = orders.length
    const pendingOrders = orders.filter((order) => order.status === 'pending').length
    const completedOrders = orders.filter((order) => order.status === 'completed').length


    const allCustomers = customers.length
    const activeCustomers = customers.filter((customer) => customer.status === 'active').length


    const allItems = items.length
    const activeItems = items.filter((item) => item.status === 'active').length

    console.log(totalOrders);
    console.log(orders);


    const recentOrders = getRecentSevenDays(orders)

    console.log(recentOrders);

    const data = [
        {
            "time": "Page A",
            "sales": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "time": "Page B",
            "sales": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "time": "Page C",
            "sales": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "time": "Page D",
            "sales": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "time": "Page E",
            "sales": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "time": "Page F",
            "sales": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "time": "Page G",
            "sales": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]

    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
        {
            "name": "Group C",
            "value": 300
        },
        {
            "name": "Group D",
            "value": 200
        },
        {
            "name": "Group E",
            "value": 278
        },
        {
            "name": "Group F",
            "value": 189
        }
    ];
    const data02 = [
        {
            "name": "Group A",
            "value": 2400
        },
        {
            "name": "Group B",
            "value": 45
        },
        {
            "name": "Group C",
            "value": 1398
        },
        {
            "name": "Group D",
            "value": 9800
        },
        {
            "name": "Group E",
            "value": 3908
        },
        {
            "name": "Group F",
            "value": 4800
        }
    ];

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

                    <PieChart width={200} height={250}>
                        <Legend />
                        {/* <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" /> */}
                        <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" >
                            {data02.map((entry) => <Cell fill={entry.color} stroke={entry.color} key={entry.duaration} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>

                </Card.Row>
            </Card>
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
                    recentOrders.map((order) => <Card.Row>
                        <p>{order.generalInfo.customer.split(',')[0]}</p>
                        <p>{order.orderTotal}</p>
                        <p>{order.status}</p>
                    </Card.Row>)
                }

            </Card>
            <Card>
                <Card.Header>
                    <h3 className='heading-2'>Sales Summary</h3>
                </Card.Header>
                <Card.Row>
                    <AreaChart width={730} height={250} data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </Card.Row>
            </Card>
        </div>
    )
}
