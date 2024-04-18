import React, { useState, useEffect } from 'react';
import ReturnHomeButton from './returnHomeButton';
const TopRocketLaunches = () => {
  const [rocketLaunches, setRocketLaunches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/topRocketLaunches')
      .then(response => response.json())
      .then(data => setRocketLaunches(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Top 5 Rocket Launches</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold uppercase">Rocket</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold uppercase">Satellites put in Orbit Count</th>
          </tr>
        </thead>
        <tbody>
          {rocketLaunches.map((rocket, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-nowrap">{rocket.LaunchingRocket}</td>
              <td className="px-6 py-4 whitespace-nowrap">{rocket.RocketCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default TopRocketLaunches;
