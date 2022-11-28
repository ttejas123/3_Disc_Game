import React, { useRef, useState } from 'react'

function H1DND({dropArea = false}) {
    const h1dataRef = useRef();
    const [header, setHeader] = useState("")
    const [state, setState] = useState(false);
    
    return <>
    {
        dropArea ? (<>
            {
                state ? (<div className='flex' onClick={()=> setState((pre)=> {return !pre})}>
                    {header}
                    <label className=' shadow-xl w-5 h-5 ml-5 border-green-200 font-bold border  rounded-full top-5 right-5 text-center text-[8px] bg-white flex items-center justify-center'>✏️</label>
                </div>) : (
                    <div className='flex '>
                        <input ref={h1dataRef} className="rounded-md bg-orange-50 mr-2 text-[12px] font-normal px-5 text-center" placeholder='Add Header text' />
                        <div onClick={()=> {
                            setHeader(h1dataRef.current ? h1dataRef.current.value : "");
                            setState((pre)=> {return !pre})
                        }} className="bg-orange-400 px-2 rounded-lg text-sm flex items-center font-normal cursor-pointer">Save</div>
                    </div>
                )
            }
        </>) : (<div className=' p-5 rounded-lg shadow-md text-center bg-white'>
        {"<"}H1{" />"}
        </div>)
    }
    </>
}

export default H1DND