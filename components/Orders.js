import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/Cart';
import axios from 'axios';

function Orders({setGallery, gallery}) {
    
    const [list, setlist] = useState([]);
    let updateStatus = false;

    useEffect(()=> {
        const fetch = async() => {
            const data = await axios.post('/api/orders_apis/orderRead', {mail: window.localStorage.mail});
            // console.log(data)
            setlist([...data.data.Orders]);
        }            
        fetch();
    }, [updateStatus])

  return (
    <div className='w-[50%] h-[50%] rounded-3xl bg-[#d4dff7] opacity-[95%] p-5 text-black flex flex-col justify-center items-center relative'>
    <div className='bg-red-400 rounded-full absolute top-3 cursor-pointer right-3 px-3 py-1' onClick={()=> setGallery(!gallery)}>X</div>
    <div className='flex justify-center flex-col items-center h-full overflow-y-scroll w-full'>

        {
            (list != null && list.length > 0) && (
                <>
                    {
                    
                    list.map((val, index) => {
                            return (
                                <div key={index} className='flex p-4 rounded-md w-[95%]  cursor-pointer border-b-2 items-center justify-between bg-gray-600' onClick={()=> {
                                   
                                    }
                                }>
                                    <div>
                                        {val._id}
                                    </div>
                                    <div className=' justify-between flex'>{val.status} <div onClick={async()=> {
                                        if(val.status != "COMPLETED"){
                                            const update = await axios.post('/api/orders_apis/updateOrder', {
                                                "id": val._id,
                                                "status": "CANCLED",
                                            });
                                            console.log("Order is Cancled ..!")
                                            const data = await axios.post('/api/orders_apis/orderRead', {mail: window.localStorage.mail});
                                           
                                            setlist([...data.data.Orders]);
                                        }
                                    }}>🗑️</div></div>
                                </div>
                            )
                        })
                    }   
                </>
            )
        }

    </div>

    {
            (list == null || list == 0) && (<div className='w-full text-center'> Sorry Nothing Here 😔 </div>)
    }

    
</div>
  )
}

export default Orders