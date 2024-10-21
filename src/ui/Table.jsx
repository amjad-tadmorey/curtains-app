/* eslint-disable react/prop-types */

function Table({ children }) {


    return (
        <table className="table">
            {children}
        </table>
    )
}

function Header({ children }) {


    return <div className="table__header">
        {children}
    </div>
}

function Row({ children, linedRows, specialStyles }) {
    return <>
        <div className="table__row" style={specialStyles ? specialStyles : null}>
            {children}
        </div>
        {linedRows && <hr />}
    </>
}

function Body({ data = [], render }) {

    if (!data.length) return null
    return <div className="table__body">
        {
            data.map(render)
        }
    </div>
}
function StaticBody({ children }) {
    return (
        <>
            {children}
        </>
    )
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.StaticBody = StaticBody


export default Table
