import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import './Mess.css'
import { Link, json } from 'react-router-dom'
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
    fetch('http://localhost:5000/api/get-menu-for-week', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hostel:localStorage.getItem("hostel")
      })
    })
      .then(response => response.json())
      .then(menuData => setMenuData(menuData))
      .catch(error => console.error('Error fetching menu data:', error));
    fetch('http://localhost:5000/api/mess-members')
      .then(response => response.json())
      .then(members => setMembers(members))
      .catch(error => console.error('Error fetching member data:', error));
      fetch('http://localhost:5000/api/commitee-members')
      .then(response => response.json())
      .then(commiteemembers => setcommiteeMembers(commiteemembers))
      .catch(error => console.error('Error fetching commitee  data:', error));
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
          hostel:localStorage.getItem("hostel")
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
  const [editingMemberid, setEditingMemberid] = useState(null);
  const [updatedMember, setUpdatedMember] = useState({
    _id: '',
    name: '',
    post: '',
  });
  const [addingMember, setAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    post: '',
    hostel: '',
  });


  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mess-members');
      const data = await response.json();
      setMembers(data);
      setEditingMemberid(null); // Reset editing state when fetching new data
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }

  const handleEditClick = (id) => {
    // console.log(member);
    setEditingMemberid(id);
    // setEditingMembers(member);
    // Initialize the updatedMenu state with the current menu data for the selected day
    const currentMem = members.find(mem => mem._id === id);
    // console.log(currentMem);
    setUpdatedMember(currentMem);
  };

  const handleSave = async () => {
    try {
      console.log(updatedMember);
      const response = await fetch(`http://localhost:5000/api/update-mess-member/${editingMemberid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedMember.name,
          post: updatedMember.post
        }),
      });

      if (response.ok) {
        console.log(`Member ${editingMemberid} updated successfully`);
        // Fetch updated members from the API
        // setMembers(prevMemberData => {
        //   const updatedMemberData = prevMemberData.map(mem => {
        //     if (mem._id === editedMember._id) {
        //       return {
        //         ...mem,
        //         name: editedMember.name,
        //         post: editedMember.post
        //       };
        //     }
        //     return mem;
        //   });
        //   return updatedMemberData;
        // });
        // Reset the editing state
        setEditingMemberid(null);
        window.location.reload();
      } else {
        console.error(`Failed to update member ${editingMemberid}`);
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingMemberid(null);
  };

  const handleAddMemberClick = () => {
    setAddingMember(true);
  };

  const handleAddMember = async () => {
    try {
      console.log(newMember);
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
        // fetchMembers();
        setAddingMember(false);
        // setNewMember({
        //   name: '',
        //   post: '',
        //   hostel: '',
        // });
        window.location.reload();
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
      hostel: '',
    });
  };



  //hostel commitee
  const [commiteemembers, setcommiteeMembers] = useState([]);
  const [editingcommiteeMemberid, setEditingcommiteeMemberid] = useState(null);
  const [updatedcommiteeMember, setUpdatedcommiteeMember] = useState({
    _id: '',
    name: '',
    post: '',
  });
  const [addingcommiteeMember, setAddingcommiteeMember] = useState(false);
  const [newcommiteeMember, setNewcommiteeMember] = useState({
    name: '',
    post: '',
    hostel: '',
  });


  
  const handleEditcommiteeClick = (id) => {
    // console.log(member);
    setEditingcommiteeMemberid(id);
    // setEditingMembers(member);
    // Initialize the updatedMenu state with the current menu data for the selected day
    const currentcommiteeMem = commiteemembers.find(mem => mem._id === id);
    // console.log(currentMem);
    setUpdatedcommiteeMember(currentcommiteeMem);
  };

  const handlecommiteeSave = async () => {
    try {
      console.log(updatedcommiteeMember);
      const response = await fetch(`http://localhost:5000/api/update-commitee-member/${editingcommiteeMemberid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedcommiteeMember.name,
          post: updatedcommiteeMember.post
        }),
      });

      if (response.ok) {
        console.log(`Member ${editingcommiteeMemberid} updated successfully`);
        // Fetch updated members from the API
        // setMembers(prevMemberData => {
        //   const updatedMemberData = prevMemberData.map(mem => {
        //     if (mem._id === editedMember._id) {
        //       return {
        //         ...mem,
        //         name: editedMember.name,
        //         post: editedMember.post
        //       };
        //     }
        //     return mem;
        //   });
        //   return updatedMemberData;
        // });
        // Reset the editing state
        setEditingcommiteeMemberid(null);
        window.location.reload();
      } else {
        console.error(`Failed to update member ${editingcommiteeMemberid}`);
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handlecommiteeCancelEdit = () => {
    setEditingcommiteeMemberid(null);
  };

  const handleAddcommiteeMemberClick = () => {
    setAddingcommiteeMember(true);
  };

  const handleAddcommiteeMember = async () => {
    try {
      console.log(newcommiteeMember);
      const response = await fetch('http://localhost:5000/api/add-commitee-member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newcommiteeMember),
      });

      if (response.ok) {
        console.log('commitee Member added successfully');
        // Fetch updated members from the API
        // fetchMembers();
        setAddingcommiteeMember(false);
        // setNewMember({
        //   name: '',
        //   post: '',
        //   hostel: '',
        // });
        window.location.reload();
      } else {
        console.error('Failed to add commitee');
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleCancelAddcommiteeMember = () => {
    setAddingcommiteeMember(false);
    setNewcommiteeMember({
      name: '',
      post: '',
      hostel: '',
    });
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
              {(localStorage.getItem("role")==1)?
              <th scope="col">Actions</th>:""
  }
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
                      {(localStorage.getItem("role")==1)?
                      <button
                        className='btn btn-danger'
                        onClick={() => handleEditButtonClick(dayMenu.day)}
                      >
                        Edit
                      </button>
                      :""
}
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
                  {(localStorage.getItem("role")==2)?
                  <th scope="col">Edit details</th>:""
}
                  {/* <th scope="col">Date of joining </th> */}
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={member._id}>
                    <th scope="row">{index + 1}</th>

                    {(editingMemberid === member._id) ? (
                      <>
                        <td>
                          {/* {console.log("nksdnkn")} */}
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
                          <button className='btn btn-success' onClick={() => handleSave()}>Save</button>
                          <button className='btn btn-secondary' onClick={() => handleCancelEdit()}>Cancel</button>
                        </td>
                      </>
                    ) : (

                      <>
                        {/* {console.log(member.name , index)} */}
                        <td>{member.name}</td>
                        <td>{member.post}</td>
                        {(localStorage.getItem("role")==2)?
                        <td>

                          <button className='btn btn-danger' onClick={() => handleEditClick(member.id)}>Edit</button>
                        </td>:""
}
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
                <div>
                  {(localStorage.getItem("role")==2)?
                <button className='btn btn-primary' onClick={handleAddMemberClick}>Add Member</button>:""
              }
                </div>
              )}
            </center>
          </div>
          <div className='col'>
            <h2 id='mess_det_head'>Commitee Members</h2>
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
                {commiteemembers.map((commiteemember, index) => (
                  <tr key={commiteemember._id}>
                    <th scope="row">{index + 1}</th>

                    {(editingcommiteeMemberid ===commiteemember._id) ? (
                      <>
                        <td>
                          {/* {console.log("nksdnkn")} */}
                          <input
                            type="text"
                            value={updatedcommiteeMember.name}
                            onChange={(e) => setUpdatedcommiteeMember({ ...updatedcommiteeMember, name: e.target.value })}
                          /></td>
                        <td>
                          <input
                            type="text"
                            value={updatedcommiteeMember.post}
                            onChange={(e) => setUpdatedcommiteeMember({ ...updatedcommiteeMember, post: e.target.value })}
                          />
                        </td>
                        <td>
                          <button className='btn btn-success' onClick={() => handlecommiteeSave()}>Save</button>
                          <button className='btn btn-secondary' onClick={() => handlecommiteeCancelEdit()}>Cancel</button>
                        </td>
                      </>
                    ) : (

                      <>
                        {/* {console.log(member.name , index)} */}
                        <td>{commiteemember.name}</td>
                        <td>{commiteemember.post}</td>
                        <td>
                          <button className='btn btn-danger' onClick={() => handleEditcommiteeClick(commiteemember._id)}>Edit</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <center>
              {addingcommiteeMember ? (
                <div>
                  <h3>Add New commitee Member</h3>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={newcommiteeMember.name}
                    onChange={(e) => setNewcommiteeMember({ ...newcommiteeMember, name: e.target.value })}
                  />
                  <label>Post:</label>
                  <input
                    type="text"
                    value={newcommiteeMember.post}
                    onChange={(e) => setNewcommiteeMember({ ...newcommiteeMember, post: e.target.value })}
                  />
                  <label>Hostel:</label>
                  <input
                    type="text"
                    value={newcommiteeMember.hostel}
                    onChange={(e) => setNewcommiteeMember({ ...newcommiteeMember, hostel: e.target.value })}
                  />
                  <button className='btn btn-success' onClick={handleAddcommiteeMember}>Add Member</button>
                  <button className='btn btn-secondary' onClick={handleCancelAddcommiteeMember}>Cancel</button>
                </div>
              ) : (
                <button className='btn btn-primary' onClick={handleAddcommiteeMemberClick}>Add Member</button>
              )}
            </center>
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
