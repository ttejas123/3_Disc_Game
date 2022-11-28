import Image from 'next/image'
import React from 'react'

function ImageSkeliton({img}) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        {img ? ( <Image src={URL.createObjectURL(img)} layout="fill" style={{background: "cover"}} />) : (<div className='border-dotted border-black border-2 rounded-lg w-[99%] h-[95%] flex items-center justify-center opacity-40 font-semibold'> No Image</div>)}
    </div>
  )
}

export default ImageSkeliton