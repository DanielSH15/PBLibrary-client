import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.css'

const Home = () => {
    const token = sessionStorage.getItem("token")
    const navigate = useNavigate()

    const handleClick = () =>{
        if(token){
          navigate('/library')
        } else {
          navigate('/login')
        }
    }
    
    return(
        <div className="windowH">
       <div className="insideH">
           <div className="titleH">
               <h1 style={{color: 'black'}}>BORROW</h1>
               <h1 style={{color: 'black'}}>A BOOK</h1>
           </div>
           <form>
               <button className="btnH" onClick = {handleClick}>
               <h2>Borrow</h2>
           </button>
           </form>
           
           <div className="imgContainerH">
               <div className="imgH"></div>
           </div>
       </div>

    </div>
    )
}

export default Home