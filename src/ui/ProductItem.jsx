import { useDispatch, useSelector } from "react-redux"
import { addItem, decreaseItemQuantity, getCurrentQuantityById, increaseItemQuantity, increaseItemQuantityByDecimal, increaseItemQuantityByTen, removeItem } from "../features/orders/orderSlice"
import Button from "./Button"

/* eslint-disable react/prop-types */
function ProductItem({ product }) {
    const { productName, id: code, productType } = product
    const currentQuantity = useSelector(getCurrentQuantityById(code))
    const isInCart = currentQuantity > 0


    const dispatch = useDispatch()

    function handleAddItem() {
        const newitem = {
            productName,
            code,
            productType,
            quantity: 1,
        }
        dispatch(addItem(newitem))
    }

    return (
        <li className="products-list__item">
            <span>{code}-{productName}</span>
            <span></span>
            {isInCart && <b>{Math.round(currentQuantity * 10) / 10}</b>}
            {!isInCart && <Button onClick={handleAddItem} text="Add" type="primary" size="small" />}
            {isInCart &&
                <div>
                    <Button onClick={() => dispatch(removeItem(code))} text="Remove" type="primary" size="small" />
                    <Button onClick={() => {
                        currentQuantity >= 2 ? dispatch(decreaseItemQuantity(code))
                            : dispatch(removeItem(code))
                    }} text="-" type="primary" size="small" />
                    <Button onClick={() => dispatch(increaseItemQuantityByDecimal(code))} text="+ 0.1" type="primary" size="small" />
                    <Button onClick={() => dispatch(increaseItemQuantity(code))} text="+ 1" type="primary" size="small" />
                    <Button onClick={() => dispatch(increaseItemQuantityByTen(code))} text="+ 10" type="primary" size="small" />
                </div>
            }
        </li>
    )
}

export default ProductItem
