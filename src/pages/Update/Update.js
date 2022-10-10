import React, {useEffect, useState} from 'react'
import {BtnLink, BtnLinkDelete} from './Redirect'
import {Navigate, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import './Update.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const Update = () => {
    const navigate = useNavigate()


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

    const [data, setData] = useState('')

    const [id, setId] = useState('')

    const[show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)



    const DropDown = () =>{
      var value = document.getElementById('genres').value;
      setGenre(value);
    }

    const Gender = () =>{
      if(gender == 'Male'){
        return (
          <div className='genContainerU'>
                <input type="radio" id="male" name="gender"value = "Male" defaultChecked onClick={SetGender}/>
                <label htmlFor="male" className="genderU">Male</label><br />
                <input type="radio" id="female" name="gender" value="Female" onClick={SetGender}></input>
                <label htmlFor="female" className="genderU">Female</label><br></br>
                <div id="gender_error" className="gender_errorU"></div>          
                </div>
        )
      } else {
        return(
          <div className='genContainerU'>
                <input type="radio" id="male" name="gender"  value = "Male" onClick={SetGender}/>
                <label htmlFor="male" className="genderU">Male</label><br />
                <input type="radio" id="female" name="gender" value="Female" defaultChecked onClick={SetGender}></input>
                <label htmlFor="female" className="genderU">Female</label><br></br>
                <div id="gender_error" className="gender_errorU"></div>          
                </div>
        )
      }
    }

    const SetGender = () =>{
      var male = document.getElementById('male')
      var female = document.getElementById('female')

      if(male.checked){
        setGender('Male')
      } else {
        setGender('Female')
      }
    }

    const Genre = () =>{
      if(genre == 'Horror'){
        return (
          <select name='genres' id='genres' className='selectU' onChange={DropDown}>
            <option value="Horror" selected>Horror</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Detective">Detective</option>
          </select>
        )
      } else if (genre == 'Drama'){
        return(
          <select name='genres' id='genres' className='selectU' onChange={DropDown}>
            <option value="Horror" >Horror</option>
            <option value="Drama" selected>Drama</option>
            <option value="Romance">Romance</option>
            <option value="Detective">Detective</option>
          </select>
        )
      } else if (genre == 'Romance'){
        return (
          <select name='genres' id='genres' className='selectU' onChange={DropDown}>
            <option value="Horror" >Horror</option>
            <option value="Drama">Drama</option>
            <option value="Romance" selected>Romance</option>
            <option value="Detective">Detective</option>
          </select>
        )
      } else if(genre == 'Detective'){
        return (
          <select name='genres' id='genres' className='selectU' onChange={DropDown}>
            <option value="Horror" >Horror</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Detective" selected>Detective</option>
          </select>
        )
      }
    }
    
    
    
    
    const token = sessionStorage.getItem("token")
    
    const config = {
      headers: {
        'authorization': `Bearer ${JSON.parse(token)}`
      },
      params: {
        '_id': id
      }
    }

    const get = async() =>{
      await Axios.get(process.env.REACT_APP_PUBLIC_URI + '/read', config).then((response)=>{
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setUsername(response.data.username)
        setEmail(response.data.email)
        setPassword(response.data.password)
        setPhone(response.data.phone)
        setAge(response.data.age)
        setGenre(response.data.genre)
        setGender(response.data.gender)
        setId(response.data.id)
      })
    }
    const updates = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      age: age,
      genre: genre,
      gender: gender
    }
    
    const handleClick = async (e) =>{
      e.preventDefault()
      try{
        await Axios.put(`https://pbserver.adaptable.app/update/${config.params._id}`, updates).then((response) => {
          sessionStorage.setItem("token", JSON.stringify(response.data.token))
          console.log(response.data.message)
        })
        navigate('/')
        
      } catch (e){
        if(e.response && e.response.status >= 400 && e.response.status <= 500){
            setError(e.response.data.message)
            console.log(config.params['_id'])
        }
      }
    }

    const deleteUser = () => {
      Axios.delete(`https://pbserver.adaptable.app/delete/${id}`).then((response) => {
        sessionStorage.removeItem("token")
        navigate('/')
     })
  }
    useEffect(() =>{
      get()
    }, [""])
    return (
    <div className='containerU'>
          <form>
          <div className='errorU'></div>
          <input type="text" className="firstNameU" placeholder="First Name" name="firstname" id="firstname" defaultValue={firstName} onChange = {e => setFirstName(e.target.value)}/>
                <div id="Fname_error" className="Fname_errorU"></div>
                <input type="text" className="lastNameU" placeholder="Last Name" name="lastname" id="lastname" defaultValue={lastName} onChange = {e => setLastName(e.target.value)}/>
                <div id="Lname_error" className="Lname_errorU"></div>
                <br /><br />
                <input type = "text" className = "usernameU" placeholder = "Username" name = "username" id = "username" defaultValue={username} onChange = {e => setUsername(e.target.value)} />
                <div id="username_error" className="username_errorU"></div>
                <input type="text" className="emailU" placeholder="Email" name="email" id="email" defaultValue={email} onChange = {e => setEmail(e.target.value)}/>
                <div id="email_error" className="email_errorU"></div>
                <input type="text" className="passwordU" placeholder="Password" name="password" id="password" defaultValue={password} onChange = {e => setPassword(e.target.value)}/>
                <div id="password_error" className="password_errorU"></div>
                <input type="text" className="numberU" placeholder="Phone Number" name="phone" id="phone" defaultValue={phone} onChange = {e => setPhone(e.target.value)}/>
                <div id="phone_error" className="phone_errorU"></div>
                <input type="text" className="ageU" placeholder="Age" name="age" id="age" defaultValue={age} onChange = {e => setAge(e.target.value)}/>
                <div id="age_error" className="age_errorU"></div>
                {Genre()}
                <div id="genre_errorU" className="genre_error"></div>
                {Gender()}
                <BtnLink to="/" type='submit' onClick={handleClick}>Update</BtnLink>
                <BtnLinkDelete onClick={handleShow}>Delete</BtnLinkDelete>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                 <Modal.Title>Delete your account</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                    <h1>Are you sure?</h1>
                  </Modal.Body>
                  <Modal.Footer>
                   <button className='btnSave' onClick={deleteUser}>
                       Delete Account
                    </button>
                   <br />
                   <br />
                  </Modal.Footer>
                 </Modal>
                
          </form>
        </div>
  )
}

export default Update
