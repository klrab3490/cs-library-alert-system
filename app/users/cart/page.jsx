'use client';

import Cart from "@components/Cart";
import { auth, db } from '@lib/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const page = () => {
    const [userID,setuserID] = useState("");
    const [borrowedBookNo,setborrowedBookNo] = useState("");

    useEffect(() => {
        const unsubscribeUser = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setuserID(user.uid);
            } else {
                setuserID("");
            }
        });

        const borrowedBook = onSnapshot(collection(db,"Cart",userID),(snapShot3) => {
            snapShot3.docs.forEach((doc) => {
                const arr = doc.data();
                const b=arr.books.length;
                setborrowedBookNo(b);
            });
        },(error) => {console.log(error)});

        return () => {          
            unsubscribeUser();
            borrowedBook();
        }
    },[]);
    
    return (
        <div className="flex-center">
            {borrowedBookNo === 0 ? (alert("No books in cart")) : (null)}
            <Cart />
        </div>
    )
};

export default page;