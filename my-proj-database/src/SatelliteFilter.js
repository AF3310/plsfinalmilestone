import React, { useState } from 'react';
import ReturnHomeButton from './returnHomeButton';
const SatelliteFilter = () => {
  const [satelliteName, setSatelliteName] = useState('');
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    try {
      const response = await fetch('https://plsfinalmilestone-pk8xag850-ali-fakhreldins-projects.vercel.app/satelliteFilter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ satelliteName }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setChannels(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data. Please try again.'); // Set error message
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Satellite Filter</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="satelliteName" className="block mb-2">Enter Satellite Name:</label>
        <input
          type="text"
          id="satelliteName"
          value={satelliteName}
          onChange={(e) => setSatelliteName(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Filter</button>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <ul>
        {channels.map((channel, index) => (
          <li key={index} className="mb-2">{channel.Channel} - {channel.region}</li>
        ))}
      </ul>
      <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default SatelliteFilter;
