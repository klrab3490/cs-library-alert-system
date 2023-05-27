'use client';

import * as React from 'react';
import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const TableUser = () => {
  
    const userColumns = [
      { field: "id", headerName:"User ID", width: 80 },
      { field: "name", headerName:"User Name", width: 150},
    ];

    const rows = [
      {id:1, name:"A" },
      {id:2, name:"Aa" },
      {id:3, name:"AB" },
      {id:4, name:"Ab" },
      {id:5, name:"AC" },
      {id:6, name:"Ac" },
      {id:7, name:"AD" },
      {id:8, name:"Ad" },
      {id:9, name:"AE" },
      {id:10, name:"Ae" },
      {id:11, name:"AF" },
      {id:12, name:"Af" },
      {id:13, name:"Ae" },
      {id:14, name:"AG" },
      {id:15, name:"Ag" },
    ];

  const [data, setData] = useState(rows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className='self-center flex items-center gap-2 font-bold'>
            <button className='items-center bg-white border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover:outline-green-500 rounded border-2 px-3 py-1' type='button'> Status </button>
          </div>
        );
      },
    },
    {
      field: "settings",
      headerName: "Settings",
      width: 150,
      renderCell: (params) => {
        return (
          <div className='self-center flex items-center gap-2 font-bold'>
            <button className='bg-white border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:outline-cyan-500 rounded border-2 px-3 py-1' type='button'> <Link href={'/admin/users/${params.row.id}'}> View </Link> </button>
            <button className='bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:outline-red-500 rounded border-2 px-3 py-1' type='button' onClick={() => handleDelete(params.row.id)}> Delete </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable py-3">
      <div className="justify-between flex mb-3">
        <div className="self-center text-xl font-semibold">User Data</div>
        <button type='button' className='self-center bg-white font-bold border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:outline-cyan-500 rounded border-2 px-3 py-1'><Link href={'/admin/users/adduser'}> Add New User </Link></button>
      </div>
      <div className="" >
        <DataGrid 
          rows={data}
          sx={{ width: { xs:320, sm:600, md:600, lg:600, xl:600,} }}
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

export default TableUser;