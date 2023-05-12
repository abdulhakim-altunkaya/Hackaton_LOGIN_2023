import React from 'react';
import { Route, Routes } from  "react-router-dom";

import LowForm from "./LowForm";
import LowMember from "./LowMember";
import AudioPlayer from "./AudioPlayer";


function Lowerbar() {
  return (
      <div className='lowerbarDiv'>
          <Routes>
            <Route path="/" element={ <LowMember /> } />
            <Route path="/audit" element={ <LowForm /> } />
            <Route path="/v2" element={ <AudioPlayer /> } />
          </Routes>
      </div>
  )
}

export default Lowerbar