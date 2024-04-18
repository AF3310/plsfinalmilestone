import React, { useState } from 'react';
import ReturnHomeButton from './returnHomeButton';
const ChannelFilterer = () => {
  const [latitude, setLatitude] = useState('');
  const [direction, setDirection] = useState('');
  const [channels, setChannels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8081/users2?latitude=${latitude}&direction=${direction}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setChannels(data);
      setErrorMessage('');
    } catch (error) {
      setChannels([]);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8">Channel Table</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center mb-4">
          <label htmlFor="latitude" className="mr-2">Longitude:</label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="border border-blue-500 p-2 rounded-l"
            required
          />
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="border border-blue-500 p-2 rounded-r"
            required
          >
            <option value="">Select Direction</option>
            <option value="E">East</option>
            <option value="W">West</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Submit</button>
        </div>
      </form>
      {errorMessage && <p className="text-red-500 mb-4">Error: {errorMessage}</p>}
      <table className="w-full border border-gray-400 bg-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-400 px-4 py-2">Channel Name</th>
            <th className="border border-gray-400 px-4 py-2">Position</th>
    
          </tr>
        </thead>
        <tbody>
          {channels.map((channel, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>
              <td className="border border-gray-400 px-4 py-2">{channel.Channel}</td>
              <td className="border border-gray-400 px-4 py-2">{channel.Position}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default ChannelFilterer;
