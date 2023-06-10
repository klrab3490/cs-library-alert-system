'use client';

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
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
            <div className="w-full flex mb-2 pt-2 flex-center">
                <ul className="hidden sm:flex gap-4">
                    <li className="logo_text hover:text-gray-600">
                        <Link href="/users" className="flex">
                            <MdDashboard size={25} className="mr-1 inline-block"/>
                            Dashboard
                        </Link>
                    </li>
                    <li className="logo_text hover:text-gray-600">
                        <Link href={'/users/notification'} className="flex">
                            <IoMdNotifications size={25} className="mr-1 inline-block" />
                            Notifications
                        </Link>
                    </li>
                    <li className="logo_text hover:text-gray-600">
                        <Link href={'/users/wishlist'} className="flex">
                            <FaHeart size={23} className="mr-1 inline-block" />
                            Wishlist
                        </Link>
                    </li>
                    <li className="logo_text hover:text-gray-600">
                        <Link href={'/users/cart'} className="flex">
                            <AiOutlineShoppingCart size={25} className='mr-1 inline-block' />
                            Borrowed
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full">
                <div className="w-full flex mb-1 pt-1 items-center justify-center">
                    <ul className="flex sm:hidden gap-4 font-satoshi font-semibold text-l text-black tracking-wide">
                        <div className="flex-col p-1">
                            <li className="flex">
                                <center>
                                    <Link href='/users' className="p-1 inline-block self-center">
                                        <MdDashboard size={25} className="mr-1 inline-block" />
                                        Dashboard
                                    </Link> 
                                </center>
                            </li>
                            <li className="flex">
                                <center>
                                    <Link href={'/users/notification'} className="p-1 inline-block self-center">
                                        <IoMdNotifications size={25} className="mr-1 inline-block" />
                                        Notification
                                    </Link> 
                                </center>
                            </li>
                        </div>
                        <div className="flex-col p-1">
                            <li className="flex">
                                <center>
                                    <Link href={'/users/wishlist'} className="p-1 inline-block self-center text">
                                        <FaHeart size={25} className="mr-1 inline-block" />
                                        Wishlist
                                    </Link> 
                                </center>
                            </li>
                            <li className="flex">
                                <center>
                                    <Link href={"/users/cart"} className="p-1 inline-block self-center">
                                        <AiOutlineShoppingCart size={25} className="mr-1 inline-block" />
                                        Borrowed
                                    </Link> 
                                </center>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserNav;