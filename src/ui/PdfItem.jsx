import Table from "./Table"

const specialStyles = {
    margin: "1rem 0",
    border: "1px solid",
    padding: "1rem",
    borderRadius: "1rem",
}


/* eslint-disable react/prop-types */
function PdfItem({ item }) {
    const { productName, code, quantity, oldID } = item
    console.log(item);
    
    return (
        <Table.Row linedRows={true} specialStyles={specialStyles} withBorders={true}>
            <div className="table__item fs-2 color-dark">{quantity}</div>
            <div className="table__item fs-2 color-dark ml-auto">{productName}</div>
            <div className="table__item fs-2 color-dark ml-auto">{oldID}</div>
        </Table.Row>
    )
}

export default PdfItem
