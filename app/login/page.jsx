'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from '@lib/firebase.config';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { collection, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'next-auth/react';

const page = () => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth,email,password)
            .then(async (userCredential) => {
                    const user = userCredential.user;
                    const docRef = doc(db,"Users",user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        const userType = userData.usertype;
                        if (userType=="Admin") {
                            router.push('/admin');
                        }
                        else if (userType=="User") {
                            router.push('/users');
                        } else {
                            await signOut(auth);
                            router.push('/register');
                        }
                    }
            })
            .catch((error) => {
                setError(true);
            });
                        
        } catch (error) {
            console.log("try error")
        }
        
    }
    const loginwithGoogle = async() => {
        await signInWithPopup(auth,provider)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const docRef = doc(db,"Users",user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                const userType = userData.usertype;
                if (userType=="Admin") {
                    router.push('/admin');
                }
                else if (userType=="User") {
                    router.push('/users');
                } else {
                    await signOut(auth);
                    router.push('/register');
                }
            }
        })
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
                </div>
                {error && <span> Wrong Email Or Password </span>}
            </form>
        </div>
    )
}

export default page