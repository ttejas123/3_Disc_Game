import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function GalleryMain({setGallery, gallery}) {
    const [clip, setClip] = useState([])
    
    useEffect(()=> {
        async function fetchUser(){
            const mail = localStorage.getItem("mail");
        
            if(mail) {
              axios.post('/api/fetchuserspost', {mail}).then(res => {
                setClip(res.data.data)
              })
            }
        }
    
        fetchUser();
    }, [])

    return (
        <div className='w-[50%] h-[50%] rounded-3xl bg-[#d4dff7] opacity-[95%] p-5 text-black flex flex-col justify-center items-center'>
            <div className='grid gap-2 grid-cols-4 h-full overflow-y-scroll w-full'>

                {
                    (clip != null && clip.length > 0) && (
                        <>
                            {
                            
                                clip.map((val, index) => {
                                    const url = window.location.origin+"/"+val.url
                                    console.log(url)
                                    return (
                                        <img key={index} className='flex-col p-3 w-[100px] h-[100px] cursor-pointer' src={url} onClick={()=> {
                                                navigator.clipboard.writeText(url+"");
                                                window.alert("Copied To Clipboard");  //eslint-disable-line
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