import React from 'react'
import './Home.css';
import { IoArrowBackOutline } from "react-icons/io5";
import { Button } from 'react-bootstrap';
const Home = () => {
  return (
    <div
      className="container-fluid bg-image home-bg"
    >
      <div className="computer-home">
        <h1>Computer Engineering</h1>
        <p>142,765 Computer Engineers follow this</p>
      </div>
      <div className='join-group'>
        <div className='back-icon'>
          <IoArrowBackOutline style={{ fontSize: '34px', color: "#ffffff"}} />
        </div>
        <div className="group-join">
        <Button variant="outline-light" style={{ fontSize: '12px'}}>Join Group</Button>
        </div>
      </div>
    </div>
  )
}

export default Home