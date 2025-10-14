import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaChartLine, FaBook } from "react-icons/fa";
import './getstart.css'
import EduTrack from '../assets/eduTrack.png';


export default function GetStartedPage() {
  const navigate = useNavigate();

  return (

    <div className="get-container">

          <div className="overlay"></div>
          
                    {/* <img src={Edu_image} className="logo" alt="" /> */}
            <div className="content">

      <h1 > Welcome to EduTrack <img src={EduTrack} alt="" className='logoimg'/> </h1>
      <div className="para">
      <p>A simple platform to manage student details</p>
      <p>Track, organize, and view records easily.</p>
      </div>

      <button 
        onClick={() => navigate("/signIn_Page")} 
        className="get-button"
      >
        Get Started →
      </button>

      <div className="button-group">
        <button>learn more</button>
        <button>About</button>
      </div>
                      
        </div>
 
    </div>

    
  );
}
