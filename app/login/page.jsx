'use client';

import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from '@lib/firebase.config';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

const page = () => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            router.push('/');
        })
        .catch((error) => {
            setError(true);
        })
    }
    const loginwithGoogle = async() => {
        await signInWithPopup(auth,provider);
        router.push('/');
    }

    return (
        <div className='login'>
            <div className="signwith">
                <h3> Sigin With </h3>
                <FcGoogle onClick={loginwithGoogle} size={50} className='icon' />
                <h3> Or With Email & Password </h3>
            </div>
            <form onSubmit={handleLogin}>
                <div>
                    <h3>Email:</h3>
                    <input type="email" placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <h3>Password:</h3>
                    <input type="password" placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className='gap-2'>
                    <button type='submit' className=' bg-blue-600 text-white'> Login </button>
                    <button type='submit' className=' bg-blue-300  text-blue-950'>
                        <Link href={'/register'}> Register </Link>
                    </button>
                </div>
                {error && <span> Wrong Email Or Password </span>}
            </form>
        </div>
    )
}

export default page