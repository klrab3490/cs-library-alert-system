import React from 'react';
import { ImBooks } from "react-icons/im";

const page = () => {
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top flex">
          <h1 className='h1 justify-center'> Add New User </h1>
        </div>
        <div className="bottom">
          <div className="left flex-center">
            <ImBooks size={150} className='' />
          </div>
          <div className="right">
            <form className='form'>
              <div className="formInput">
                <label className='label'> Book Name : </label>
                <input className='input' type="text" placeholder='Enter Book Name' />
              </div>
              <div className="formInput">
                <label className='label'> Author's Name : </label>
                <input className='input' type="name" placeholder="Enter Author's Name" />
              </div>
              <div className="formInput">
                <label className='label'> Total Copies : </label>
                <input className='input' type="text" placeholder='Enter Quantity' />
              </div>
              <div className="formInput">
                <label className='label'> Available Copies  : </label>
                <input className='input' type="text" placeholder='Enter Quantity' />
              </div>
            </form>
            <div className="flex-center">
              <button className='button' > Send </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;