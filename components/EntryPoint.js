import { useState } from 'react'
import GalleryMain from './GalleryM.js';
import Navbar from './NavbarM.js';
import Upload from './UploadM.js';


function EntryPoint() {
  const [gallery, setGallery] = useState(false);

  return (
    <>
      <Navbar setGallery={setGallery} />

      {
        gallery ? (
                  <div className='w-full absolute top-0 left-0  flex justify-center items-center h-full z-50'>
                      <GalleryMain gallery={gallery} setGallery={setGallery} />
                  </div>
        ) : (<></>)
      }
      
      <div className='flex justify-center w-full bg-red'>
        <div className='flex justify-center w-[60%] bg-green'><Upload  gallery={gallery} setGallery={setGallery} /></div>
      </div>
       
    </>
  )
}
export default EntryPoint