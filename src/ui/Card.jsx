/* eslint-disable react/prop-types */
import { createContext } from "react";
import Tag from "./Tag";

const CardContext = createContext()

function Card({ children }) {
    return <CardContext.Provider>
        <div className="card">
            {children}
        </div>
    </CardContext.Provider>
}

function Header({ children }) {
    return <div className="card__header">
        {children}
    </div>
}
function Row({ children }) {
    return <div className="card__row">
        {children}
    </div>
}

function Tage({ children, status }) {
    return <Tag status={status}>
        {children}
    </Tag>
}

Card.Header = Header
Card.Row = Row
Card.Padge = Tage

export default Card