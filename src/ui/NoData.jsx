import React from 'react'

export default function NoData({ resource, icon }) {
    return (
        <div className='no-data'>
            <img src={icon} alt="" />
            <h1 className='heading-1'> No {resource} Yet </h1>
        </div>
    )
}
