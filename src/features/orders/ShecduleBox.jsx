import React, { useEffect, useState } from 'react'
import { getAllWindows } from '../../utils/helpers';
import { getCustomerById } from '../../services/customersApi';

export default function ShecduleBox({ order }) {
    const windows = getAllWindows(order.rooms)
    const [customer, setCustomer] = useState()
    useEffect(() => {
        async function getCustomer() {
            const customerApi = await getCustomerById(order?.generalInfo?.customer.split(',')[1])
            setCustomer(customerApi)
        }
        getCustomer()
    }, [order])
    console.log(customer);


    let takenBoxes
    if (windows.length > 0 && windows.length <= 6) {
        takenBoxes = 1
    } else if (windows.length > 6 && windows.length <= 12) {
        takenBoxes = 2
    } else if (windows.length > 12 && windows.length <= 18) {
        takenBoxes = 3
    } else if (windows.length > 18 && windows.length <= 24) {
        takenBoxes = 4
    } else {
        takenBoxes = 0
    }
    console.log(takenBoxes);


    return (
        <div className={`schedule-box col-${takenBoxes}`}>
            <span>{customer?.customerName}</span>
            <span>{customer?.adresses}</span>
        </div>
    )
}
