"use client";

import React from "react";
import { auth,provider } from "@lib/firebase-config";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  // Firebase
  const signIn = async () => {
    const result = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        console.log(error);
      })
  };
  const loginwithGoogle = async () => {
    await signInWithPopup(auth,provider);
  };
  
  const [user,loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  },[user]);

  // user enter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className=" align-middle justify-center p-5 mb-5">
      <h1 className="head_text">
        <span className=" orange_gradient text-center"> Login </span>
      </h1>
      <div className="form mt-5">
        <div className="flex-center flex-col">
          <h3>Sign In With</h3>
          <FcGoogle onClick={loginwithGoogle} /> 
        </div>
        <form>
          <div className="input">
            <h3>Email ID: </h3>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input">
            <h3>Password : </h3>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="justify-items-between p-5">
            <button type="submit" onClick={signIn} className="outline rounded px-2 py-1 bg-black hover:bg-white text-white hover:text-black" > Login</button>
            <Link href={'/signup'} className="outline rounded px-2 py-1 bg-black hover:bg-white text-white hover:text-black" > Register </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page