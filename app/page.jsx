"use client";

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@lib/firebase.config';
import AdminNav from '@components/AdminNav';
import UserNav from '@components/UserNav';

const Home = () => {
    const [getUserType, setUserType] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'Users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserType(docSnap.data().usertype);
                } else {
                    setUserType(null);
                }
            } else {
                setUserType(null);
            }
        });

        return () => unsub();
    }, []);

    return (
        <section className="w-full flex-center flex-col">
            {getUserType === 'Admin' ? (
                <AdminNav />
            ) : getUserType === 'User' ? (
                <UserNav />
            ) : (
                <></>
            )}
            <h1 className="head_text text-center">
                CS Department Library
                <br />
                <span className="orange_gradient text-center"> Library Alert System </span>
            </h1>
            <p className="desc text-center">
                Basically, this system is introduced so that all the students could search for the needed books in the library and take them for reference. If a book is found but not in the library, we can add it to the cart for notification and then collect it when it's available in the library. It also informs us about our book return dates as well.
            </p>
        </section>
    );
};

export default Home;
