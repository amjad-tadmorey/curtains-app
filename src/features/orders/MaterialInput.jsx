/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRoomCleats, addRoomMaterials, editQuantity, getItemByName } from "./orderSlice"
import Button from "../../ui/Button"

function MaterialInput({ items, type, currentRoom, sessionType, editedProductName }) {
    const dispatch = useDispatch()

    const [product, setProduct] = useState("")
    const [quantity, setQuantity] = useState("")
    const [quantityFrom, setQuantityFrom] = useState("")
    const [sewingType, setSewingType] = useState("")
    const [error, setError] = useState('')
    const [disableAdd, setDisableAdd] = useState(false)

    // just used in the pdf page
    const [productType, setProductType] = useState("")
    const filterdTypeValue = items.filter((item) => item.productName === product)
    useEffect(() => {
        setProductType(filterdTypeValue[0]?.productType)
    }, [product, filterdTypeValue])

    // get the selected item from redux to read quantity to prevent taking a quantity more than the chosen one
    const selectedItem = useSelector(getItemByName(product))


    const editedProduct = currentRoom[0]?.roomMaterials?.filter((el) => el.product === product)
    const editedQuantity = editedProduct ? quantity - editedProduct[0]?.quantity : null
    const editedProductCleats = currentRoom[0]?.roomCleats?.filter((el) => el.product === product)
    const editedQuantityCleats = editedProductCleats ? quantity - editedProductCleats[0]?.quantity : null

    const filteredArray = items.filter(item =>
        !currentRoom[0]?.roomMaterials?.some(obj => obj.product === item.productName)
    );
    const filteredArrayCleats = items.filter(item =>
        !currentRoom[0]?.roomCleats?.some(obj => obj.product === item.productName)
    );

    console.log(filteredArrayCleats);


    function handleAddMaterial(e) {
        e.preventDefault()
        // to prevent taking a quantity more than the chosen one
        if (selectedItem?.quantity < quantity) {
            setError('error')
            return
        }
        if (type === 'materials') {
            dispatch(addRoomMaterials({
                product,
                quantity,
                productType,
                sewingType
            }))
            if (sessionType === 'edit') {
                if (editedProduct.length === 0) {
                    dispatch(editQuantity({ product, quantity }))
                } else {
                    dispatch(editQuantity({ product, quantity: editedQuantity }))
                }
            } else if (sessionType === 'add') {
                dispatch(editQuantity({ product, quantity }))
            }
        } else if (type === 'cleats') {
            dispatch(addRoomCleats({
                product,
                quantity,
                productType,
                sewingType
            }))

            if (sessionType === 'edit') {
                if (editedProductCleats?.length > 0) {
                    dispatch(editQuantity({ product, quantity: editedQuantityCleats }))
                } else {
                    dispatch(editQuantity({ product, quantity }))
                }
            } else if (sessionType === 'add') {
                dispatch(editQuantity({ product, quantity }))
            }
        }
        setError('')
        setDisableAdd(true)
    }

    return (
        <div className="flex gap-1 align-end">
            {
                type === 'cleats' && <label htmlFor="" className="flex flex-col gap-1">
                    الكمية من :
                    <select type="text" id="quantityForm" className="w-100px" value={quantityFrom} onChange={(e) => setQuantityFrom(e.target.value)}>
                        <option value="width">width</option>
                        <option value="height">Height</option>
                    </select>
                </label>
            }
            <label htmlFor="" className="flex flex-col gap-1">
                اسم المنتج
                <select disabled={disableAdd} type="text" id="product" className="w-100px" value={product} onChange={(e) => setProduct(e.target.value)}>
                    {
                        editedProductName !== undefined && <>

                            <option value="" >{editedProductName}</option>
                            <option value={editedProductName}>{editedProductName}</option>
                        </>
                    }

                    {
                        editedProductName === undefined && <>
                            <option value="" disabled={true}>Choose</option>
                            <>
                                {
                                    type === 'materials' ?
                                        filteredArray.map((item) => <option key={item.code} value={item.productName}>{item.productName}</option>) :
                                        filteredArrayCleats.map((item) => <option key={item.code} value={item.productName}>{item.productName}</option>)
                                }
                            </>
                        </>
                    }
                </select>
            </label>
            {
                quantityFrom === 'width' || !quantityFrom && <label htmlFor="" className="flex flex-col gap-1">
                    المقاس
                    <input disabled={disableAdd} type="number" id="quantity" min="0" className="w-100px" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
            }
            <label htmlFor="" className="flex flex-col gap-1">
                نوع الخياطة
                <select disabled={disableAdd} type="text" id="sewing-type" className="w-100px" value={sewingType} onChange={(e) => setSewingType(e.target.value)}>
                    <option value="" disabled={true}>Choose</option>
                    <option value="type-1">تكسير</option>
                    <option value="type-2">حلق</option>
                    <option value="type-3">كوبش</option>
                </select>
            </label>
            {error && <p>error</p>}
            <Button disabled={disableAdd} text={'Add'} type={'primary'} size={'small'} onClick={handleAddMaterial} />
        </div>
    )
}

export default MaterialInput
