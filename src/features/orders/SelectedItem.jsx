import { renderItemIcon } from "../../utils/helpers"

/* eslint-disable react/prop-types */
function SelectedItem({ item }) {

    const { code, productName, quantity, productType } = item

    const icon = renderItemIcon(productType)

    return (
        <div className="selected-item">
            <div className="flex justify-between align-center w-150px">
                <p>{code}</p>
                <p>{productName}</p>
            </div>
            <div className="flex justify-between align-center w-150px">
                <img src={icon} alt="" className="w-25px" />
                <p>{Math.round(quantity * 10) / 10}</p>
            </div>
        </div>
    )
}

export default SelectedItem
