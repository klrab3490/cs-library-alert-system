'use client';

import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { collection, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@lib/firebase.config';
import { useEffect } from 'react';

const SearchTable = () => {
    
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    const userColumns = [
        { field: "book", headerName:"Book Name", width: 350},
        { field: "author", headerName:"Author", width: 300},
    ];

    const addcart = async(data) => {
        const [value,setValue] = useState({});
        setValue(data)
        await setDoc(doc(db,"Cart",uid),{
            ...value,
            timeStamp: serverTimestamp()
        });
    }
   
    const actionColumn = [
        {
            field: "action",
            headerName: "Add To",
            width: 170,
            renderCell: (params) => {
                return (
                <div className='self-center flex items-center gap-2 font-bold'>
                    <button className='bg-white border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:outline-cyan-500 rounded border-2 px-3 py-1' type='button'> Whislist </button>
                    <button className='bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:outline-red-500 rounded border-2 px-3 py-1' type='button' onClick={addcart(params.row.data())}> Cart </button>
                </div>
                );
            },
        },
    ];

    useEffect(() => {
        const unsub = onSnapshot(collection(db,"Books"),(snapShot) => {
            let list = [];
            snapShot.docs.forEach(doc => {
                list.push({id:doc.id, ...doc.data()});
            });
            setData(list);
        },
        (error) => {
            console.log(error);
        });
    
        return () => {
            unsub();
        }
      },[]);

    return (
        <div className="datatable py-3">
            <div className="justify-center flex mb-3">
                <h1 className='self-center text-xl font-semibold'>User Dashboard</h1>
            </div>
            <div className="justify-center flex mb-3">
                <div className="flex self-center text-xl font-semibold">
                    <label className='mr-1'>Book Name:</label>
                    <input type="text" className='ml-1 bg-transparent outline-none border-collapse' placeholder='Enter Book Name' onChange={e=> setSearch(e.target.value)} />
                </div>
            </div>
            <div className="" >
                <DataGrid 
                rows={data}
                sx={{ width: { xs:320, sm:600, md:700, lg:910, xl:910,} }}
                columns={userColumns.concat(actionColumn)}
                initialState={{
                  pagination: {
                    paginationModel: { page:0, pageSize:5},
                  },
                }}
                pageSizeOptions={[5,10,15]}
                checkboxSelection />
            </div>
        </div>
    );
};

export default SearchTable;
