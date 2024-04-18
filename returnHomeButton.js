
import React from "react";
import { Link } from 'react-router-dom';
function returnHomeButton() {
    return (
    <div>  <Link to="/"className='bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 '>Home</Link></div>
    

    );
  }
  
  export default returnHomeButton;
  