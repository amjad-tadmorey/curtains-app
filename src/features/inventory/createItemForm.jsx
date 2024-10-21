/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import Button from "../../ui/Button"
import RequiredMessage from "../../ui/RequiredMessage";
import { useCreateItem } from "./useCreateItem";
import { formatDate } from "../../utils/helpers";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function CreateItemForm({ onCloseModal }) {

    const navigate = useNavigate()

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()
    const { createItem } = useCreateItem()

    function onSubmit() {
        alert("Are you sure you want to create a new Item ?")

        createItem({
            ...getValues(),
            created_at: formatDate(new Date()),
            status: "active",
            quantity: 0
        })
        reset()
        onCloseModal()
        toast.success("Item Created Successfully")
    }

    return (
        <div className='modal'>

            <button className='modal__close' onClick={onCloseModal}>x</button>

            <h1 className='heading-2'>Create New Item</h1>


            <div className="modal__wrapper">
                <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                    <div className=''>
                        <div className="create-form__heading">
                            <h4>Item Details</h4>
                        </div>

                        <div>
                            <div className='create-form'>

                                <label htmlFor="id">
                                    <p className='label'>Product ID</p>
                                    <input type="text" name="id" id="id" className="create-form__field" {...register('id', {
                                        required: "this field is required"
                                    })} />
                                    {errors.id && <RequiredMessage>{errors.id.message}</RequiredMessage>}
                                </label>
                                <label htmlFor="productName">
                                    <p className='label'>Product Name</p>
                                    <input type="text" name="productName" id="productName" className="create-form__field" {...register('productName', {
                                        required: "this field is required"
                                    })} />
                                    {errors.productName && <RequiredMessage>{errors.productName.message}</RequiredMessage>}
                                </label>

                                <label htmlFor="productType">
                                    <p className='label'>Product Type</p>
                                    <input type="text" name="productType" id="productType" className="create-form__field" {...register('productType', {
                                        required: "this field is required"
                                    })} />
                                    {errors.productType && <RequiredMessage>{errors.productType.message}</RequiredMessage>}
                                </label>

                                <label htmlFor="price">
                                    <p className='label'>Product Price</p>
                                    <input type="text" name="price" id="price" className="create-form__field" {...register('price', {
                                        required: "this field is required"
                                    })} />
                                    {errors.price && <RequiredMessage>{errors.price.message}</RequiredMessage>}
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className="mt-3 flex justify-between">
                        <Button type={'primary-transparent'} text={'Cancel'} size={'big'} onClick={onCloseModal} />
                        <Button type={'primary'} text={'submit'} size={'big'} />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateItemForm
