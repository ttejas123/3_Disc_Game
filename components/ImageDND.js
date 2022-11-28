import Image from 'next/image';
import React, { useState } from 'react'
import ImageSkeliton from './ImageSkeliton';

function ImageDND({dropArea = false, idx}) {
    const [img, setImg] = useState("");

    const onFileDrop = async(e) => {
        const newFile = e.target.files[0];
        setImg(newFile);
    }
    


  return (
    <>{
        dropArea ? (<>
                        
                        <ImageSkeliton img={img} />
                        <input type="File" id={"files"+idx+""} className={`hidden`} title= "Edit" name='Edit'   onChange={onFileDrop} ></input>
                        <label className='w-9 h-9 shadow-xl border-green-200 font-bold border  rounded-full top-5 right-5 absolute text-center text-[10px] bg-white flex items-center justify-center' htmlFor={"files"+idx+""}>Edit</label>
                    </>) : (<div className=' p-5 rounded-lg shadow-md text-center bg-white'>
                    {"<"}img{" />"}
                    </div>)
    }</>
  )
}

export default ImageDND