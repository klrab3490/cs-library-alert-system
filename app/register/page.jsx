'use client';

import React, { useState } from 'react';
import { auth } from '@lib/firebase.config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const page = () => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            router.push('/');
        })
        .catch((error) => {
            setError(true);
        })
    }
    
    return (
        <div className='login'>
            <form onSubmit={handleLogin}>
                <h3> Register With </h3>
                <div>
                    <h3>Email:</h3>
                    <input type="email" placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <h3>Password:</h3>
                    <input type="password" placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className='gap-2'>
                    <button type='submit' className=' bg-blue-600 text-white'> Register </button>
                    <button type='submit' className=' bg-blue-300 text-blue-950'>
                        <Link href={'/login'}> Login </Link>
                    </button>
                </div>
                {error && <span> User Already Exist </span>}
            </form>
        </div>
    )
}

export default page;