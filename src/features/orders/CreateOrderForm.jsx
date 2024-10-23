/* eslint-disable react/prop-types */
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useCustomers } from "../customers/useCustomers"
import { addGeneralInfo, getItems } from "./orderSlice"

import Button from "../../ui/Button"
import ProductItem from "../../ui/ProductItem"
import Modal from "../../ui/Modal"
import RequiredMessage from "../../ui/RequiredMessage"
import { useItems } from "../inventory/useItems"
import Spinner from '../../ui/Spinner'


function CreateOrderForm({ onCloseModal }) {
    const dispatch = useDispatch()
    const { items, isLoading: isLoadingItems } = useItems()
    const { customers, isLoading: isLoadingCustomers } = useCustomers()
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()
    const [isSubmited, setIsSubmited] = useState(false)
    const isItemsEmpty = useSelector(getItems).length === 0
    const [search, setSearch] = useState('')

    function onSubmit() {
        dispatch(addGeneralInfo(getValues()))
        setIsSubmited(true)
        reset()
    }

    console.log(customers);


    if (isLoadingItems || isLoadingCustomers) return <Spinner />;

    return (
        <div className='modal'>

            <button className='modal__close' onClick={onCloseModal}>x</button>

            <h1 className='heading-2'>Create New Order</h1>


            <div className="modal__wrapper">
                <form className="w-50" onSubmit={handleSubmit(onSubmit)}>
                    <div className=''>
                        <div className="create-form__heading">
                            <h4>Order Details</h4>
                        </div>

                        <div>
                            <div className='create-form'>

                                <select name="customers" id="customer" className='create-form__field' {...register("customer", {
                                    required: "this field is required"
                                })}>
                                    <option value="">Choose A Customer</option>
                                    {
                                        customers?.map(customer => <option key={customer.id} value={[ customer.customerName, customer.id ]}>{customer.customerName}</option>)
                                    }
                                </select>
                                {errors.customer && <RequiredMessage>{errors.customer.message}</RequiredMessage>}
                                <label htmlFor="date">
                                    <p className='label'>Order Time & Date</p>
                                    <input type="date" name="date" id="date" placeholder='12/12/2020' className='create-form__field' {...register("date", {
                                        required: "this field is required"
                                    })} />
                                    {errors.date && <RequiredMessage>{errors.date.message}</RequiredMessage>}
                                </label>
                                <select name="customers" id="orderType" className='create-form__field' {...register("orderType", {
                                    required: "this field is required"
                                })}>
                                    <option value="">Choose A Type</option>
                                    <option value="home-delivery">Home Delivery</option>
                                    <option value="showroom-delivery">Showroom Delivey</option>
                                </select>
                                {errors.orderType && <RequiredMessage>{errors.orderType.message}</RequiredMessage>}

                                <select name="customers" id="sales" className='create-form__field' {...register("sales", {
                                    required: "this field is required"
                                })}>
                                    <option value="">Choose A sales Man</option>
                                    <option value="abd al rahman ashmar">عبد الرحمن اشمر</option>
                                    <option value="ridwan al khateeb">رضوان الخطيب</option>
                                    <option value="asmaa abd al majeed">اسماء عبد المجيد</option>
                                    <option value="yehia osama">يحيى اسامة</option>
                                    <option value="abd al rahman ismaeel">عبد الرحمن اسماعيل</option>
                                    <option value="abd al rahman sayied">عبد الرحمن سيد</option>
                                    <option value="zakaria">زكريا كعكة</option>
                                    <option value="ahmad abd al salam">احمد عبد السلام</option>
                                </select>
                                {errors.sales && <RequiredMessage>{errors.sales.message}</RequiredMessage>}

                                <input type="text" name="technical" id="technical" className="create-form__field" {...register("technical", {
                                    required: "this field is required"
                                })} />
                                {errors.technical && <RequiredMessage>{errors.technical.message}</RequiredMessage>}

                                <select name="showRoom" id="showRoom" className='create-form__field' {...register("showRoom", {
                                    required: "this field is required"
                                })}>
                                    <option value="">Choose A showroom</option>
                                    <option value="tagammo">التجمع الاول</option>
                                    <option value="90-street">التسعين</option>
                                    <option value="madinaty">مدينتي</option>
                                    <option value="nasr-city">مدينة نصر</option>
                                    <option value="shorook">الشروق</option>
                                </select>
                                {errors.showRoom && <RequiredMessage>{errors.showRoom.message}</RequiredMessage>}
                            </div>
                        </div>

                    </div>

                    {!isSubmited && <div className="mt-3"><Button type={'primary'} text={'submit'} size={'big'} /></div>}

                </form>
                <div className='products-list'>
                    <h4>Items</h4>
                    <input type="search" placeholder='Search' className='search search--primary' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <ul className="products-list__items">
                        {
                            items.map(product => <ProductItem search={search} key={product.code} product={product} />)
                        }
                    </ul>
                </div>
            </div>


            {
                isSubmited && <div className="modal__submit">
                    <Button type={'primary-transparent'} text={'Cancel'} size={'big'} onClick={onCloseModal} />
                    <Modal.Open opens="windows-form">
                        <Button type={'primary'} text={'Next'} size={'big'} disabled={isItemsEmpty} />
                    </Modal.Open>
                </div>
            }
        </div>
    )
}

export default CreateOrderForm
