'use client';

import * as React from 'react';
import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const TableBook = () => {
  
    const userColumns = [
      { field: "id", headerName:"Book ID", width: 80 },
      { field: "name", headerName:"Book Name", width: 150},
      { field: "status", headerName:"Available", width: 100},
      { field: "settig", headerName:"Total Quantity", width: 110},
    ];

    const rows = [
      {id:1, name:"A", status:5, settig:10 },
      {id:2, name:"Aa", status:15, settig:20 },
      {id:3, name:"AB", status:25, settig:30 },
      {id:4, name:"Ab", status:35, settig:40 },
      {id:5, name:"AC", status:45, settig:50 },
      {id:6, name:"Ac", status:55, settig:60 },
      {id:7, name:"AD", status:65, settig:70 },
      {id:8, name:"Ad", status:75, settig:80 },
      {id:9, name:"AE", status:85, settig:90 },
      {id:10, name:"Ae", status:95, settig:100 },
      {id:11, name:"AF", status:105, settig:110 },
      {id:12, name:"Af", status:115, settig:120 },
      {id:13, name:"Ae", status:125, settig:130 },
      {id:14, name:"AG", status:135, settig:140 },
      {id:15, name:"Ag", status:145, settig:150 },
    ];
  

  const [data, setData] = useState(rows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className='self-center flex items-center gap-2 font-bold'>
            <button className='bg-white border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:outline-cyan-500 rounded border-2 px-3 py-1' type='button'> <Link href={'/admin/books/${params.row.id}'}> View </Link> </button>
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
          sx={{ width: { xs:320, sm:600, md:600, lg:700, xl:900,} }}
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
