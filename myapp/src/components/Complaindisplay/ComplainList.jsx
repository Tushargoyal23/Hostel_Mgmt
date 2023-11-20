import React, { useState, useEffect } from 'react'
import Post from '../Post'
import axios from "axios";
export default function ComplainList() {

    const [complains , setcomplain] = useState([])
    const getComplaints= async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/complaindata",{
          hostel:localStorage.getItem("hostel")
        })
        if (res.data.success) {
          setcomplain(res.data.data);
        }
      } catch (error) {
        console.log(error);

  
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);


  
  return (
    <div>
      {/*Post the requested complians*/}
      <Post title='Hostel safety' url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPElmzWCeKaGAm9lOTJTYPJ9PqVQKVisTmpQ&usqp=CAU' date="2023-11-12T07:06:00.233Z"></Post>
      {complains.map((data) => {
        return (
          // <>
          // <Post title={data.title} description={data.description} url='https://source.unsplash.com/random/300×300/?food' date={data.date}></Post>
          //  {console.log(data.isResponse)}
          // </>
          !data.isResponse ? (
            <Post key={data._id} title={data.title} description={data.description} url="https://source.unsplash.com/random/300x300/?food" date={data.date} />
          ):""
        )
      })}
      {/* <Table columns={columns} dataSource={complains} /> */}
    </div>
  );
};
