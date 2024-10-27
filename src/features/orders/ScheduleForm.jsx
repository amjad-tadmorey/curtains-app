/* eslint-disable react/prop-types */
import { useState } from 'react'
import Button from '../../ui/Button'
import Spinner from '../../ui/Spinner'
import { useUpdateSchedule } from './useUpdateSchedule'
import { useSelector } from 'react-redux'
import { getRooms } from './orderSlice'
import supabase from '../../services/supabase'
import toast from 'react-hot-toast'
import Modal from '../../ui/Modal'
import { useSchedule } from './useSchedule'
import Table from '../../ui/Table'
import ScheduleRow from './ScheduleRow'
import { sortArrayByDate } from '../../utils/helpers'
import { useOrderDate } from '../../context/OrderDateContext'

export default function ScheduleForm({ onCloseModal }) {
    const { orderDate, setOrderDate } = useOrderDate()

    const [disableButton, setDisableButton] = useState(false)
    const [date, setDate] = useState('')
    const rooms = useSelector(getRooms)
    const { updateSchedule, isUpdating } = useUpdateSchedule()

    const { schedule, isLoading } = useSchedule()

    if (isLoading) return <Spinner />

    function getAllWindows(rooms) {
        return rooms.flatMap(room => room.windows);
    }
    const windows = getAllWindows(rooms)
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

    const sortedSchedule = sortArrayByDate(schedule)

    if (isLoading) return <Spinner />


    async function handleUpdateSchedule() {
        let { data: scheduleDay } = await supabase
            .from('schedule')
            .select("*")
            .eq('date', date)

        const { boxes } = scheduleDay[0]
        if (boxes < takenBoxes) {
            toast.error("the windows do not fit this day boxes try to choose another day")
            return
        }


        let newStatus = boxes - takenBoxes > 0 ? "available" : "un-available"
        const newDayData = {
            boxes: boxes - takenBoxes,
            status: newStatus,
        }
        updateSchedule({ date, newDayData }, {
            onSuccess: () => {
                setDisableButton(true)
                setOrderDate(date)
            }
        })
    }



    return (
        <div className='modal'>

            <button className='modal__close' onClick={onCloseModal}>x</button>

            <h1 className='heading-2'>Schedule</h1>

            <div className='flex align-end gap-2'>
                <div className='mt-3 flex align-center justify-between schedule'>
                    <label htmlFor="" className='flex flex-col gap-1 heading-3'>
                        Choose a date
                        <input type="date" name="" id="" className='date date--primary' value={date} onChange={(e) => setDate(e.target.value)} />
                    </label>
                </div>

                <div className='w-fit mt-2'><Button disabled={disableButton} type={'black'} text={'Add'} size={'medium'} onClick={handleUpdateSchedule} /></div>
            </div>

            <div style={{ height: "60vh" }}>
                <Table cols='repeat(4, 1fr)'>
                    <Table.Header>
                        <div>Date</div>
                        <div>Day</div>
                        <div>Boxes</div>
                        <div>Status</div>
                    </Table.Header>
                    <Table.Body data={sortedSchedule} render={(day => <ScheduleRow key={day.id} day={day} />)} />
                </Table>
            </div>

            <div className="modal__submit">
                <Button type={'primary-transparent'} text={'Cancel'} size={'big'} onClick={onCloseModal} />
                <Modal.Open opens={'confirm'}>
                    <Button type={'primary'} text={'Next'} size={'big'} />
                </Modal.Open>
            </div>
        </div>
    )
}
