import React from 'react'
import tufSvg from '../assets/tuf-circle.svg';
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div >
        <div className='flex justify-between items-center'>
        <img src={tufSvg} alt="TUF Logo" />
        <Link to="/admin"><button><FaRegUser size={30}/></button></Link>
        </div>
    </div>
  )
}

export default Header