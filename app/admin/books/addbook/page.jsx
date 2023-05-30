'use client';

import { db } from '@lib/firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { ImBooks } from "react-icons/im";

const page = () => {
  const router = useRouter();
  const handleAdd = async(e) => {
    e.preventDefault();
    await addDoc(collection(db,"Books"),{
      book: "ABC",
      author: "abc",
      available: 1,
      total: 3
    });
    router.push("/admin/books");
  }

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
            <form onSubmit={handleAdd}>
              <div className="form">
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
              </div>
              <button type='submit' className='button' > Send </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;