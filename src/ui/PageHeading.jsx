/* eslint-disable react/prop-types */
function PageHeading({ label, children }) {
    return (
        <div className='section-heading'>
            <h2 className='heading-2'>{label}</h2>
            { children }
        </div>
    )
}

export default PageHeading
