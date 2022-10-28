import React, {useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import './Admin.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table';
import axios from 'axios'




const Admin = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const[show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const navigate = useNavigate()

    const getUsers = async () =>{
    await Axios.get(process.env.REACT_APP_PUBLIC_URI + '/readall').then((response) =>{
        setData(response.data)
    })
  }
  
  

  const [error, setError] = useState('')
  
 const [id, setId] = useState('')

 const [updatedUser, setUpdatedUser] = useState({})
  

  

  const addUser = () => {
    navigate('/registration')
}
 

    
 useEffect(() => {
    getUsers()
 }, [""])

 const deleteUser = (id) => {
     Axios.delete(process.env.REACT_APP_PUBLIC_URI + `/delete/${id}`).then((response) => {
        window.location.reload(true)
    })
 }

 const updateUser = (user) => {
    setUpdatedUser(user)
    handleShow()
 }

 const handleChange = (e) => {
  const {name, value} = e.target
  setUpdatedUser(prev => {
    return ({
      ...prev,
      [name]: value
    })
  })
 }

 const saveUpdatedUser = async(e) => {
  try{
    await axios.put(process.env.REACT_APP_PUBLIC_URI + `/update/${updatedUser._id}`, updatedUser).then((response) => {
      console.log(response.data)
      alert('Updated')
      handleClose()
      window.location.reload()
    })
  } catch(e){
    if(e.response && e.response.status >= 400 && e.response.status <= 500){
      setError(e.response.data.message)
      console.log(error)
  }
  }
  
 }

 const DropDown = () =>{
  var value = document.getElementById('genre').value;
  updatedUser.genre = value
}



 
  return (
    
    
    <div>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Update user {updatedUser.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div className='errorA'>{error}</div>
          <input type="text" className="firstNameA" placeholder="First Name" name="firstName"  defaultValue={updatedUser.firstName} onChange = {handleChange}/>
                <input type="text" className="lastNameA" placeholder="Last Name" name="lastName"  defaultValue={updatedUser.lastName} onChange = {handleChange}/>
                <br /><br />
                <input type = "text" className = "usernameA" placeholder = "Username" name = "username" defaultValue={updatedUser.username} onChange = {handleChange} />
                <input type="text" className="emailA" placeholder="Email" name="email" id="email" defaultValue={updatedUser.email} onChange = {handleChange}/>
                <input type="text" className="passwordA" placeholder="Password" name="password"  defaultValue={updatedUser.password} onChange = {handleChange}/>
                <input type="text" className="numberA" placeholder="Phone Number" name="phone" defaultValue={updatedUser.phone} onChange = {handleChange}/>
                <input type="text" className="ageA" placeholder="Age" name="age" defaultValue={updatedUser.age} onChange = {handleChange}/>

                
                
                <select name='genre' id='genre' className='selectAGenre' onClick={handleChange} defaultValue = {updatedUser.genre}>
                  <option value="Horror">Horror</option>
                  <option value="Drama">Drama</option>
                  <option value="Romance">Romance</option>
                  <option value="Detective">Detective</option>
                </select>
                
                <select name='gender' id = 'gender' className='selectAG' onClick={handleChange} defaultValue = {updatedUser.gender}>
                  <option value='Male' >Male</option>
                  <option value='Female'>Female</option>
                </select>
                <input type="number" className='accessKeyA' placeholder='Access Key' name='accessKey' defaultValue={updatedUser.accessKey} onChange={handleChange} />
                
          </form>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <button className='btnSave' onClick = {saveUpdatedUser}>
            Save Changes
          </button>
          <br />
          <br />
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <tr className='fix'>
            <th>

            </th>
            <th>
                Username
            </th>
            <th>
                Firstname
            </th>
            <th>
                Lastname
            </th>
            <th>
                Email
            </th>
            <th>
                Password
            </th>
            <th>
                Phone
            </th>
            <th>
                Age
            </th>
            <th>
                Genre
            </th>
            <th>
                Gender
            </th>
            <th>
                Access Key
            </th>
            <button className='btnAdd' onClick = {addUser}>Add User</button>
        </tr>
        
        {data.map((value, i) => {
        
        return (
            <tr key={i} className='fields'>
                <td hidden>{data[i]._id}</td>
                <td>{i + 1}</td>
                <td>{data[i].username}</td>
                <td>{data[i].firstName}</td>
                <td>{data[i].lastName}</td>
                <td>{data[i].email}</td>
                <td>{data[i].password}</td>
                <td>{data[i].phone}</td>
                <td>{data[i].age}</td>
                <td>{data[i].genre}</td>
                <td>{data[i].gender}</td>
                <td>{data[i].accessKey}</td>
                <td><input type={'submit'} value = 'Update' className='btnA' onClick = {() => updateUser(data[i])}/></td>
                <td><input type={'submit'} value = 'Delete' className='btnB' onClick={() => deleteUser(data[i]._id)}/></td>    
            </tr>
        )
    })}

    
        
        </Table>
     
    </div>
  )
}

export default Admin
