/* eslint-disable react/prop-types */
function RequiredMessage({children}) {
    return (
        <p className="required-error-message">
            {children}
        </p>
    )
}

export default RequiredMessage
