import React, { useState } from 'react'
import Button from '../../ui/Button'
import { useOrders } from './useOrders'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'

export default function ScheduleForm({ onCloseModal }) {
    const [showOrdersList, setShowOrdersList] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    const { orders: allOrders, isLoading } = useOrders()

    if (isLoading) return <Spinner />
    const orders = allOrders.filter((order) => order.status === 'pending' || order.status === 'returned' || order.status === 'damaged')
    console.log(orders);

    function generateScheduleForSixMonths() {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const schedule = [];
        const today = new Date();
        const sixMonthsFromNow = new Date(today);
        sixMonthsFromNow.setMonth(today.getMonth() + 6);

        let currentDate = new Date(today);

        while (currentDate <= sixMonthsFromNow) {
            const dayOfWeek = daysOfWeek[currentDate.getDay()];
            const dateStr = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD

            schedule.push({ day: dayOfWeek, date: dateStr, boxes: 4, status: 'available' });

            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return schedule;
    }

    // Example usage
    const schedule = generateScheduleForSixMonths();
    console.log(schedule);


    return (
        <div className='modal'>

            <button className='modal__close' onClick={onCloseModal}>x</button>

            <h1 className='heading-2'>Start a New Schedule</h1>

            <div className='mt-3 flex align-center justify-between schedule'>
                <Button disabled={true} type={'black'} text={'Edit Schedule'} size={'big'} onClick={() => setShowOrdersList(!showOrdersList)} />

                <label htmlFor="" className='flex flex-col gap-1 heading-3'>
                    Choose a date
                    <input type="date" name="" id="" className='search' />
                </label>
            </div>

            <div className='ml-auto w-fit mt-2'><Button type={'black'} text={'Add'} size={'medium'} /></div>

            <div className="modal__submit">
                <Button type={'primary-transparent'} text={'Cancel'} size={'big'} onClick={onCloseModal} />
                <Button type={'primary'} text={'Done'} size={'big'} disabled={true} />
            </div>
        </div>
    )
}
