import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-600 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Ali's TV Info Application </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/query1" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Search Channels Nearby</Link>
          <Link to="/query2" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Register New User</Link>
          <Link to="/query3" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Add Favourites</Link>
          <Link to="/query4" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Top Providers by Num Channels</Link>
          <Link to="/query5" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Top Providers by AVG #Satellites per Channel</Link>
          <Link to="/query6" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Top Rockets</Link>
          <Link to="/query7" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Top Channels By Lang</Link>
          <Link to="/query8" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Channel by REGION</Link>
          <Link to="/query9" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Channels by Satellites</Link>
          <Link to="/query10" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Channels By HD/SD</Link>
          <Link to="/query11" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Channels By Language</Link>
          <Link to="/query12" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Availability of User Fav channel</Link>
          <Link to="/query13" className='bg-white text-blue-900 py-4 px-6 rounded-lg hover:bg-blue-200 transition duration-300 text-center font-semibold'>Top Growing Satellites</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
