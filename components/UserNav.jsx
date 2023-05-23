import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/firebase-config";
import { useEffect } from "react";

const UserNav = () => {
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
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserNav;