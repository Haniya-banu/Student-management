import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';
import Logo from '../assets/Logo 2.png';

export default function Dashboard() {
  const [studentlist, setStudentlist] = useState([]);
  const [view, setView] = useState(null);
  const [DeleteItem, setDeleteItem] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [datalist, setdatalist] = useState(null)
  const [editForm, setEditForm] = useState({
    // name: "",
    // age: "",
    // ug: "",
    // interest_course: "",
    // email: "",
    // ph_no: "",
    reg: '',
    name: '',
    degree: '',
    specilization: '',
    address: '',
    phone_no: '',
  });

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
    const token = localStorage.getItem("token");


  // Fetch students from API
  useEffect(() => {
    let ignore = false;
    const fetchStudents = async () => {
      try {
        const res = await axios.get('https://db-student-api.vercel.app/stud_data', 
          {
             headers: {
          Authorization: `Bearer ${token}`, // ✅ include token here
        },
        });
        if (!ignore) setStudentlist(res.data);
      } catch (err) {
        console.error("API Call Failed:", err.response?.data || err.message);
        setStudentlist([]);
      }
    };
    fetchStudents();
    return () => { ignore = true; };
  }, [token]);

  // Filter students based on search term
  const filteredStudents = (studentlist || []).filter(stud =>
    stud.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleViewProfile = (stud) => {
    setdatalist(stud);
    // navigate("/viewStudentprofile", { state: stud });
  }

  const handleEdit = (stud) => {
    setView(stud);
    setEditForm(stud);
    setShowEditModal(true);
  }

  const handleEditForm = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  const updateStudent = async () => {
    try {
      const res = await axios.put(`https://db-student-api.vercel.app/update/${view.id}`, editForm);
      setStudentlist(prev =>
        prev.map(s => (s.id === view.id ? editForm : s))
      );
      if (res.data.status === "success") {
        alert('Update successful');
      }
      setShowEditModal(false);
    } catch (err) {
      console.error("Update Failed:", err.response?.data || err.message);
    }
  };

  const handleDelete = (student) => {
    setView(student);
    setDeleteItem(true);
  }

  const deleteStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://db-student-api.vercel.app/del/${view.id}`);
      setStudentlist(prev => prev.filter(s => s.id !== view.id));
      setDeleteItem(false);
    } catch (err) {
      console.error("Delete Failed:", err.response?.data || err.message);
    }
  }

  
 const handleLogout = () => {
    try {
       
    
        
        localStorage.removeItem("token"); 
        console.log("Token removed successfully");
        navigate('/signIn_Page');
      

      // ✅ redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="container5">

      <div className='head-container'>

        <div className="logo-contain">
          <img src={Logo} alt="" className='logo-img' />
          {/* <div className='hr-tag'>____________________________________________________________________________________________________________________________________________________________________</div> */}

        </div>


        <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/NewAdd">Add Student</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/settings">Settings</Link>

            <Link onClick={handleLogout} className='log-out'>
              Logout
            </Link>

          </nav>
        </div>




        {/* Header: Add new + Search */}
        <div className="newadd">
          <Link to="/NewAdd" className="newadd-btn">
            <button>+ New Register</button>
          </Link>

          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>


      </div>


      {/* Student Table */}
      <div className='table-box'>
        {!showEditModal && !DeleteItem && (
          <div className={`table-container ${datalist ? 'blur-background' : ''}}`}>
            <table>
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Reg No</th>
                  <th>Name</th>
                  <th>Ug degree</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Edit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((stud, index) => (
                  <tr key={stud.reg}>
                    <td>{index + 1}</td>
                    <td>{stud.reg}</td>
                    <td
                      onClick={() => handleViewProfile(stud)}
                      style={{ cursor: "pointer", color: "blue" }}>
                      <p>{stud.name}</p>
                    </td>
                    <td>{stud.degree}</td>
                    <td>{stud.specilization}</td>
                    <td>{stud.address}</td>
                    <td>{stud.phone_no}</td>
                    <td>
                      <button onClick={() => handleEdit(stud)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(stud)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="stats-container">

              <h2>{studentlist.length}</h2>
              <p>Total Students</p>



              <h2>{studentlist.filter(s => s.degree === "BSC").length}</h2>
              <p>BSC Students</p>



              <h2>{studentlist.filter(s => s.specilization === "WEB").length}</h2>
              <p>web development Spec.</p>

            </div>

          </div>
        )}

        {/* Edit Popup */}
        <div className={`edit-popup ${showEditModal ? 'active' : ''}`}>
          <div className="dlt-card">
            <p>Edit Student</p>
            {Object.keys(editForm).map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                value={editForm[key]}
                onChange={handleEditForm}
                placeholder={key}
              />
            ))}
            <div className='delete-btn'>
              <button onClick={updateStudent}>Update</button>
              <button style={{ backgroundColor: "red" }} onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Popup */}
        <div className={`delete-popup ${DeleteItem ? 'active' : ''}`}>
          <div className="dlt-card">
            <h4>Delete Confirmation!</h4>
            <p>
              Are you sure you want to delete student <b>{view?.name}</b>?
            </p>
            <div className='delete-btn'>
              <button onClick={deleteStudent}>Delete</button>
              <button style={{ backgroundColor: "red" }} onClick={() => setDeleteItem(false)}>Cancel</button>
            </div>
          </div>
        </div>

        {datalist && (
          <div className={`showdetails ${datalist ? 'showdetails' : ''}`}>
            <h3>Student Profile</h3>
            <p><b>Name:</b> {datalist.name}</p>
            <p><b>Degree:</b> {datalist.degree}</p>
            <p><b>Specialization:</b> {datalist.specilization}</p>
            <p><b>Address:</b> {datalist.address}</p>
            <p><b>Phone:</b> {datalist.phone_no}</p>
            <button onClick={() => setdatalist(null)}>Close</button>
          </div>
        )}

      </div>
    </div>





  );
}
