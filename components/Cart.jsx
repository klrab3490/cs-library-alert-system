"use client";

import { auth, db } from "@lib/firebase.config";
import { DataGrid } from "@mui/x-data-grid";
import { onAuthStateChanged } from "firebase/auth";
import { collection,doc, getDoc, onSnapshot } from "firebase/firestore";
import { list } from "postcss";
import { useEffect, useState } from "react";


const Cart = () => {
    const [book, setBook] = useState([]);
    const [userID, setuserID] = useState('');
    const [user, setUser] = useState(null);

    useEffect( () => {
        // Userdata
        const userdata = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setuserID(user.uid);
            } else {
                setUser(null);
                setuserID(null);
            }
        });
        
        const cartData = onSnapshot(collection(db, "Cart",userID), (snapShot) => {
            const list = [];
            snapShot.docs.forEach(async docs => {
                const array = docs.data();
                for (let i=0; i<array.books.length; i++) {
                    console.log("Book ID ",i,":",array.books[i]);
                    await newFunction(array.books[i],list);
                }

                async function newFunction(id,list) {
                    const docRef = doc(db, "Books", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        list.push({
                            id: docSnap.data().id,
                            book: docSnap.data().book,
                            author: docSnap.data().author
                        });
                    } else {
                        console.log("No such document!");
                    }
                }
                setBook(list);
            });
        });

        
        return () => {
            userdata();
            cartData();
        }
    }, []);


    const cartColumn= [ 
        { field: "book", headerName:"Book Name", width: 350},
        { field: "author", headerName:"Author", width: 100},
    ];
    
    return (
        <div>
            <h1 className='font-satoshi font-semibold flex-center'> Borrowed Books </h1>
            <div className='flex-center'>
                {book.map((item) => (
                <div className="p-2">
                    <div key={item.id} className="flex-col">
                        <h1 className='font-satoshi font-semibold'> {item.book} </h1>
                        <h1 className='font-satoshi font-semibold'> {item.author} </h1>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
};

export default Cart;