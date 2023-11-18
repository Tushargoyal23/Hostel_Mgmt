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
      const updateResponse = await fetch(`http://localhost:5000/api/update-menu/${editingDay}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: editingDay,
          meals: updatedMenu,
        }),
      });
      console.log("");
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


  //for mess-members
  const [members, setMembers] = useState([]);
  const [editingMembers, setEditingMembers] = useState({});
  const [updatedMember, setUpdatedMember] = useState({
    name: '',
    post: '',
  });
  const [addingMember, setAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    post: '',
    hostel: '',
  });


  useEffect(() => {
    // Fetch members from the API when the component mounts
    // fetchMembers();
    fetch('http://localhost:5000/api/mess-members')
      .then(response => response.json())
      .then(members => setMembers(members))
      .catch(error => console.error('Error fetching menu data:', error));
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mess-members');
      const data = await response.json();
      setMembers(data);
      setEditingMembers({}); // Reset editing state when fetching new data
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }

  const handleEditClick = (member) => {
    setEditingMembers((prevEditingMembers) => ({
      ...prevEditingMembers,
      [member.id]: { ...member },
    }));
    // setEditingMembers(member);
    // Initialize the updatedMenu state with the current menu data for the selected day
    const currentMem = members.find(mem => mem.id === member.id);
    setUpdatedMember(currentMem);
  };

  const handleSave = async (editedMember) => {
    try {
      const response = await fetch(`http://localhost:5000/api/update-mess-member/${editedMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedMember.name,
          post: editedMember.post
        }),
      });

      if (response.ok) {
        console.log(`Member ${editedMember.id} updated successfully`);
        // Fetch updated members from the API
        setMembers(prevMemberData => {
          const updatedMemberData = prevMemberData.map(mem => {
            if (mem.id === editedMember.id) {
              return {
                ...mem,
                name: editedMember.name,
                post: editedMember.post
              };
            }
            return mem;
          });
          return updatedMemberData;
        });
        // Reset the editing state
        setEditingDay(null);
      } else {
        console.error(`Failed to update member ${editedMember.id}`);
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handleCancelEdit = (memberId) => {
    setEditingMembers((prevEditingMembers) => {
      const { [memberId]: _, ...rest } = prevEditingMembers;
      return rest;
    });
  };

  const handleAddMemberClick = () => {
    setAddingMember(true);
  };

  const handleAddMember = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/add-mess-member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      if (response.ok) {
        console.log('Member added successfully');
        // Fetch updated members from the API
        fetchMembers();
        setAddingMember(false);
        setNewMember({
          name: '',
          post: '',
          dateOfJoining: '',
        });
      } else {
        console.error('Failed to add member');
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleCancelAddMember = () => {
    setAddingMember(false);
    setNewMember({
      name: '',
      post: '',
      dateOfJoining: '',
    });
  };

  const handleEditChange = (memberId, field, value) => {
    setEditingMembers((prevEditingMembers) => ({
      ...prevEditingMembers,
      [memberId]: {
        ...prevEditingMembers[memberId],
        [field]: value,
      },
    }));
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
              <th scope="col">Breakfast(7:30 am to 9:30 am)</th>
              <th scope="col">Lunch(12:30 pm to 2:30 pm)</th>
              <th scope="col">Evening(5:30 pm to 7:00 pm)</th>
              <th scope="col">Dinner(8:00 pm to 9:30 pm)</th>
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
                        value={updatedMenu.evening}
                        onChange={(e) => setUpdatedMenu({ ...updatedMenu, evening: e.target.value })}
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
                    <td>{Array.isArray(dayMenu.meals.lunch)
                      ? dayMenu.meals.lunch.join(', ')
                      : dayMenu.meals.lunch}</td>
                    <td>{Array.isArray(dayMenu.meals.evening)
                      ? dayMenu.meals.evening.join(', ')
                      : dayMenu.meals.evening}</td>
                    <td>{Array.isArray(dayMenu.meals.dinner)
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
      <div id='mess_mess-members'>
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
                  <th scope="col">Edit details</th>
                  {/* <th scope="col">Date of joining </th> */}
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={member.id}>
                    <th scope="row">{index + 1}</th>

                    {editingMembers[member.id] ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={updatedMember.name}
                            onChange={(e) => setUpdatedMember({ ...updatedMember, name: e.target.value })}
                          /></td>
                        <td>
                          <input
                            type="text"
                            value={updatedMember.post}
                            onChange={(e) => setUpdatedMember({ ...updatedMember, post: e.target.value })}
                          />
                        </td>
                        <td>
                          <button className='btn btn-success' onClick={() => handleSave(member)}>Save</button>
                          <button className='btn btn-secondary' onClick={() => handleCancelEdit(member.id)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{member.name}</td>
                        <td>{member.post}</td>
                        <td>
                          <button className='btn btn-danger' onClick={() => handleEditClick(member.id)}>Edit</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <center>
              {addingMember ? (
                <div>
                  <h3>Add New Member</h3>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                  <label>Post:</label>
                  <input
                    type="text"
                    value={newMember.post}
                    onChange={(e) => setNewMember({ ...newMember, post: e.target.value })}
                  />
                  <label>Hostel:</label>
                  <input
                    type="text"
                    value={newMember.hostel}
                    onChange={(e) => setNewMember({ ...newMember, hostel: e.target.value })}
                  />
                  <button className='btn btn-success' onClick={handleAddMember}>Add Member</button>
                  <button className='btn btn-secondary' onClick={handleCancelAddMember}>Cancel</button>
                </div>
              ) : (
                <button className='btn btn-primary' onClick={handleAddMemberClick}>Add Member</button>
              )}
            </center>
          </div>
          <div className='col'>
            <h2 id='mess_det_head'>Mess Commitee</h2>
            <table className='table' id='table1'>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Post</th>
                  <th scope="col">Edit details</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Anuj Panday</td>
                  <td>Manager</td>
                  <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Ramu Pandit</td>
                  <td>Member</td>
                  <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Teja rawat</td>
                  <td>Sacretary</td>
                  <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Heeralal</td>
                  <td>Sacretary</td>
                  <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Chandan Kumar</td>
                  <td>Member</td>
                  <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Rahim singh Joshi </td>
                  <td>Member</td>
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
