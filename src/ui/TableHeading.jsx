/* eslint-disable react/prop-types */
function TableHeading({ label }) {
    return (
        <div className='sub-section-heading'>
            <h3 className='heading-3'>{label}</h3>
            <form action="#">
                Must change
                <input type="search" placeholder='Search' className='search search--primary' />
            </form>
        </div>
    )
}

export default TableHeading
