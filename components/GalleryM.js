import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/Cart';
import axios from 'axios';

export default function GalleryMainM({setGallery, gallery}) {
    const { CartData, RemoveItem, EmptyCart } = useContext(CartContext);

    const order = async() => {
        console.log("Order Initiated for "+ CartData.length + " Products");
        const dataToOrder = {
            "mail": window.localStorage.getItem("mail"),
            "status": "PENDING",
            "ordered_products": [...CartData]
        }
        const data = await axios.post('/api/orders_apis/addtoOrder', dataToOrder)

        console.log("😍 Order SuccessFull 😍")
        console.log("Order Result");
        console.log(data)
        alert("😍 Order SuccessFull 😍 Check in 📄 order Selection");
        EmptyCart()
    }

    return (
        <div className='w-[50%] h-[50%] rounded-3xl bg-[#d4dff7] opacity-[95%] p-5 text-black flex flex-col justify-center items-center relative'>
            <div className='bg-red-400 rounded-full absolute top-3 cursor-pointer right-3 px-3 py-1' onClick={()=> setGallery(!gallery)}>X</div>
            <div className='grid gap-2 grid-cols-2 h-full overflow-y-scroll w-full'>

                {
                    (CartData != null && CartData.length > 0) && (
                        <>
                            {
                            
                                CartData.map((val, index) => {
                                    return (
                                        <div key={index} className='flex p-3 w-[300px] h-[100px] cursor-pointer border-b-2 items-center justify-center' onClick={()=> {
                                           
                                            }
                                        }>
                                            <div>
                                                <div className='flex'><div className='text-sm font-bold'>Product Name:</div> {val.Product_name}</div>
                                                <div className='flex'><div className='text-sm font-bold'>Quantity:</div> {val.quantity}</div>
                                            </div>
                                            <div className='ml-5' onClick={()=> RemoveItem(index)}>X</div>
                                        </div>
                                    )
                                })
                            }   
                        </>
                    )
                }

            </div>
        
            {
                    (CartData == null || CartData == 0) && (<div className='w-full text-center'> Sorry Nothing Here 😔 </div>)
            }

            <div className='w-full text-center bg-blue-200 hover:bg-blue-300 p-2 rounded-xl mt-10 cursor-pointer' onClick={order}>📦 Order</div>
        </div>
    )
}