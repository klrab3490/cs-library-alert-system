"use client";

import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { TbBooks } from "react-icons/tb";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@lib/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Loading2 from "./loading";

const Widget = ( {type} ) => {
    const [userNo,setuserNo] = useState("");
    const [bookNo,setbookNo] = useState("");
    const [userID,setuserID] = useState("");
    const [wishlistBookNo,setwishlistBookNo] = useState("");
    const [borrowedBookNo,setborrowedBookNo] = useState("");
    const [loading,setLoading] = useState(true);
    
    useEffect(() => {
        const user = onSnapshot(collection(db,"Users"),(snapShot1) => {
            let list1 = [];
            snapShot1.docs.forEach(doc => {
                list1.push({id:doc.id, ...doc.data()});
            });
            setuserNo(list1.length);
        },(error) => {console.log(error)});

        const book = onSnapshot(collection(db,"Books"),(snapShot2) => {
            let list2 = [];
            snapShot2.docs.forEach(doc => {
                list2.push({id:doc.id, ...doc.data()});
            });
            setbookNo(list2.length);
        },(error) => {console.log(error)});

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

        const borrowedBook = onSnapshot(collection(db,"Cart",userID),(snapShot3) => {
            snapShot3.docs.forEach((doc) => {
                const arr = doc.data();
                const b=arr.books.length;
                setborrowedBookNo(b);
            });
        },(error) => {console.log(error)});

        return () => {
            unsubscribeUser();
            user();
            book();
            wishlistBook();
            borrowedBook();
        }
    },[]);

    let data;

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                link: (<Link href='/admin/users' className="hover:text-blue-500">See all users</Link>),
                amount: userNo,
                icon: ( <AiOutlineUser className="icon" size={40} /> ),
            };
            break;
        case "books":
            data = {
                title: "BOOKS",
                link: (<Link href='/admin/books' className="hover:text-blue-500">See all books</Link>),
                amount: bookNo,
                icon: ( <TbBooks className="icon" size={40} /> ),
            };
            break;
        case "borrowed":
            data = {
                title: "Borrowed Books",
                link: (<Link href='/users/cart' className="hover:text-blue-500">See all books</Link>),
                amount: borrowedBookNo,
                icon: ( <AiOutlineShoppingCart className="icon" size={40} /> ),
            };
            break;
        case "wishlist":
            data = {
                title: "Wishlist Books",
                link: (<Link href='/users/wishlist' className="hover:text-blue-500">See all books</Link>),
                amount: wishlistBookNo,
                icon: ( <MdOutlineBookmarkAdd className="icon" size={40} /> ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title"> {data.title} </span>
                <span className="counter">{data.amount}</span>
                <span className="link"> {data.link} </span>
            </div>
            <div className="right">
                <span className="title"></span>
                <span className="counter">
                    {data.icon}
                </span>
            </div>
        </div>
    );
};

export default Widget;