"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { signOut } from "firebase/auth";
import { auth } from "@lib/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';

const Nav = () => {
  const router = useRouter();
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  // Firebase
  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };
  const[isLoggedIn,loading] = useAuthState(auth);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  })

  return (
    <nav className="flex-between w-full mb-3 pt-3">
      <Link href='/' className="flex gap-4 flex-center">
        <Image src="/assets/images/aces.svg" width={90} height={70} alt="logo" className="object-contain" />
        <p className="logo_text">CS Library Alert System</p>
      </Link>
      <div className="justify-left">
        <ul className='hidden sm:flex gap-4'>
        { isLoggedIn ? (
            <li className='logo_text hover:text-gray-600'>
              <Link href='/admin'> Admin-Panel </Link>
            </li>
          ) : (
            <li className='logo_text hover:text-gray-600'></li>
          ) }
          { isLoggedIn ? (
            <li className='logo_text hover:text-gray-600'>
              <Link href='/users'> User-Panel </Link>
            </li>
          ) : (
            <li className='logo_text hover:text-gray-600'>
              <Link href='/'> Home </Link>
            </li>
          ) }
          { isLoggedIn ? (
            <li className='logo_text hover:text-gray-600'>
              <button onClick={logout} className="outline rounded px-2" > LogOut </button>
            </li>
          ) : (
            <li className='logo_text bg-black text-gray-100 hover:bg-white'>
              <button onClick={() => router.push('/signin')} className="outline rounded px-2 text-white hover:text-black" > Login </button>
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
        { isLoggedIn ? (
            <li className='p-4 text-4xl hover:text-gray-600'>
              <Link href='/admin' onClick={handleNav}> Admin-Panel </Link>
            </li>
          ) : (
            <li className='p-4 text-4xl hover:text-gray-600'></li>
          ) }
          { isLoggedIn ? (
            <li className='p-4 text-4xl hover:text-gray-600'>
              <Link href='/users' onClick={handleNav}> User-Panel </Link>
            </li>
          ) : (
            <li className='p-4 text-4xl hover:text-gray-600'>
              <Link href='/'> Home </Link>
            </li>
          ) }
          { isLoggedIn ? (
            <li className='p-4 text-4xl hover:text-gray-600' onClick={handleNav}>
              <button onClick={logout} className="outline rounded px-2 py-1" > LogOut </button>
            </li>
          ) : (
            <li className='p-4 text-4xl hover:text-gray-600' onClick={handleNav}>
              <Link href={'/signin'} className="outline rounded px-2 py-1 bg-black hover:bg-white text-white hover:text-black" > Login </Link>
            </li>
          ) }
        </ul>
      </div>
    </nav>
  )
}

export default Nav; 