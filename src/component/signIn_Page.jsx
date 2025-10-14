import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signIn_Page.css'
import Right from '../assets/right logo.jpg'
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";



export default function SignIn_Page() {
  const [Formdata, SetFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    // Email validation
    if (!Formdata.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(Formdata.email)) {
      errors.email = 'Email is invalid';
    }

    if (!Formdata.password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    SetFormData({ ...Formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return; 

  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/login", 
      Formdata,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

      console.log("Login response:", result.data);

      // Save token in localStorage
      localStorage.setItem("token", result.data.access_token);

    alert("Login successful");
    navigate("/dashboard");

  }
  
  catch (err) {
  if (err.response) {
    console.log("Error status:", err.response.status);
    console.log("Error data:", err.response.data);
    setErrors({ server: JSON.stringify(err.response.data.detail) });
  } else {
    console.log("Error:", err.message);
  }
}



 
  };

  return (
    <div>
        <div className="container1">

    <div className="card-contain">

      <div className="card-left">
        <form onSubmit={handleSubmit}>

        
           <h2>Welcome EduTrack !</h2>

           <h4>LOGIN</h4>
           <div style={{ position: 'relative', width: '300px' }}>
              <FaUser 
      style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '15px', 
        transform: 'translateY(-50%)', 
        color: 'grey' 
        }} 
        />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={Formdata.email}
            onChange={handleChange}
            autoComplete='username'
          /></div>
          {errors.email && <p className='err'>{errors.email}</p>}


          <div style={{ position: 'relative', width: '300px' }}>
          <TbLockPassword 
        style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '15px', 
        transform: 'translateY(-50%)', 
        color: 'grey' 
        }} 
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={Formdata.password}
            onChange={handleChange}
            autoComplete='current-password'
          />
          </div>
          {errors.password && <p className="err">{errors.password}</p>}

          {errors.server && <h5 className="err">{errors.server}</h5>}
          

          <Link to="/forgot_ps" className='fs'><p >Forgot password?</p></Link>
          <button type="submit">Submit</button>
          </form>
        </div>
        <div className='card-right'>

          <div className="cardtext">A platform to manage and view student details easily and efficiently</div>

        <img src={Right} alt="" className='right-image'/>
        </div>

      
      </div>
 
    </div>
    </div>

  );
}
