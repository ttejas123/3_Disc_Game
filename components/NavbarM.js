import React, { useContext } from 'react'
import { CartContext } from '../Context/Cart';

export default function NavbarM({ setGallery, setOrders }) {
  const { CartData } = useContext(CartContext);

  return (
    <div className={`p-2 mx-5 my-5 rounded-lg flex justify-between shadow-lg`}>
        <div className={`Left bg- flex  items-center ml-5 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-500 cursor-pointer`} >FlipTree!</div>
        
        <div className='Right mr-5 flex items-center'>
       
            <div className='absolute text-[8px] bg-green-400 rounded-full top-[7.5%] right-[14.3%] z-10 px-2 py-1'>{CartData.length}</div>

            <div className='mr-7 text-3xl cursor-pointer relative' onClick={()=> {
                                            setGallery(true)
                                          }}>
              🛒
              
            </div>
            <div className='mr-7 text-3xl cursor-pointer relative' onClick={()=> {
                                            setOrders(true)
                                          }}>
              📄
            </div>
            <div className='mr-7 text-3xl cursor-pointer' onClick={()=> {
              localStorage.removeItem("mail");
              localStorage.removeItem("password");
              window.location.reload()
            }} >
              <img src="https://img.icons8.com/sf-regular/35/null/exit.png" />
            </div>
            
        </div>
    </div>
  )
}
