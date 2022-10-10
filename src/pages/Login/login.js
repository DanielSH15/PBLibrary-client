import React, { useContext, useState } from 'react';
import { BtnLink } from '../Login/Redirect';
import { Link } from 'react-router-dom';
import Axios from 'axios'

import './login.css';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const login = async (e) =>{
      e.preventDefault()
      try{
       await Axios.post(process.env.REACT_APP_PUBLIC_URI + '/login', {
        username: username,
        password: password
       }).then((response) => {
        console.log(response.data.message)
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        window.location = "/"
       })
    
      } catch (e) {
        console.log(e.response.data.message)
        setError(e.response.data.message)
      }
    }
    
    return (
         <div className='containerL'>
        <div className="signInL">
              <h1 style={{position: 'absolute', left:'38%', top:'10%', color: 'black'}}>Sign In</h1>
              <form>
                  <input type="text" placeholder="Username" class="usernameL" id="username" name="usernameL" onChange={e => {setUsername(e.target.value)}} />
                  <br />
                  <input type="password" placeholder="Password" class="passwordL" id="password" name="passwordL" onChange={e => {setPassword(e.target.value)}}/>
                  <br />
                  <Link to="/"><input type="submit" name="submit" value ="Sign In" class="btnLogL" onClick={login}/></Link>
              </form>
              <div className='errorL'>{error}</div>
          </div>
          
          <div className="signUpL">
              <h1 style={{position: 'absolute', top: '30%', left: '37%'}}>Sign Up</h1>
              <h3 style={{position: 'absolute', top: '45%', left: '15%'}}>Sign up if you dont have an account</h3>
              <form>
                  <BtnLink to="/registration" type='submit'>Sign Up</BtnLink>
              </form>
              
          </div>
      </div>
    )
}
export default Login
  