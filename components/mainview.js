import { useState } from 'react'
import Gallery from './Gallery'
import Navbar from './Navbar'
import Upload from './Upload'

const anchor = require('@project-serum/anchor')

const MainView = () => {
  const [gallery, setGallery] = useState(false);

  return (
    <>
      <Navbar setGallery={setGallery} />

      {
        gallery ? (
                  <div className='w-full absolute top-0 left-0  flex justify-center items-center h-full z-50'>
                      <Gallery gallery={gallery} setGallery={setGallery} />
                  </div>
        ) : (<></>)
      }
      
      <div className='flex justify-center w-full bg-red'>
        <div className='flex justify-center w-[60%] bg-green'><Upload  gallery={gallery} setGallery={setGallery} /></div>
      </div>
       
    </>
  )
}
export default MainView