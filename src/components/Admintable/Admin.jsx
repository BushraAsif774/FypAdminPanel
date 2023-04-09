
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import axios from 'axios';

import "./Admin.scss";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [];

export default function Admin() {
  const [data, setData]=useState([]);

  const getData=()=>{
    axios.get("https://fyp-backend-gamma.vercel.app/v1/employee/get-admin")
    .then((res)=>{
      console.log("Data is : ", res.data);
      setData(res.data);

    })
    .catch((err)=>console.log(err))
  }

  useEffect(() => {
    getData();

  }, [])

  const onDelete=(id)=>{
    if (window.confirm("Are you sure you want to delete that user?")){

      axios.delete(`https://fyp-backend-gamma.vercel.app/v1/employee/${id}`)
      .then((res)=>{
        // console.log(data);
        // alert(res.data);
        // alert("User deleted Successfully")
        getData();
      })
  }
  }


  return (
    <div style={{padding:"2rem"}}>
       <div className="datatableTitle">
        <Link to="/admin/newadmin" className="link">
          Add New Admin
        </Link>
      </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className='table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Database Id</TableCell>
            <TableCell align="center">Firstname</TableCell>
            <TableCell align="center">Lastname</TableCell>
            <TableCell align="center">CNIC</TableCell>
            <TableCell align="center">Phone&nbsp;</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{row._id}</TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.cnic}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                  {/* <Link to={`/update/${item.id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link> */}

                  
                    <button className='deleteButton' onClick={()=>{onDelete(row._id)}}>Delete</button>

                    <Link to={`update/${row._id}`}>
                        <button className='viewButton'>Edit</button>
                    </Link>
                  
                  <Link to={`/singledriver/${row._id}`}>
                    <button className='viewButton'>View</button>
                  </Link>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
