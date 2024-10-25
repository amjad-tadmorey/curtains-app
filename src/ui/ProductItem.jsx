/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import { addItem, removeItem, setItemQuantity } from "../features/orders/orderSlice"
import Button from "./Button"
import { useEffect, useState } from "react"

function ProductItem({ product, search }) {
    const { productName, id: code, productType, price } = product
    // const currentQuantity = useSelector(getCurrentQuantityById(code))
    // const isInCart = currentQuantity > 0
    const [quantity, setQuantity] = useState(1)
    const [showQuantity, setShowQuantity] = useState(false)
    const [disabled, setDisabled] = useState(false)
    // const [isProductShown, setIsProductShown] = useState(product.productName.includes(search))

    const dispatch = useDispatch()

    useEffect(() => {
        if (showQuantity === true) {
            if (quantity > 0) {
                console.log(quantity);

                dispatch(setItemQuantity({ code, quantity: Number(quantity) }))
            } else {
                dispatch(removeItem(code))
                setQuantity(1)
                setShowQuantity(false)
                setDisabled(false)
            }
        }
    }, [quantity, showQuantity]);

    function handleAddItem() {
        setShowQuantity(true)
        setDisabled(true)
        if (+quantity === 0) {
            setShowQuantity(false)
            setDisabled(false)
        }
        const newitem = {
            productName,
            code,
            productType,
            quantity,
            price
        }
        dispatch(addItem(newitem))
    }

    return (
        <li style={{ display: `${product.productName.includes(search) ? "flex" : "none"}` }} className="products-list__item">
            <span>{code}-{productName}</span>
            <Button disabled={disabled} onClick={handleAddItem} text="Add" type="primary-transparent" size="small" />

            {showQuantity && <div>
                <input min={0} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            }

        </li>
    )
}

export default ProductItem
