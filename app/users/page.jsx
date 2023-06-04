'use client';


import SearchTable from '@components/SearchTable';
import React from 'react'

const ClientProtectedPage = () => {
  const {data: session} = useSession({
    required: true,
  })
};


const page = () => {
  return (
    <div className='flex-center'>
      <SearchTable />
    </div>
  )
}

export default page