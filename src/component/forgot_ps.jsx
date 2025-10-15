import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forgot_ps.css'
import { IoMdClose } from "react-icons/io";


export default function Forgot_ps() {


  const [email, setEmail] = useState('');
  const [private_key, setOTP] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');


   const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(  e.target.value)
  }

  const handletype= (e) => {
    setOTP(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get('https://db-student-api.vercel.app/email_check',{params: {email} } );
      console.log(res.data);
      if(res.data.status === 'success'){
      alert(res.data.status)
      setStep(2)
      }else{
       setMessage(res.message)
      }


    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    if (err.response?.status === 404) {
      setMessage("Email not registered!");
    } else if (err.response?.status === 422) {
      setMessage("Invalid email format");
    } else {
      setMessage("Something went wrong. Please try again.");
    }
    }
  };

  const verifyOTP = async (e) => {
    
    try {
      const res = await axios.post('https://db-student-api.vercel.app/send-otp', {
         email:email,
         private_key:private_key });
        console.log(res.data.status);
         if(res.data.success === true){
          console.log(res.data);
          alert("OTP verified, proceed to reset password");
          navigate("/resetpassword" , { state: { email } });
         } else{
          setMessage(res.data.message);
         }
    } 
    catch (err) {
    console.log("Error:", err.response?.data || err.message);
    alert("Error: " + JSON.stringify(err.response?.data || err.message));
    }
  };
  return (
       <div>
        
       
  {step==1  && (
    
    <>
     <div className='forgot_container'>

    <div className="forgot_ps">
   
    <p style={{color:'teal',fontFamily:'italic',fontWeight:'bold'}}>Forget Your Password ?</p>
     <p style={{color:'grey',fontFamily:'italic',fontWeight:'normal',position:'absolute',top:'0',left:'90%',cursor:'pointer',transition:'all 0.3s ease',textShadow:'0 3px 8px rgba(0, 0, 0, 0.2)'}} onClick={() => {navigate('/signIn_page')}}><IoMdClose /></p>
            <p>Enter your <b style={{color:'#0d47a1'}}>Email</b> below to receive your OTP</p>
      <input 
      type="email"
      name='email'
      placeholder='example@gmail.com'
      value={email}
      onChange={handleChange}
      required
      style={{height:'30px',width:'280px',fontSize:'15px',borderRadius:'8px'}}
      />
      <br></br>
      <br></br>
      <button onClick={handleSubmit}>submit</button>
      {message && <p className='err'>{message}</p>}
      </div>
      </div>
    </>
  )}
  {step ==2 && (
    
    <>
    <div className="forgot_container">
    <div className="otp_section">
      <h3 style={{color:'#0d47a1'}}>verify OTP</h3>
    <h2>Enter the 4-digit code</h2>
   <input
    type="password"
    name='private_key'
    value={private_key}
    onChange={handletype}
    maxLength="4"
    required 
     style={{height:'25px',
      borderRadius:'8px',
      padding:'10px', 
    letterSpacing: "1rem", 
    border: "none",
    borderBottom: "2px solid black",
    fontSize: "2rem",
    textAlign: "center",
    outline: "none",
    }}/>
    <br/>
      <div className="resend">
    Didn’t get the code? <a href="#">Resend OTP</a>
  </div>
  <br/>
    <button onClick={verifyOTP}>verify OTP</button>
    {message && <p className='err'>{message}</p>} 
    </div>
    
    </div>
    </>
  )
  }
  
  </div>
  
    // </div>
    
  )
}
