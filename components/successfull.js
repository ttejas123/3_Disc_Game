import React, { useState } from 'react'

export default function Successfull({link, setResult}) {
    const [clip, setClip] = useState("")
  return (
    <div className='w-[50%] rounded-3xl bg-[#d4dff7] opacity-[90%] p-5 text-black flex flex-col justify-center items-center'>
        <img className='flex-col p-3' src="https://img.icons8.com/flat-round/48/000000/checkmark.png"/>
        <div className='flex-col p-1'>
        successful 😍
        </div>

        <a className="text-blue-600 pt-5 cursor-pointer" onClick={()=> {
            navigator.clipboard.writeText(link+"")
            setClip(link+"");
        }}> {clip.length > 0 ? (<>Copied !!</>):(<>Copy to clipboard 📋</>)} </a>

        <div className='w-full text-center bg-blue-200 p-2 rounded-xl mt-10 cursor-pointer' onClick={()=> setResult("")}>Done</div>
    </div>
  )
}



