import React, { useState } from 'react';
import ReturnHomeButton from './returnHomeButton';

const UserFavouriteAvailableChannels = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`https://plsfinalmilestone-pk8xag850-ali-fakhreldins-projects.vercel.app/data?email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(data);
      setError(''); // Reset error if fetch is successful
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data. Please try again.');
    }
  };


  const groupedData = data.reduce((acc, channel) => {
    if (!acc[channel.Channel]) {
      acc[channel.Channel] = [];
    }
    acc[channel.Channel].push(channel);
    return acc;
  }, {});

  return (
    <div className="max-w-xl mx-auto p-4">
      <label htmlFor="email" className="block mb-2">Enter Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500 mb-4"
      />
      <button onClick={fetchData} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Fetch Data</button>
      {error && <div className="text-red-500 mt-4">Error: {error}</div>}
      {Object.keys(groupedData).length === 0 ? (
        <div className="text-gray-500 mt-4">No available channels!</div>
      ) : (
        Object.keys(groupedData).map((channelName, index) => (
          <div key={index} className="mt-4">
            <h2 className="text-lg font-semibold mb-2">{channelName}</h2>
            <table className="w-full border border-gray-400 bg-white rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-400 px-4 py-2">Frequency</th>
                  <th className="border border-gray-400 px-4 py-2">Satellite Name</th>
                  <th className="border border-gray-400 px-4 py-2">Encryption</th>
                </tr>
              </thead>
              <tbody>
                {groupedData[channelName].map((channelData, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>
                    <td className="border border-gray-400 px-4 py-2">{channelData.Frequency}</td>
                    <td className="border border-gray-400 px-4 py-2">{channelData.SatelliteName}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {channelData.Encryption ? `${channelData.Encryption} (Encrypted)` : 'FREE'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
      <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default UserFavouriteAvailableChannels;
