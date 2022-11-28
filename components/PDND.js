import React, { useRef, useState } from 'react'

function PDND({dropArea = false}) {
    const h1dataRef = useRef();
    const [paragraph, setParagraph] = useState("")
    const [state, setState] = useState(false);
    
    return <>
    {
        dropArea ? (<>
            {
                state ? (<div className='flex relative overflow-y-auto h-36' onClick={()=> setState((pre)=> {return !pre})}>
                    {paragraph}
                    <label className=' shadow-xl w-8 h-8 ml-5 absolute border-green-200 font-bold border  rounded-full top-[0%] right-0 text-center text-[10px] bg-white flex items-center justify-center'>✏️</label>
                </div>) : (
                    <div className='flex '>
                        <textarea rows={6} cols={40} ref={h1dataRef} className="rounded-md bg-orange-50 mr-2 text-[12px] font-normal px-5 flex items-center justify-center" placeholder='Add Paragraph text' />
                        <div onClick={()=> {
                            setParagraph(h1dataRef.current ? h1dataRef.current.value : "");
                            setState((pre)=> {return !pre})
                        }} className="bg-orange-400 px-2 rounded-lg text-sm flex items-center font-normal cursor-pointer">Save</div>
                    </div>
                )
            }
        </>) : (<div className=' p-5 rounded-lg shadow-md text-center bg-white'>
        {"<"}P{" />"}
        </div>)
    }
    </>
}

export default PDND