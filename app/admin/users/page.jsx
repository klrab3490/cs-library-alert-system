import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { TbBooks } from "react-icons/tb";

const page = () => {
  return (
    <div className="">
      <div className="">
        {/* Nav */}
          <div className="w-full flex mb-3 pt-3 flex-center">
            <ul className="hidden sm:flex gap-4">
                <li className="logo_text hover:text-gray-600">
                  <Link href="/admin" className="flex">
                    <MdDashboard className="icon"/>
                    Dashboard
                  </Link>
                </li>
                <li className="logo_text hover:text-gray-600">
                  <Link href="/admin/users" className="flex">
                    <AiOutlineUser />
                    Users
                  </Link>
                </li>
                <li className="logo_text hover:text-gray-600">
                  <Link href="/admin/books" className="flex">
                    <TbBooks />
                    Books
                  </Link>
                </li>
            </ul>
          </div>
          <div className="w-full">
            <div className="w-full flex mb-3 pt-3 items-center justify-center">
              <ul className="flex sm:hidden gap-4 font-satoshi font-semibold text-l text-black tracking-wide">
                <li>
                  <center>
                    <Link href='/admin'>
                      <MdDashboard className="flex-col" />
                      Dashboard
                    </Link> 
                  </center>
                </li>
                <li>
                  <center>
                    <Link href='/admin/users'>
                      <AiOutlineUser className="flex-col" />
                      Users
                    </Link>
                  </center>
                </li>
                <li>
                  <center>
                    <Link href='/admin/books'>
                      <TbBooks className="flex-col" />
                      Books
                    </Link>
                  </center>
                </li>
              </ul>
            </div>
          </div>
      </div>
      {/* Body */}
      <div className="w-full flex-center">
        User Data Interface
      </div>
    </div>
  )
}

export default page;