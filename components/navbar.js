import React from 'react'

function Navbar({ setGallery }) {
  return (
    <div className={`p-2 mx-5 my-5 rounded-lg flex justify-between shadow-lg`}>
        <div className={`Left bg- flex  items-center ml-5 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-500 cursor-pointer`} >DOBBY ADS</div>
        
        <div className='Right mr-5 flex items-center'>
       
            
            <div className='mr-7 text-3xl cursor-pointer' onClick={()=> {
                                            setGallery(true)
                                          }}>
              🖼️
            </div>
            <div className='mr-7 text-3xl cursor-pointer' onClick={()=> {
              localStorage.removeItem("mail");
              localStorage.removeItem("password");
              window.location.reload()
            }} >
              <img src="https://img.icons8.com/sf-regular/35/null/exit.png" />
            </div>
            
        </div>
    </div>
  )
}

export default Navbar