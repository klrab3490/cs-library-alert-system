'use client';

import { auth, db } from '@lib/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImUserPlus } from "react-icons/im";

const page = () => {
  const [data,setData] = useState({});
  const router = useRouter();

  const userInputs = [
    {id:"name", label:"Name : ", type:"text", placeholder:"Enter Full Name"}, 
    {id:"email", label:"Email ID : ", type:"email", placeholder:"Enter Email ID"}, 
    {id:"password", label:"Password : ", type:"password", placeholder:"Enter Password"}, 
    {id:"usertype", label:"User Type : ", type:"text", placeholder:"Admin / User"}, 
  ];

  const handleInputs = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setData({...data, [id]:value})
  };

  // console.log(data);

  const handleAdd = async(e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth,data.email,data.password);
      await setDoc(doc(db,"Users",result.user.uid),{
        ...data,
        timeStamp: serverTimestamp()
      });
      router.push("/admin/users");
    } catch (error) { 
      console.log(error);
    }
  }

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top flex">
          <h1 className='h1 justify-center text-center'> Add New User </h1>
        </div>
        <div className="bottom">
          <div className="left flex-center">
            <ImUserPlus size={100} className='' />
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