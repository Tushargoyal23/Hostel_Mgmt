import React from 'react'
import "../../Screen/Hostel/Hostel.css";
import { useState, useEffect } from "react";
// import Link from 'antd/es/typography/Link';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { Link } from 'react-router-dom';
export default function Expense(props) {
   const[show , setshow] = useState(false);
  const handleclick =()=>{
    setshow(!show)
  }
  const items = props.item;
  const data1 = items.map(({ name, price }) => ({ name, price }));
  // console.log(data1);
  const interval = 7;
  let arr = new Array(13).fill(0);
  const data2 = [];
  const f = () => {
    for (let ind = 1; ind < arr.length; ind++) {
      let p = arr.at(ind);
      data2.push({
        index: ind,
        price: p
      });
    }
  }
  return (
    <div>
      {
        items.map((item) => {
          const date = item.date;
          const month = date.slice(5, 7) - 0
          const year = date.slice(0, 4) - 0;
          const x = date.slice(8, 10) - 0
          console.log(month, year, x);
          arr[month] += item.price;
        })

      }
      {
        f()
      }
      {/* {console.log(data2)} */}
      <center>

      <h1>The monthly chart</h1>
      <BarChart
        width={600}
        height={300}
        data={data2}
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        barSize={20}
        >
        <XAxis dataKey="index" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="price" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
      <div>{
        (localStorage.getItem('role') == 1)?
        <Link to='/additem'><button className='btn btn-success'>Add details</button></Link>:""
        }
        </div>
        </center>
    </div>
  )
}
