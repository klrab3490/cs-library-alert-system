import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { TbBooks } from "react-icons/tb";


const page = () => {
  return (
    <div className="flex-col">
      {/* Nav */}
      <div className="w-full flex mb-3 pt-3">
        <ul className="hidden sm:flex gap-4">
          <li className="logo_text hover:text-gray-600">
            <Link href="/admin" className="flex justify-center">
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
      {/* Body */}
      <div className="">

      </div>
    </div>
  )
}

export default page;