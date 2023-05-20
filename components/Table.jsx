'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Table2 = ({ type }) => {
    let tableheader;
    let rows;

    switch (type) {
        case "user":
            function createData1( id, name, status, settig ) {
                return { id, name, status, settig };
            };
            tableheader = {
                col1: "User ID",
                col2: "User Name",
                col3: "Status",
                col4: "Settings",
            };
            rows = [
                createData1(1,'Frozen yoghurt', 159, 6.0),
                createData1(2,'Ice cream sandwich', 237, 9.0),
                createData1(3,'Eclair', 262, 16.0),
                createData1(4,'Cupcake', 305, 3.7),
                createData1(5,'Gingerbread', 356, 3.9),
                createData1(6,'Sandwitch', 356, 3.9),
                createData1(7,'Bread', 356, 3.9),
                createData1(8,'Samuuna', 356, 3.9),
            ];
            break;
        case "books":
            function createData(id,name,status,settig ) {
                return { id ,name, status, settig };
            };
            tableheader = {
                col1: "Book ID",
                col2: "Book Name",
                col3: "Quantity",
                col4: "Settings",
            };
            rows = [
                createData(1,"A",5,10),
                createData(2,"AB",15,20),
                createData(3,"ABC",25,30),
                createData(4,"ABCD",35,40),
                createData(5,"ABCDE",0,50),
            ];
            break;
        default:
            break;
    }

  return (
    <TableContainer className='font-satoshi'>
      <Table sx={{ width: { xs:100, sm:600, md:600, lg:700, xl:900,} }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> {tableheader.col1} </TableCell>
            <TableCell> {tableheader.col2} </TableCell>
            <TableCell align='center'> {tableheader.col3} </TableCell>
            <TableCell align='center'> {tableheader.col4} </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={rows.id}>
              <TableCell>{row.id}.</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align='center'>{row.status}</TableCell>
              <TableCell align='center'>{row.settig}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Table2;
