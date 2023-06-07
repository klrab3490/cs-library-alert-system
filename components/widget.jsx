"use client";

import { AiOutlineUser } from "react-icons/ai";
import { TbBooks } from "react-icons/tb";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@lib/firebase.config";

const Widget = ( {type} ) => {
    const [userNo,setuserNo] = useState("");
    const [bookNo,setbookNo] = useState("");
    
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

        return () => {
            user();
            book();
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