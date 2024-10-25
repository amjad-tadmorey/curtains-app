import { renderItemIcon } from "../../utils/helpers"

/* eslint-disable react/prop-types */
function SelectedItem({ item }) {

    const { code, productName, quantity, productType } = item

    const icon = renderItemIcon(productType)

    return (
        <div className="selected-item">
            <div className="flex justify-between align-center" style={{ width: "20rem" }}>
                <p>{code}</p>
                <p>{Math.round(quantity * 10) / 10}</p>
            </div>
            <div className="flex justify-between align-center" style={{ width: "20rem" }}>
                <p>{productName}</p>
                <img src={icon} alt="" className="w-25px" />
            </div>
        </div>
    )
}

export default SelectedItem
