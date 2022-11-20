import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/Cart';

function Product({Product_name, Product_id}) {
    const [state, setState] = useState(1);
    const { AddItem } = useContext(CartContext);

    const AddToCart = () => {
        AddItem({
            "Product_Id": Product_id,
            "Product_name": Product_name,
            "quantity": state
        })
    }

    return (
        <div className='w-44 h-36 rounded-xl shadow-md flex flex-col justify-center items-center overflow-hidden'>   
               {Product_name}
                <div className='flex my-2'>
                    <div onClick={()=> {if(state >= 2) setState((pre)=> (pre-1))}} className='px-5 rounded-xl bg-red-500 cursor-pointer '>-</div>
                    <div className='mx-2'>{state}</div>
                    <div onClick={()=> setState((pre)=> (pre+10))} className='px-5 rounded-xl bg-green-500 cursor-pointer'>-</div>
                </div>
                <div className='px-2 bg-green-600 rounded-md text-sm py-1 text-white cursor-pointer' onClick={AddToCart}>Add to Cart</div>
        </div>)
}

export default Product