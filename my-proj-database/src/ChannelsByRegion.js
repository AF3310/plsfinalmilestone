import React, { useState } from 'react';
import ReturnHomeButton from './returnHomeButton';
const ChannelsByRegion = () => {
  const [region, setRegion] = useState('');
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://plsfinalmilestone-pk8xag850-ali-fakhreldins-projects.vercel.app/getChannelsByRegion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setChannels(data);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Channels By Region</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col">
          <label htmlFor="region" className="mb-2 text-lg">Enter Region:</label>
          <input
            type="text"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full">Submit</button>
      </form>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <ul className="divide-y divide-gray-200">
        {channels.map((channel, index) => (
          <li key={index} className="py-2">{channel.Channel}</li>
        ))}
      </ul>
      <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default ChannelsByRegion;
