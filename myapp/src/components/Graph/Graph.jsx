import React from "react";
import "./Graph.css";
import { useState, useEffect } from "react";
import {
  PieChart, Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
const Hostel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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



  // Calculating the total cost
  let veg = 0;
  let dairy = 0;
  let other = 0;
  let oil = 0;
  console.log(items);
  for (const item of items) {
    // Use conditional statements to determine the category and update the corresponding total
    if (item.category === 'Vegetable') {
      veg += item.price;
    } else if (item.category === 'Dairy') {
      dairy += item.price;
    } else if (item.category === 'Oil and Gas') {
      oil += item.price;
    }else{
      other += item.price
    }
  }
  const det = []

  det.push({
    name: "vegetable",
    price: veg
  });
  det.push({
    name: "Dairy",
    price: dairy
  });
  det.push({
    name: "Oil and gas",
    price: oil
  });
  det.push({
    name: "Other",
    price: other
  });
  
  
  
  const data = items.map(({ name, price }) => ({ name, price }));
  console.log(det);
  console.log(data);
  return (
    <>
      <div className='container' style={{ textAlign: "center" }} id='hostel_chart'>
        <h1>Expenditure Details</h1>
        {loading ? (
          <b><h1 style={{ color: "black" }}>Loading...</h1></b>
        ) : (
          <div className="hostel1">
            <div id="pie_chart">
              <h3>Daily expends</h3>
              <PieChart width={500} height={350}>
                <Pie
                  dataKey="price"
                  isAnimationActive={false}
                  data={data}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
            <div id='item_chart'>
              <h3>Items Expenditure chart</h3>
              <BarChart
                width={700}
                height={300}
                data={det}
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                barSize={20}
              >
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="price" fill="#8884d8" background={{ fill: "#eee" }} />
              </BarChart>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Hostel;
