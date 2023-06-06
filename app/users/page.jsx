'use client';


import SearchTableBook from '@components/SearchTableBook';
import React from 'react'

const ClientProtectedPage = () => {
  const {data: session} = useSession({
    required: true,
  })
};


const page = () => {
  return (
    <div className='flex-center'>
      <SearchTableBook />
    </div>
  )
}

export default page