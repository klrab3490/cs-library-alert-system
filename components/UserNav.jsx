'use client';

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/firebase.config";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UserNav = () => {
    const router = useRouter();

    const[isLoggedIn,loading] = useAuthState(auth);
    useEffect(() => {
      if (!isLoggedIn) {
        router.push('/');
      }
    })
    return (
        <div>
            <div className="w-full flex mb-3 pt-3 flex-center">
                <ul className="hidden sm:flex gap-4">
                    <li className="logo_text hover:text-gray-600">
                        <Link href="/users" className="flex">
                            <MdDashboard className="icon"/>
                            Dashboard
                        </Link>
                    </li>
                    <li className="logo_text hover:text-gray-600">
                        <Link href={'/users/notification'} className="flex">
                            <IoMdNotifications className="icon" />
                            Notifications
                        </Link>
                    </li>
                    <li className="logo_text hover:text-gray-600">
                        <Link href={'/users/cart'} className="flex">
                            <AiOutlineShoppingCart className='icon' />
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full">
                <div className="w-full flex mb-3 pt-3 items-center justify-center">
                    <ul className="flex sm:hidden gap-4 font-satoshi font-semibold text-l text-black tracking-wide">
                        <li>
                            <center>
                                <Link href='/users'>
                                    <MdDashboard className="flex-col" />
                                    Dashboard
                                </Link> 
                            </center>
                        </li>
                        <li>
                            <center>
                                <Link href={'/users/notification'}>
                                    <IoMdNotifications className="flex-col" />
                                    Notification
                                </Link> 
                            </center>
                        </li>
                        <li>
                            <center>
                                <Link href={"/users/cart"}>
                                    <AiOutlineShoppingCart className="flex-col" />
                                    Cart
                                </Link> 
                            </center>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserNav;