import axios from 'axios'
import React, { useState } from 'react'
import { useLocation,useNavigate} from "react-router-dom";
import './resetpassword.css'

export default function Resetpassord() {

    
    const [newPassword, setNew ]  = useState("")
    const [confirmPassword, setconfirm] = useState("")
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const location = useLocation();
    const navigate = useNavigate()
    
    const email = location.state?.email; 
    console.log(email);
    

  const handlenew = (e) =>{
    setNew(e.target.value)
  }

    const handleconfirm = (e) =>{
    setconfirm(e.target.value)
  }

  const handlepage = async(e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!newPassword|| !confirmPassword) {
        setError('Both fields are required.');
        return;
        }
    if(confirmPassword !== newPassword){
     setError("New password and confirm password do not match!");
     return;
  }

  console.log({
  email: email,
  new_password: newPassword,
  confirm_password: confirmPassword
});

    try{
        const res = await axios.put('http://127.0.0.1:8000/reset-password',{
          email:email,
          new_password:newPassword,
          confirm_password:confirmPassword
        });
       if (res.data.success === true) {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
      }else {
        setError(res.data.message || "⚠️ Something went wrong");

      }

    }catch (err) {
        alert('password not change try again')
        console.log(err.response?.data || err.message);
        
    }
  }


    


  return (
    <div>
      <div className="reset_container">

        <div className="resetpassword">
         <form action="" onSubmit={handlepage}>

        <p>New password:</p>
      <input type="text"
            name= "new_password"
            placeholder='Enter new password'
            value = {newPassword}
            onChange={handlenew}
            className='R12'/>

      <p>Confirm password:</p>
      <input type="text"
            name="confirm_password"
            placeholder='Re-Entered password'
            value = {confirmPassword}
            onChange={handleconfirm}
            className='R12'/>

            <button>Save</button>

        {error && <p style={{color:'red',fontSize:'15px'}}>{error}</p>}
        {success && <p>Password updated. Redirecting...</p>}

      </form>
      </div>
      
      



      </div>
       
    </div>
    
  )
}
