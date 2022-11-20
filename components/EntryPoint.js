import { useState } from 'react'
import GalleryMain from './GalleryM.js';
import Navbar from './NavbarM.js';
import ProductList from './ProductList.js';
import Orders from './Orders.js';

function EntryPoint() {
  const [gallery, setGallery] = useState(false);
  const [Order, setOrders] = useState(false);

  return (
    <>
      <Navbar setGallery={setGallery} setOrders={setOrders} />

      {
        gallery ? (
                  <div className='w-full absolute top-0 left-0  flex justify-center items-center h-full z-50'>
                      <GalleryMain gallery={gallery} setGallery={setGallery} />
                  </div>
        ) : (<></>)
      }

      {
        Order ? (
                  <div className='w-full absolute top-0 left-0  flex justify-center items-center h-full z-50'>
                      <Orders gallery={Order} setGallery={setOrders} />
                  </div>
        ) : (<></>)
      }
      
      <div className='flex justify-center w-full bg-red'>
        <div className='flex justify-center w-[60%] bg-green'><ProductList  gallery={gallery} setGallery={setGallery} /></div>
      </div>
       
    </>
  )
}
export default EntryPoint