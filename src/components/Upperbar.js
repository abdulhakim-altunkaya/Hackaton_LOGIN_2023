import React from 'react';
import { useNavigate } from 'react-router-dom';

function Upperbar() {
    const navigate = useNavigate();

    return (
      <div className='upperbarDiv'>
          <div className='upperbarLogoDiv'>
            <img src="icon8.png" id='logo' onClick={() => navigate("/")}
            alt="logo of page. You can click on it to go to main page"/>
          </div>
          <div className='upperbarButtonsDiv'>
              <span className='button6' onClick={() => navigate("/")}>HOMEPAGE</span>
              <span className='button6' onClick={() => navigate("/audit")}>AUDIT AUDIO</span>
          </div>
      </div>
    )
}

export default Upperbar