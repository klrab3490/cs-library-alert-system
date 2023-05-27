'use client'

import Widget from "@components/widget";
import { useSession } from "next-auth/react";

const ClientProtectedPage = () => {
  const {data: session} = useSession({
    required: true,
  })
};

const page = () => {
  return (
    <div className="">
      {/* Body */}
      <div className="w-full">
        <div className="gap-4 sm:flex">
          <Widget type="user" />
          <Widget type="books" />
        </div>
      </div>
    </div>
  )
};

export default page;