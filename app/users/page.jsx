import React from 'react'

const ClientProtectedPage = () => {
  const {data: session} = useSession({
    required: true,
  })
};


const page = () => {
  return (
    <div >
      <h1 className='font-satoshi font-semibold flex-center'> User Dashboard </h1>
    </div>
  )
}

export default page