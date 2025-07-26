import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Login() {
  const navigation = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [invalidCred,setInvalidCred] = useState(false)
  const loginHandler = () =>{
    axios.post("http://localhost:8000/login",{email,password})
    .then(res => {
      sessionStorage.setItem("token", res.data.token)
      sessionStorage.setItem("name",res.data.name)
      navigation('/employee')
    })
    .catch(err => {
      console.log(err)
      if (err.status==401) {
        setInvalidCred(true)
      }

    })
  }

  return (
    <>
      <div className='main_container'>
        <div className='login_card'>
          <div className='circle_tl'></div>
          <div className='circle_bl'></div>
          <div className='circle'></div>
          <div className='circle_br'></div>
          <div className='login_message'>
            <h1>Welcome</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aliquam consequuntur</p>
          </div>
          <div className='login_form'>
            <h2>Sign in</h2>
            {invalidCred && <div className='invalid'> Invalid credentials !!</div>}
            <div className='text_box'>
              <FontAwesomeIcon icon={faEnvelope} />
              <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='text_box'>
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={(e) => loginHandler()}>Sign in</button>
            <div className='or'>
              <hr />
              <div>  or  </div>
              <hr />
            </div>
            <div className='sign_up'>Don't have an account? <Link to="/register">Sign up</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
