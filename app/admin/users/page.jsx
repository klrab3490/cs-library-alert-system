import Link from "next/link"

const page = () => {
  return (
    <div className="flex-col">
      {/* Nav */}
      <div className="w-full flex mb-3 pt-3">
        <ul className="hidden sm:flex gap-4">
          <li className="logo_text hover:text-gray-600">
            <Link href="/admin">
              Dashboard
            </Link>
          </li>
          <li className="logo_text hover:text-gray-600">
            <Link href="/admin/users">
              Users
            </Link>
          </li>
          <li className="logo_text hover:text-gray-600">
            <Link href="/admin/books">
              Books
            </Link>
          </li>
        </ul>
      </div>
      {/* Body */}
      <div className="">
        User Data Interface
      </div>
    </div>
  )
}

export default page;