"use client";

import React, { useState } from 'react';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from '@lib/firebase.config';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { doc, getDoc } from 'firebase/firestore';
import Loader from '@components/loading';   

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New state for tracking loading state

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true
        try {
            setPersistence(auth, browserSessionPersistence)
                .then(async () => {
                    return await signInWithEmailAndPassword(auth, email, password)
                        .then(async (userCredential) => {
                            const user = userCredential.user;
                            const docRef = doc(db, "Users", user.uid);
                            const docSnap = await getDoc(docRef);
                            if (docSnap.exists()) {
                                const userData = docSnap.data();
                                const userType = userData.usertype;
                                if (userType === "Admin") {
                                    router.push('/admin');
                                } else if (userType === "User") {
                                    router.push('/users');
                                }
                                setIsLoggedIn(true);
                            }
                        })
                        .catch(async (error) => {
                            setError(true);
                        })
                        .finally(() => {
                            setIsLoading(false); // Set loading state to false after login attempt
                        });
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log("try error");
        }
    };

    const loginwithGoogle = async () => {
        setIsLoading(true); // Set loading state to true
        setPersistence(auth, browserSessionPersistence)
            .then(async () => {
                return await signInWithPopup(auth, provider)
                    .then(async (userCredential) => {
                        const user = userCredential.user;
                        const docRef = doc(db, "Users", user.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            const userType = userData.usertype;
                            setUserType(userType);
                            if (userType === "Admin") {
                                router.push('/admin');
                            } else if (userType === "User") {
                                router.push('/users');
                            }
                            setIsLoggedIn(true);
                        }
                    })
                    .catch(async (error) => {
                        setError(true);
                    })
                    .finally(() => {
                        setIsLoading(false); // Set loading state to false after login attempt
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Conditional rendering based on the login and loading states
    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        );
    } else if (isLoggedIn) {
        return (
            <div>
                <Loader />
            </div>
        );
    } else {
        return (
            <div className='login'>
                <div className="signwith">
                    <h3> Sign in With </h3>
                    <FcGoogle onClick={loginwithGoogle} size={50} className='icon' />
                    <h3> Or With Email & Password </h3>
                </div>
                <form onSubmit={handleLogin}>
                    <div>
                        <h3 className='mr-1'>Email : </h3>
                        <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <h3 className='mr-1'>Password : </h3>
                        <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='gap-2'>
                        <button type='submit' className='bg-blue-600 text-white'> Login </button>
                    </div>
                    {error && <span>Wrong Email Or Password</span>}
                </form>
            </div>
        );
    }
};

export default LoginPage;