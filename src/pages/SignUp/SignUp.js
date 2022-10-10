import React, { useState } from 'react'
import {BtnLink} from './Redirect'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './SignUp.css'



  const SignUp = () => {  
      const token = sessionStorage.getItem("token")
      
  
      const [username, setUsername] = useState('')
      const [firstName, setFirstName] = useState('')
  
      const [lastName, setLastName] = useState('')
      const [email, setEmail] = useState('')
  
      const [password, setPassword] = useState('')
      const [phone, setPhone] = useState('')
  
      const [age, setAge] = useState('')
      const [genre, setGenre] = useState('Select Favorite Genre')
  
      const [male, setMale] = useState('')
      const[female, setFemale] = useState('')
      const [gender, setGender] = useState('')

      const [error, setError] = useState('')

      const navigate = useNavigate()
  
      const DropDown = () =>{
        var value = document.getElementById('genres').value;
        setGenre(value);
      }
  
      const Gender = () =>{
        var male = document.getElementById('male')
        var female = document.getElementById('female')
  
        if(male.checked){
          setGender("Male")
        } else if(female.checked){
          setGender("Female")
        }
      }

      const btnUser = () =>{
        if(token){
          return (
            <BtnLink to="/login" type='submit' onClick={handleSubmit} style = {{fontSize: '22px'}}>Add User</BtnLink>
          )
        } else {
          return (
            <BtnLink to="/login" type='submit' onClick={handleSubmit}>Sign Up</BtnLink>
          )
          
        }
      }

      
      const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
          await Axios.post(process.env.REACT_APP_PUBLIC_URI + '/registration', {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
            age: age,
            genre: genre,
            gender: gender
          }).then((response) => {
             console.log(response.message)
          })
          if(sessionStorage.getItem("token")){
            navigate('/admin')
          } else {
            navigate('/login')
          }
        } catch (e){
          if(e.response && e.response.status >= 400 && e.response.status <= 500){
              setError(e.response.data.message)
          }
        }
      }
      return (
        <div className='containerS'>
          <form>
          <div className='error'>{error}</div>
          <input type="text" className="firstName" placeholder="First Name" name="firstname" id="firstname" value={firstName} onChange = {e => setFirstName(e.target.value)}/>
                <div id="Fname_error" className="Fname_error"></div>
                <input type="text" className="lastName" placeholder="Last Name" name="lastname" id="lastname" value={lastName} onChange = {e => setLastName(e.target.value)}/>
                <div id="Lname_error" className="Lname_error"></div>
                <br /><br />
                <input type = "text" className = "username" placeholder = "Username" name = "username" id = "username" value={username} onChange = {e => setUsername(e.target.value)} />
                <div id="username_error" className="username_error"></div>
                <input type="text" className="email" placeholder="Email" name="email" id="email" value={email} onChange = {e => setEmail(e.target.value)}/>
                <div id="email_error" className="email_error"></div>
                <input type="password" className="password" placeholder="Password" name="password" id="password" value={password} onChange = {e => setPassword(e.target.value)}/>
                <div id="password_error" className="password_error"></div>
                <input type="text" className="number" placeholder="Phone Number" name="phone" id="phone" value={phone} onChange = {e => setPhone(e.target.value)}/>
                <div id="phone_error" className="phone_error"></div>
                <input type="text" className="age" placeholder="Age" name="age" id="age" value={age} onChange = {e => setAge(e.target.value)}/>
                <div id="age_error" className="age_error"></div>
                <select name="genres" id="genres" value={genre} onChange={DropDown} className = 'selectGenre'>
                    <option value="Select Favorite Genre" disabled hidden selected>Select Favorite Genre</option>      
                    <option value="Horror">Horror</option>
                          <option value="Drama">Drama</option>
                          <option value="Romance">Romance</option>
                          <option value="Detective">Detective</option>
                </select>
                <div id="genre_error" className="genre_error"></div>
                <div className='genContainer'>
                <input type="radio" id="male" name="gender" onClick={Gender} value = "Male"/>
                <label htmlFor="male" className="gender">Male</label><br />
                <input type="radio" id="female" name="gender" onClick={Gender} value="Female"></input>
                <label htmlFor="female" className="gender">Female</label><br></br>
                <div id="gender_error" className="gender_error"></div>          
                </div>
                {btnUser()}
          </form>
        </div>
      )
      }
export default SignUp
