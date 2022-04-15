import React from 'react'
import { useNavigate } from "react-router-dom";

//style
import styling from './Navbar.module.scss'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className={styling.navbar} onClick={() => navigate("/")}>
        <span className={styling.leftside}>UPayments Store</span>
        <span className={styling.rightside}>Register</span>
    </nav>
  )
}

export default Navbar