import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

export default function viewStudentprofile() {

  const location = useLocation();
  const navigate = useNavigate();


  const stud = location.state;

  if (!stud) {
    return (
      <div className="shortlist-container">
        <p>No student selected.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );}
    
  return (
    <div>

      <h2>Student Profile</h2>

      <div>
        <p>{stud.name}</p>
        <p>{stud.age}</p>
        <p>{stud.ug}</p>
        <p>{stud.interest_course}</p>
        <p>{stud.email}</p>
        <p>{stud.ph_no}</p>
      </div>

      <button onClick={() => navigate(-1)}>Back to Home</button>

      
      
    </div>
  )
}
