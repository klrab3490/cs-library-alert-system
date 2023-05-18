"use client";

import { useState } from "react";
// import { auth } from '../../config/firebase';
// import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

const page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className=" align-middle justify-center p-5 mb-5">
      <h1 className="head_text">
        <span className=" orange_gradient text-center"> Login </span>
      </h1>
      <div className="form mt-5">
        <form action="">
          <div className="input">
            <h3>Email ID: </h3>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input">
            <h3>Password : </h3>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          
        </form>
      </div>
      <div className="bottom">
        <div className="button">
          <Link href="/admin">
            <button type="submit">Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page