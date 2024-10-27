import React from 'react'
import Table from '../../ui/Table'

export default function ScheduleRow({ day }) {
    const { date, day: selectedDay, boxes, status } = day
    return (
        <Table.Row>
            <div className="table__item">{date}</div>
            <div className="table__item">{selectedDay}</div>
            <div className="table__item">{boxes}</div>
            <div className="table__item">{status}</div>
        </Table.Row>
    )
}
