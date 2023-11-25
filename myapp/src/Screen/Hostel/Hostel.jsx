import React from "react";
import "./Hostel.css";
import Expense from "../../components/Expense/Expense";
import Navbar from "../../components/Navbar";
import Graph from "../../components/Graph/Graph";

import { useState,useEffect } from "react";
const Hostel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setyear] = useState('2023');
  
  useEffect(() => {
    fetch('http://localhost:5000/api/get-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hostel: localStorage.getItem("hostel"),
      })
    })
    .then(response => response.json())
    .then(data => {
      setItems(data.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching items:', error);
      setLoading(false);
    });
  }, []);
  
  const onChange = (event) => {
    setyear({ ...year, [event.target.name]: event.target.value });
  };
  // console.log(items);
  const data = items.map(({ name, price }) => ({ name, price }));
  console.log(data);
  return (
    <div id='hostel_chart'>
    <Navbar></Navbar>
    <Graph></Graph>
      <Expense item={items}/>
      <div>
        <div id="tab_head">
          The Expense Table
        </div>
        <table className='table' id='table1'>
          <thead>
            <tr>

            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((data) =>{
              return(
                <tr>
                <td>{'>'}</td>
                <td>{data.name}</td>
                <td>{(data.category)?data.category:"others"}</td>
                <td>{data.price}</td>
                <td>{data.date.slice(0,10)}</td>
                </tr>
                )
            })}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hostel;
