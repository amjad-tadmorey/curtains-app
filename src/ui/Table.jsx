/* eslint-disable react/prop-types */

import { createContext, useContext } from "react";

const TableContext = createContext()

function Table({ children, cols, test }) {
    return (
        <TableContext.Provider
            value={{ cols }}
        >
            <table className="table">
                {children}
                <p>{test}</p>
            </table>
        </TableContext.Provider>
    )
}

function Header({ children }) {
    const { cols } = useContext(TableContext)
    return <div className="table__header" style={{ gridTemplateColumns: cols }}>
        {children}
    </div>
}

function Row({ children, linedRows, withBorders }) {
    const { cols } = useContext(TableContext)
    return <>
        <div className={`table__row ${withBorders ? "table__row--with-borders" : ""}`} style={{ gridTemplateColumns: cols }}>
            {children}
        </div >
        {linedRows && <hr />
        }
    </>
}

function Body({ data = [], render }) {


    if (!data.length) return null
    return <div className="table__body" >
        {
            data.map(render)
        }
    </ div>
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
