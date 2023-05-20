"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Nav = () => {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleNav = () => {
    setNav(!nav);
  };

  useEffect( () => {
    setIsLoggedIn(true);
  })

  return (
    <nav className="flex-between w-full mb-3 pt-3">
      <Link href='/' className="flex gap-4 flex-center">
        <Image src="/assets/images/aces.svg" width={90} height={70} alt="logo" className="object-contain" />
        <p className="logo_text">CS Library Alert System</p>
      </Link>
      <div className="justify-left">
        <ul className='hidden sm:flex gap-4'>
          <li className='logo_text hover:text-gray-600'>
            <Link href='/'> Home Page </Link>
          </li>
          { isLoggedIn ? (
            <li className='logo_text hover:text-gray-600'>
              <Link href='/signin'> Profile </Link>
            </li>
          ) : (
            <li className='logo_text hover:text-gray-600'>
              <Link href='/signin'> Sign In </Link>
            </li>
          ) }
          { isLoggedIn ? (
            <li className='logo_text hover:text-gray-600'>
              <Link href='/'> Logout </Link>
            </li>
          ) : (
            <li className='logo_text hover:text-gray-600'>
              <Link href='/signup'> Sign Up </Link>
            </li>
          ) }
        </ul>
      </div>

      {/* Mobile Button */}
      <div onClick={handleNav} className='block sm:hidden z-10 hover:text-gray-600'>
        { nav 
          ? <AiOutlineClose size={20} /> 
          : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <div className={
        nav 
          ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300' 
          : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300'} >
        <ul className='sm:flex font-satoshi font-semibold'>
          <li className='p-4 text-4xl hover:text-gray-600'>
            <Link href='/' onClick={handleNav}> Home </Link>
          </li>
          <li className='p-4 text-4xl hover:text-gray-600'>
            <Link href='/signin' onClick={handleNav}> Sign In </Link>
          </li>
          <li className='p-4 text-4xl hover:text-gray-600'>
            <Link href='/signup' onClick={handleNav}> Sign Up </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav; 