import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewAdd.css';
import { IoMdClose } from "react-icons/io";


export default function NewAdd() {

    const [studentFields,setField] = useState(
      {

    reg: '',
    name:'',
    degree:'',
    specilization:'',
    address:'',
    phone_no:'',


      })
    const navigate = useNavigate()

 const handleInput = (e) => {
  const { name, value } = e.target;
  setField((prev) => ({ ...prev, [name]: value }));
};
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const data = {
            reg: Number(studentFields.reg),
            name:studentFields.name,
            degree: studentFields.degree,
            specilization : studentFields.specilization,
            address: studentFields.address,
            // email: studentFields.email,
            phone_no: studentFields.phone_no

        };

try {
  const token = localStorage.getItem("token");
  
  const res = await axios.post("https://db-student-api.vercel.app/insert_stud", data,
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ send token with request
        "Content-Type": "application/json",
      },
    }
  );

  if (res.data.status === "success") {
    alert("Registered Successfully");
   
    navigate("/dashboard");
    console.log(res.data.message);
    console.log(data);
  } else {
    alert(res.data.message || "Registration failed");
  }
} catch (err) {
  console.error("Error:", err.response?.data || err.message);
  alert("Registration failed");
}
    };
  return (

<div className='form-container'>
 
    <form className='form11' onSubmit={handleSubmit}>

      <button onClick={() => {navigate('/dashboard')}} className='close'><IoMdClose /></button>

        <b>Register No:
          <input type="number" name="reg" placeholder="Enter registration number" onChange={handleInput} required />
        </b>
        <b>Name:
          <input type="text" name="name" placeholder="Enter name" onChange={handleInput} required />
        </b>

        <b>UG Degree:
          <input type="text" name="degree" placeholder="Enter degree" onChange={handleInput} required />
        </b>

        <b>Course:
          <input type="text" name="specilization" placeholder="Enter specialization" onChange={handleInput} required />
        </b>

        <b>Address:
          <input type="text" name="address" placeholder="Enter address" onChange={handleInput} required />
        </b>

        <b>Phone No:
          <input type="text" name="phone_no" placeholder="Enter phone number" onChange={handleInput} required />
        </b>


                            {/* Only one API call - via form submit */}
                            <button type="submit" className='new-btn'>Submit</button> 
                        </form>
</div>
  )
}




