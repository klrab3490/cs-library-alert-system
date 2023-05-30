'use client';

import { db } from '@lib/firebase.config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImBooks } from "react-icons/im";

const page = () => {
  const [data,setData] = useState({});
  const router = useRouter();
  
  const userInputs = [
    {id:"book", label:"Book Name : ", type:"text", placeholder:"Enter Book Name"}, 
    {id:"author", label:"Author's Name : ", type:"text", placeholder:"Enter Author's Name"}, 
    {id:"available", label:"Available Book Number : ", type:"text", placeholder:"Enter Available Book Number"}, 
    {id:"total", label:"Total Number Of Books : ", type:"text", placeholder:"Enter Total Number Of This Books"}, 
  ];

  const handleInputs = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setData({...data, [id]:value})
  };

  const handleAdd = async() => {
    try {
      await addDoc(collection(db,"Books"),{
        ...data,
        timeStamp: serverTimestamp()
      });
    } catch (error) { console.log(error);}
    router.push("/admin/books");
  }

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top flex">
          <h1 className='h1 justify-center'> Add New Book </h1>
        </div>
        <div className="bottom">
          <div className="left flex-center">
            <ImBooks size={150} className='' />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="form">
                {userInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label className='label'>{input.label}</label>
                    <input className='input' id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInputs} />
                </div>
                ))}
              </div>
              <div className="p-2 flex-center">
                <button type='submit' className='button' > Send </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;