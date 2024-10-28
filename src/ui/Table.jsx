/* eslint-disable react/prop-types */

import { createContext, useContext } from "react";
import { sortByDate } from "../utils/helpers";

const TableContext = createContext()

function Table({ children, cols, overFlow }) {
    let overflow
    if (overFlow === undefined) overflow = "auto"
    else if (overFlow === false) overflow = "none"

    return (
        <TableContext.Provider
            value={{ cols }}
        >
            <table className="table" style={{ overflow: overflow }}>
                {children}
            </table>
        </TableContext.Provider >
    )
}

function Header({ children }) {
    const { cols } = useContext(TableContext)
    return <thead className="table__header" style={{ gridTemplateColumns: cols }}>
        {children}
    </thead>
}

function Row({ children, linedRows, withBorders }) {
    const { cols } = useContext(TableContext)
    return <>
        <tr className={`table__row ${withBorders ? "table__row--with-borders" : ""}`} style={{ gridTemplateColumns: cols }}>
            {children}
        </tr >
        {linedRows && <hr />
        }
    </>
}

function Body({ data = [], render, sort }) {

    if (sort === true) {
        sortByDate(data)
    }


    if (!data.length) return null
    return <tbody className="table__body" >
        {
            data.map(render)
        }
    </ tbody>
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
