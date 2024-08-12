import React from 'react'
import tufSvg from '../assets/tuf-circle.svg';
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  return (
    <div >
        <div className='flex justify-between items-center'>
        <img src={tufSvg} alt="TUF Logo" />
        <button><FaRegUser size={30}/></button>
        </div>
    </div>
  )
}

export default Header