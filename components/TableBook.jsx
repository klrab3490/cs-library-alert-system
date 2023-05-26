'use client';

import * as React from 'react';
import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const TableBook = () => {
  
    const userColumns = [
      { field: "id", headerName:"Book ID", width: 70 },
      { field: "name", headerName:"Book Name", width: 230},
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
    ];
  

  const [data, setData] = useState(rows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className='flex justify-between'>
            <Link href={'/admin/books/${params.row.id}'}> View </Link>
            <button className='' type='button' onClick={() => handleDelete(params.row.id)}> Delete </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle flex">
        Book Data
        <button type='button' className="mr-10"><Link href={'/admin/books/addbook'}> Add New Book </Link></button>
      </div>
      <DataGrid className='datagrid' rows={data} columns={userColumns.concat(actionColumn)} pageSize={9} rowsPerPageOptions={[9]} checkboxSelection/>
    </div>
  );
};

export default TableBook;
