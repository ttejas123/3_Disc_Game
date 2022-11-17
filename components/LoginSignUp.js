import axios from 'axios';
import React, { useRef, useState } from 'react'

const ButtonSubmit = ({children, className, onclick}) => {
    return (<div className={`bg-blue-900 p-2 rounded-lg text-center opacity-90 hover:opacity-70 cursor-pointer ${className}`} onClick={onclick}>{children}</div>)
}

function LoginSignUp({setValidUser, validUser}) {
    const mailRef = useRef('');
    const passwordRef = useRef('');
    const [userState, setUserState] = useState(true);

    

    const SignUp = () => {
        return (<div>
            <div className='text-sm font-semibold mb-1'>SignUp</div>
            <input ref={mailRef} className="p-2 w-full bg-white border-2 rounded-md text-sm " placeholder='e-Mail' />
            <input ref={passwordRef} className="p-2 w-full mt-1 bg-white border-2 rounded-md text-sm" placeholder='Password' />
            <ButtonSubmit className="mt-3 mb-2" onclick={async ()=> {
                const data = {mail:mailRef.current.value, password:passwordRef.current.value}
                // console.log(data)
                axios.post('/api/register', data).then(res => {
                    if(res.status == 200) {
                        localStorage.setItem("mail", res.data.mail)
                        localStorage.setItem("password", res.data.password)
                        setValidUser(true);
                    }
                })

            }}>Submit</ButtonSubmit>
        </div>)
    }

    const Login = () => {
        return (<div>
            <div className='text-sm font-semibold mb-1'>Login</div>
            <input ref={mailRef} className="p-2 w-full bg-white border-2 rounded-md text-sm " placeholder='e-Mail' />
            <input ref={passwordRef} className="p-2 w-full mt-1 bg-white border-2 rounded-md text-sm" placeholder='Password' />
            <ButtonSubmit className="mt-3 mb-2" onclick={async ()=> {
                const data = {mail:mailRef.current.value, password:passwordRef.current.value}
                // console.log(data)
                axios.post('/api/login', data).then(res => {
                    if(res.status == 200) {
                        localStorage.setItem("mail", res.data.mail)
                        localStorage.setItem("password", res.data.password)
                        setValidUser(true);
                    }
                })

            }}>Submit</ButtonSubmit>
        </div>)
    }


  return (
        <div className={`h-[100vh] flex justify-center items-center bg-stone-500 w-full`}>
           <div className="bg-white w-[90%] sm:w-[90%] md:w-[40%] lg:w-[35%] xl:w-[30%]  flex flex-col justify-center items-center rounded-xl p-5">
                <div className="font-bold text-xl">Signup / Login To Access your Post</div>
                <div className="text-center mt-2 mb-10 text-[#b3b3b3]">Manage your account, check notifications and many more...</div>
                {
                    userState ? (SignUp()) : (Login())
                }
                <div className='w-full flex justify-center'> 
                    <div className='underline cursor-pointer text-blue-600' onClick={()=> setUserState(true)}> SignUp </div>
                    <div className='px-1'>/</div>
                    <div className='underline cursor-pointer text-blue-600' onClick={()=> setUserState(false)}> Login </div>
                </div>
           </div>
        </div>
  )
}

export default LoginSignUp