/* eslint-disable react/prop-types */
function Button({ text, type, onClick, size, disabled }) {
    return (
        <button disabled={disabled} className={`btn btn--${type} btn--${size}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button
