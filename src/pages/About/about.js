import React from 'react'
import './about.css'

const About = () => {
  return (
    <div className='container'>
      <h1 style={{textAlign: "center", fontSize: "45px", fontWeight: "600"}}>WELCOME!</h1>
      <p style={{position: 'absolute', left: '10%'}}>
            This is an online library where you can find books that you like.
            <br />
            This is completely free, borrow any book you'd like!
            <br />
            You can also find books adapted to your favorite genre!
            <br />
            Have fun using PBLibrary, we hope you will have fun experience!
      </p>
    </div>
  )
}

export default About