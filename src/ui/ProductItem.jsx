import { useDispatch, useSelector } from "react-redux"
import { addItem, getCurrentQuantityById, setItemQuantity } from "../features/orders/orderSlice"
import Button from "./Button"
import { useState } from "react"

/* eslint-disable react/prop-types */
function ProductItem({ product }) {
    const { productName, id: code, productType } = product
    const currentQuantity = useSelector(getCurrentQuantityById(code))
    const isInCart = currentQuantity > 0
    const [quantity, setQuantity] = useState(0)
    const [showQuantity, setShowQuantity] = useState(false)


    const dispatch = useDispatch()

    function handleAddItem() {
        const newitem = {
            productName,
            code,
            productType,
            quantity,
        }
        dispatch(addItem(newitem))
    }

    return (
        <li className="products-list__item">
            <span>{code}-{productName}</span>
            <span></span>
            <b>{Math.round(currentQuantity * 10) / 10}</b>

            <Button onClick={handleAddItem} text="Add" type="primary" size="small" />


            <div>
                <input type="number" value={quantity} onChange={(e) => {
                    setQuantity(e.target.value)
                    dispatch(setItemQuantity({code, quantity}))
                }} />
            </div>

        </li>
    )
}

export default ProductItem
