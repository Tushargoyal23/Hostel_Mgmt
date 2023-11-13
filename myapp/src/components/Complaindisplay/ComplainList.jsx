import React, { useState,useEffect } from 'react'

export default function ComplainList() {
    const [complains , setcomplain] = useState([])
    useEffect(() => {
        // Fetch complaints from the API endpoint
        fetch('/api/complaindata')
          .then((response) => response.json())
          .then((data) => setcomplain(data))
          .catch((error) => console.error('Error fetching complaints:', error));
      }, []);
  return (
    <div>
      <div>
      <h2>Complaints</h2>
      {console.log(complains)}
    </div>
    </div>
  )
}
