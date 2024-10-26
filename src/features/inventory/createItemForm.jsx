/* eslint-disable react/prop-types */
import Button from "../../ui/Button"
import { useCreateProduct } from "./useCreateProduct";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";

function CreateItemForm({ onCloseModal }) {

    const navigate = useNavigate()
    const { createProduct, isCreating } = useCreateProduct()

    const [sapID, setSapID] = useState("")
    const [oldID, setOldID] = useState("")
    const [productName, setProductName] = useState("")
    const [productType, setProductType] = useState("")
    const [price, setPrice] = useState("")


    function handleSubmit() {
        alert("Are you sure you want to create a new Item ?")
        createProduct({
            sapID,
            oldID,
            productName,
            productType,
            price,
            status: "active",
            inStock: 0
        })
        onCloseModal()
        toast.success("Item Created Successfully")
        if (!isCreating) {
            // navigate(`/inventory/${itemId}`)
        }
    }

    return (
        <div className='modal'>

            <button className='modal__close' onClick={onCloseModal}>x</button>

            <h1 className='heading-2'>Create New Item</h1>


            <div className="modal__wrapper">
                <form className="w-100">
                    <div className=''>
                        <div className="create-form__heading">
                            <h4>Item Details</h4>
                        </div>

                        <div>
                            <div className='create-form'>

                                <label htmlFor="sapID">
                                    <p className='label'>Sap ID</p>
                                    <input type="text" name="id" id="id" className="create-form__field" value={sapID} onChange={(e) => setSapID(e.target.value)} />
                                </label>
                                <label htmlFor="oldID">
                                    <p className='label'>Old ID</p>
                                    <input type="text" name="id" id="id" className="create-form__field" value={oldID} onChange={(e) => setOldID(e.target.value)} />
                                </label>
                                <label htmlFor="productName">
                                    <p className='label'>Product Name</p>
                                    <input type="text" name="productName" id="productName" className="create-form__field" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                </label>

                                <label htmlFor="productType">
                                    <p className='label'>Product Type</p>
                                    <input type="text" name="productType" id="productType" className="create-form__field" value={productType} onChange={(e) => setProductType(e.target.value)} />
                                </label>

                                <label htmlFor="price">
                                    <p className='label'>Product Price</p>
                                    <input type="text" name="price" id="price" className="create-form__field" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className="mt-3 flex justify-between">
                        <Button type={'primary-transparent'} text={'Cancel'} size={'big'} onClick={onCloseModal} />
                        <Button type={'primary'} text={'submit'} size={'big'} onClick={handleSubmit} />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateItemForm
