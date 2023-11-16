import React, { useState,useEffect } from 'react'
import { message, Table } from "antd";
import axios from "axios";
export default function ComplainList() {
    const [complains , setcomplain] = useState([])
    const getComplaints= async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/complaindata")
        if (res.data.success) {
          setcomplain(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        getComplaints();
    }, []);
      
    
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
      }, 
      
    ];
  
    return (
     <div>
        <h1>Complain</h1>
        <Table columns={columns} dataSource={complains} />
        </div>
    );
  };
