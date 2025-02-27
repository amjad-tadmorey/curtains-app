/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import Button from "../../ui/Button"
import RequiredMessage from "../../ui/RequiredMessage";
import { useCreateCustomer } from "./useCreateCustomer";
import { formatDate, generateNumberId } from "../../utils/helpers";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function CreateCustomerForm({ onCloseModal }) {

    const navigate = useNavigate()

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()
    const { createCustomer } = useCreateCustomer()

    function onSubmit() {
        alert("Are you sure you want to create a new customer ?")

        console.log("creating");
        createCustomer({
            ...getValues(),
            adress: [getValues().adress],
            created_at: formatDate(new Date()),
            id: generateNumberId(),
            orders: [],
            status: "active"
        })
        reset()
        onCloseModal()
        toast.success("Customer Created Successfully")
    }

    return (
        <div className='modal'>

            <button className='modal__close' onClick={onCloseModal}>x</button>

            <h1 className='heading-2'>Create New Customer</h1>


            <div className="modal__wrapper">
                <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                    <div className=''>
                        <div className="create-form__heading">
                            <h4>Customer Details</h4>
                        </div>

                        <div>
                            <div className='create-form'>

                                <label htmlFor="customerName">
                                    <p className='label'>Customer Name</p>
                                    <input type="text" name="customerName" id="customerName" className="create-form__field" {...register('customerName', {
                                        required: "this field is required"
                                    })} />
                                    {errors.customerName && <RequiredMessage>{errors.customerName.message}</RequiredMessage>}
                                </label>

                                <label htmlFor="phoneNumber">
                                    <p className='label'>Phone Number</p>
                                    <input type="text" name="phoneNumber" id="phoneNumber" className="create-form__field" {...register('phoneNumber', {
                                        required: "this field is required"
                                    })} />
                                    {errors.phoneNumber && <RequiredMessage>{errors.phoneNumber.message}</RequiredMessage>}
                                </label>

                                <label htmlFor="email">
                                    <p className='label'>Email (Optional)</p>
                                    <input type="text" name="email" id="email" className="create-form__field" {...register('email')} />
                                </label>

                                <label htmlFor="adress">
                                    <p className='label'>Adress</p>
                                    <input type="text" name="adress" id="adress" className="create-form__field" {...register('adress', {
                                        required: "this field is required"
                                    })} />
                                    {errors.adress && <RequiredMessage>{errors.adress.message}</RequiredMessage>}
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

export default CreateCustomerForm
