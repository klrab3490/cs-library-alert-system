import React from 'react';
import { getUserType } from './login/page';
import AdminNav from '@components/AdminNav';
import UserNav from '@components/UserNav';

const Home = () => {
    return (
      <section className="w-full flex-center flex-col">
        {/* {getUserType === "Admin" ? (
          <AdminNav />
        ) : getUserType === "Users" ? (
          <UserNav />
        ) : (
          <></>
        )} */}
        <h1 className="head_text text-center ">
          CS Department Library
          <br />
          <span className="orange_gradient text-center"> Library Alert System </span>
        </h1>
        <p className='desc text-center'>
          Basically this system is introducted so that all the studetns could search for the needed books in the 
          libarray and take it for reference. If a book is found but not in library we can add it to the cart for 
          notification and then collect it when, its available in libarary and also inform us about our book return dates as well.
        </p>
      </section>
    )
}

export default Home;