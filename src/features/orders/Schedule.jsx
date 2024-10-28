/* eslint-disable react/prop-types */
import { useOrders } from "./useOrders"
import { useSchedule } from "./useSchedule"
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import { groupOrdersByWeek } from "../../utils/helpers"
import ScheduleDay from "./ScheduleDay"

function Schedule({ onCloseModal }) {

    const { orders, isLoading: isLoadingOrders } = useOrders()
    const { schedule, isLoading: isLoadingSchedule } = useSchedule()

    if (isLoadingOrders || isLoadingSchedule) return <Spinner />
    console.log(orders);
    console.log(schedule);




    const groupedSchedule = groupOrdersByWeek(schedule);
    console.log(groupedSchedule);



    return (
        <div className='modal'>

            <button className='modal__close' onClick={onCloseModal}>x</button>

            <h1 className='heading-2'>Schedule</h1>


            <div className="modal__wrapper">

                {/* <Table cols="repeat(4, 1fr)">
                    <Table.Header>
                        <div>Box-1</div>
                        <div>Box-2</div>
                        <div>Box-3</div>
                        <div>Box-4</div>
                    </Table.Header>
                </Table> */}

                <div className="flex flex-col w-100 mt-3" style={{ overflowY: "auto", height: "65vh" }}>
                    {
                        groupedSchedule.map((sched) => <Table overFlow={false} cols="repeat(6, 1fr)" key={groupedSchedule.indexOf(sched)}>
                            <Table.Header>
                                <div>Date</div>
                                <div>Day</div>
                                <div>Box-1</div>
                                <div>Box-2</div>
                                <div>Box-3</div>
                                <div>Box-4</div>
                            </Table.Header>
                            <Table.Body data={sched} render={(day) => <ScheduleDay day={day} />} />
                        </Table>)
                    }
                </div>

            </div>

        </div>
    )
}

export default Schedule
