import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Register() {
    const navigation = useNavigate()
    const [fullName,setFullName] = useState('');
    const [password,setPassword] = useState('');
    const [email, setEmail] = useState('');
    const registerHandler = () =>{
        axios.post("http://localhost:8000/register",{fullName,password,email})
        .then(res => {
           navigation("/login") 
        }
        )
        .catch(err => err)
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
            <h1>Register</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aliquam consequuntur</p>
          </div>
          <div className='login_form'>
            <h2>Sign up</h2>
            <div className='text_box'>
                <FontAwesomeIcon icon={faUser} />
                <input type="text" placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)}/>
            </div>
            <div className='text_box'>
                <FontAwesomeIcon icon={faLock} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='text_box'>
                <FontAwesomeIcon icon={faEnvelope} />
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button onClick={(e) => registerHandler()}>Sign up</button>
            <div className='or'>
              <hr />
              <div>  or  </div>
              <hr />
            </div>
            <div className='sign_up'>Have an account? <Link to="/login">Sign in</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register