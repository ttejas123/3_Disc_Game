import MainView from '../components/Mainview'
import LoginSignUp from '../components/LoginSignUp'
import { useEffect, useState } from 'react'
import axios from 'axios';

export default function Home() {
  const [validUser, setValidUser] = useState(false);

  useEffect(()=> {
    async function fetchUser(){
        const mail = localStorage.getItem("mail");
        const password = localStorage.getItem("password");

        if(mail) {
          axios.post('/api/login', {mail, password}).then(res => {
                if(res.status == 200){
                  setValidUser(true);
                }
          })
        }
    }

    fetchUser();
  }, [])

  return (
    <div className='app'>
      {validUser ? (
        <MainView />
      ) : (
        <LoginSignUp setValidUser={setValidUser} validUser={validUser} />
      )}
    </div>
  )
}