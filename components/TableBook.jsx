'use client';

import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@lib/firebase.config';
import { useEffect } from 'react';

const TableBook = () => {
  const [data, setData] = useState([]);

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

  const userColumns = [
    { field: "book", headerName:"Book Name", width: 350},
    { field: "author", headerName:"Author", width: 100},
    { field: "total", headerName:"Available Book", width: 110},
    { field: "total", headerName:"Total Book Number", width: 150},
  ];

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db,"Books",id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className='self-center flex items-center gap-2 font-bold'>
            <button className='bg-white border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:outline-cyan-500 rounded border-2 px-3 py-1' type='button'> <Link href={`/admin/books/${params.row.id}`}> Edit </Link> </button>
            <button className='bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:outline-red-500 rounded border-2 px-3 py-1' type='button' onClick={() => handleDelete(params.row.id)}> Delete </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable py-3">
      <div className="justify-between flex mb-3">
        <div className="self-center text-xl font-semibold">Book Data</div>
        <button type='button' className='self-center bg-white font-bold border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:outline-cyan-500 rounded border-2 px-3 py-1'><Link href={'/admin/books/addbook'}> Add New Book </Link></button>
      </div>
      <div className="" >
        <DataGrid 
          rows={data}
          sx={{ width: { xs:320, sm:600, md:700, lg:930, xl:950,} }}
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

export default TableBook;
