import React, { useState } from 'react'
import { createContext } from 'react'


export const CartContext = createContext({})

function Cart({children}) {
    const [cart, setCart] = useState([]);

    const add_item = (newProd) => {
        setCart((pre)=> {
            return [...pre, newProd]
        })
    }

    const remove_prod = (i) => {
        const filtering_data = cart.filter((val, index) => (index != i));

        setCart(filtering_data);
    }

    const Empty_cart = () => {
        
        setCart([]);
    }


  return ( 
    <CartContext.Provider value={{
        CartData: cart,
        AddItem: add_item,
        RemoveItem: remove_prod,
        EmptyCart:Empty_cart
    }}>{children}</CartContext.Provider>
  )
}

export default Cart