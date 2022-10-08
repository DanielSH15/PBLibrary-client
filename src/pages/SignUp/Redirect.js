import React from 'react'
import styled from "styled-components";
import { NavLink as Link} from 'react-router-dom';
import {FaBars} from 'react-icons/fa'

export const BtnLink = styled(Link)`
@import url(https://fonts.googleapis.com/css?family=Poppins);
border-radius: 20px;
background-color: #256ce1;
height: 7%;
width: 15%;
border: none;
font-family: 'Poppins', sans-serif;
cursor: pointer;
position: absolute;
left: 40%;
top: 90%;
font-size: 23px;
text-decoration: none;
color: #fff;
text-align: center;
padding: 10px 22px;


  &:hover{
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;