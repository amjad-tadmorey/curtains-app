/* eslint-disable react/prop-types */
function Tag({ children, status }) {
    return (
        <span className={`${status} tag`} >
            {children}
        </span>
    )
}

export default Tag
