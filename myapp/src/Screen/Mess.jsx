import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import './Mess.css'
import { Link } from 'react-router-dom'
function Mess() {
  const [menuData, setMenuData] = useState([]);
  const [editingDay, setEditingDay] = useState(null);
  const [updatedMenu, setUpdatedMenu] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    evening: '',
  });

  useEffect(() => {
    // Fetch menu data from the server
    fetch('http://localhost:5000/api/get-menu-for-week')
      .then(response => response.json())
      .then(menuData => setMenuData(menuData))
      .catch(error => console.error('Error fetching menu data:', error));
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleEditButtonClick = (day) => {
    setEditingDay(day);
    // Initialize the updatedMenu state with the current menu data for the selected day
    const currentMenu = menuData.find(menu => menu.day === day);
    setUpdatedMenu(currentMenu.meals);
  };

  const handleUpdateMenu = async () => {
    try {
      // Send a PUT request to update the menu for the selected day
      const updateResponse = await fetch(`http://localhost:5000/api/update-menu/${editingDay}`, {
        method: 'POST', // Assuming you're using POST for updates, adjust accordingly
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: editingDay,
          meals: updatedMenu,
        }),
      });

      if (updateResponse.ok) {
        console.log(`Menu updated successfully for ${editingDay}`);
        // Update the state with the edited data
        setMenuData(prevMenuData => {
          const updatedMenuData = prevMenuData.map(dayMenu => {
            if (dayMenu.day === editingDay) {
              return {
                ...dayMenu,
                meals: updatedMenu,
              };
            }
            return dayMenu;
          });
          return updatedMenuData;
        });
        // Reset the editing state
        setEditingDay(null);
      } else {
        console.error(`Failed to update menu for ${editingDay}`);
      }
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };


  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div className='container' id='head'>
        <h1><u>Mess Menu</u></h1>
      </div>
    <div className='container'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Day</th>
            <th scope="col">Breakfast</th>
            <th scope="col">Lunch</th>
            <th scope="col">Dinner</th>
            <th scope="col">Evening</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((dayMenu, index) => (
            <tr key={dayMenu.day}>
              <th scope="row">{index + 1}</th>
              <td>{dayMenu.day}</td>
              {/* Render editable cells if the day is being edited */}
              {editingDay === dayMenu.day ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={updatedMenu.breakfast}
                      onChange={(e) => setUpdatedMenu({ ...updatedMenu, breakfast: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={updatedMenu.lunch}
                      onChange={(e) => setUpdatedMenu({ ...updatedMenu, lunch: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={updatedMenu.dinner}
                      onChange={(e) => setUpdatedMenu({ ...updatedMenu, dinner: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={updatedMenu.evening}
                      onChange={(e) => setUpdatedMenu({ ...updatedMenu, evening: e.target.value })}
                    />
                  </td>
                  <td>
                    <button
                      className='btn btn-success'
                      onClick={handleUpdateMenu}
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                // Render non-editable cells if the day is not being edited
                <>
                  <td>{Array.isArray(dayMenu.meals.breakfast)
                    ? dayMenu.meals.breakfast.join(', ')
                    : dayMenu.meals.breakfast}</td>
                  <td>{Array.isArray(dayMenu.meals.breakfast)
                    ? dayMenu.meals.lunch.join(', ')
                    : dayMenu.meals.lunch}</td>
                  <td>{Array.isArray(dayMenu.meals.breakfast)
                    ? dayMenu.meals.evening.join(', ')
                    : dayMenu.meals.evening}</td>
                  <td>{Array.isArray(dayMenu.meals.breakfast)
                    ? dayMenu.meals.dinner.join(', ')
                    : dayMenu.meals.dinner}</td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleEditButtonClick(dayMenu.day)}
                    >
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div id='mess_members'>
        <div id='mess_head'>
          <center>
            <u>MESS DETAILS</u>
          </center>
        </div>
        <div className='row'>

          <div className='col'>
            <h2 id='mess_det_head'>Mess Members</h2>
            <table className='table' id='table1'>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Post</th>
                  <th scope="col">Date of joining </th>
                  <th scope="col">Edit Details </th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Anuj Panday</td>
                  <td>Worker head</td>
                  <td>12 March 2003</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Ramu Pandit</td>
                  <td>Worker</td>
                  <td>13 april 1996</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Teja rawat</td>
                  <td>Grocery Manager</td>
                  <td>12 Jan 1992</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Heeralal</td>
                  <td>chef</td>
                  <td>19 Dec 1995</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Chandan Kumar</td>
                  <td>chef</td>
                  <td>4 Nov 1995</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Rahim singh Joshi </td>
                  <td>Worker</td>
                  <td>9 feb 1985</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
              </tbody>
            </table>
            <center><button className='btn btn-success'>Add Member</button></center>
          </div>
          <div className='col'>
            <h2 id='mess_det_head'>Mess Commitee</h2>
            <table className='table' id='table1'>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Post</th>
                  <th scope="col">Date of joining </th>
                  <th scope="col">Edit details</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Anuj Panday</td>
                  <td>Worker head</td>
                  <td>12 March 2003</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Ramu Pandit</td>
                  <td>Worker</td>
                  <td>13 april 1996</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Teja rawat</td>
                  <td>Grocery Manager</td>
                  <td>12 Jan 1992</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Heeralal</td>
                  <td>chef</td>
                  <td>19 Dec 1995</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Chandan Kumar</td>
                  <td>chef</td>
                  <td>4 Nov 1995</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Rahim singh Joshi </td>
                  <td>Worker</td>
                  <td>9 feb 1985</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
              </tbody>
            </table>
            <div>
            <center><button className='btn btn-success'>Add Member</button></center>
            </div>
          </div>
        </div>
      </div>
      <div className='container' id='info'>
        <h2>
          For any complain regarding menu and mess you can add it here.
        </h2>
        <Link to='/complainform'>
        <button className='btn btn-warning'>Add Complain</button>
        </Link>
      </div>
    </>
  );
}

export default Mess;
