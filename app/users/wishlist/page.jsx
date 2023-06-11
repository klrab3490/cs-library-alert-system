'use client';

import Wishlist from '@components/Wishlist';
import { auth, db } from '@lib/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const page = () => {
    const [userID,setuserID] = useState("");
    const [wishlistBookNo,setwishlistBookNo] = useState("");

    useEffect(() => {
        const unsubscribeUser = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setuserID(user.uid);
            } else {
                setuserID("");
            }
        });

        const wishlistBook = onSnapshot(collection(db,"Wishlist",userID),(snapShot3) => {
            snapShot3.docs.forEach((doc) => {
                const array = doc.data();
                const a=array.books.length;
                setwishlistBookNo(a);
            });
        },(error) => {console.log(error)});

        return () => {
            unsubscribeUser();
            wishlistBook();
        }
    },[]);


    return (
        <div className='flex-center'>
            {wishlistBookNo === 0 ? (alert("No books in wishlist")) : (null)}
            <Wishlist />
        </div>
    )
};

export default page;