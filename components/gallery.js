import React, { useEffect, useState } from 'react'

function Gallery({gallery, setGallery}) {
    const [clip, setClip] = useState([])
    
    useEffect(()=> {
        setClip(JSON.parse(window.localStorage.getItem("NFT_IMG")))
    }, [])

    return (
        <div className='w-[50%] rounded-3xl bg-[#d4dff7] opacity-[95%] p-5 text-black flex flex-col justify-center items-center'>
            <div className='grid gap-2 grid-cols-4'>

                {
                    (clip != null && clip.length > 0) && (
                        <>
                            {
                            
                                clip.map((val, index) => {
                                    return (
                                        <img className='flex-col p-3 w-[100px] h-[100px] cursor-pointer' src={val} onClick={()=> {
                                                navigator.clipboard.writeText(val+"");
                                                window.alert("Copied To Clipboard");
                                            }
                                        } />
                                    )
                                })
                            }   
                        </>
                    )
                }

            </div>
        
            {
                    clip == null && (<div className='w-full text-center'> Sorry Nothing Here 😔 </div>)
            }

            <div className='w-full text-center bg-blue-200 hover:bg-blue-300 p-2 rounded-xl mt-10 cursor-pointer' onClick={()=> setGallery(!gallery)}>Done</div>
        </div>
    )
}

export default Gallery