"use client";

import { auth, db } from "@lib/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Cart = () => {
    const [books, setBooks] = useState([]);
    const [userID, setUserID] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribeUser = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setUserID(user.uid);
            } else {
                setUser(null);
                setUserID(null);
            }
        });

        const unsubscribeCart = onSnapshot(collection(db, "Cart", userID), (snapshot) => {
            const list = [];
            snapshot.docs.forEach(async (docs) => {
                const array = docs.data();
                const a=array.books.length;
                for (let i = 0; i < a; i++) {
                    await fetchBookData(array.books[i], list);
                }
                setBooks(list);
            });
        });

        return () => {
            unsubscribeUser();
            unsubscribeCart();
        };
    }, []);

    const fetchBookData = async (id, list) => {
        const docRef = doc(db, "Books", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const bookData = {
                id: id,
                book: docSnap.data().book,
                author: docSnap.data().author
            };
            list.push(bookData);
        } else {
            console.log("No such document!");
        }
    };

    const handleReturn = async (id) => {
        const docSnap1 = await getDoc(doc(db, "Books", id));
        if (docSnap1.exists()) {
            await updateDoc(doc(db, "Books", id), {
                borrowedby: docSnap1.data().borrowedby.filter((item) => item !== userID),
                available: parseInt(docSnap1.data().available + 1)
            });
        } else {
            console.log("No such document!");
        }

        const docRef = doc(db, "Cart", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef,{
                books: docSnap.data().books.filter((item) => item !== id),
            });
        } else {
            console.log("No such document!");
        }

    };

    return (
        <div className="">
            <h1 className="flex-center font-satoshi font-semibold text-2xl">Borrowed Books</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {books.map((item) => (
                    <div key={item.id} className="p-4 bg-white shadow-md rounded">
                        <h1 className="text-xl font-satoshi font-semibold">{item.book}</h1>
                        <h1 className="text-gray-600">{item.author}</h1>
                        <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={() => handleReturn(item.id)}>Return</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;    