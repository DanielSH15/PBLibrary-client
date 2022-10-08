import React, { useContext, useEffect, useState } from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './navElements'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import './index.css'


const Navbar = () => {
  const user = sessionStorage.getItem("token")
  const [role, setRole] = useState('')
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const[id, setId] = useState('')

  

  const logout = () =>{
    sessionStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate('/')
    window.location.reload()
  }

  const config = {
    headers: {
      'authorization': `Bearer ${JSON.parse(user)}`
    },
    params: {
      '_id': id
    }
  }

  
  const get = async() =>{
    if(user){
      await Axios.get('http://localhost:8000/read', config).then((response)=>{
      setUsername(response.data.username)
      setId(response.data.id)
      setRole(response.data.accessKey)
    })
    }
  }

useEffect(() =>{
  get()
})
  
if(role == 5){
  return(
    <Nav>
        <NavLink to = "/">
            <h1 style={{position: "absolute", left: "10%"}}>PBLibrary</h1>
        </NavLink>
        <Bars />
        <NavMenu>
            <NavLink>
                Hello, {username}
            </NavLink>
            <NavLink to="/about">
                About
            </NavLink>
            <NavLink to="/library">
                Library
            </NavLink>
            <NavLink to="/admin">
                Admin
            </NavLink>
            <NavLink to="/update">
                Update
            </NavLink>
        </NavMenu>
        <NavBtn>
        <NavBtnLink onClick={logout}>
                Logout
              </NavBtnLink>
        </NavBtn>
      </Nav>
  )
} 
  if (user){
    return(
      <Nav>
          <NavLink to = "/">
              <h1 style={{position: "absolute", left: "10%"}}>PBLibrary</h1>
          </NavLink>
          <Bars />
          <NavMenu>
              <NavLink>
                  Hello, {username}
              </NavLink>
              <NavLink to="/about">
                  About
              </NavLink>
              <NavLink to="/library">
                  Library
              </NavLink>
              <NavLink to="/update">
                Update
            </NavLink>
          </NavMenu>
          <NavBtn>
              <NavBtnLink onClick={logout}>
                Logout
              </NavBtnLink>
          </NavBtn>
        </Nav>
    )
  } else {
    return (
      <>
        <Nav>
          <NavLink to = "/">
              <h1 style={{position: "absolute", left: "10%"}}>PBLibrary</h1>
          </NavLink>
          <Bars />
          <NavMenu>
              <NavLink>
                  Hello, Guest
              </NavLink>
              <NavLink to="/about">
                  About
              </NavLink>
              <NavLink to="/registration">
                  Sign Up
              </NavLink>
          </NavMenu>
          <NavBtn>
              <NavBtnLink to="/login">
                  Login
              </NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    )
  }
  
}
  
export default Navbar