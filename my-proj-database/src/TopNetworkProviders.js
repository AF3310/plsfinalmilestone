import React, { useState, useEffect } from 'react';
import ReturnHomeButton from './returnHomeButton';

const TopNetworkProviders = () => {
  const [networkProviders, setNetworkProviders] = useState([]);

  useEffect(() => {
    fetch('https://plsfinalmilestone-pk8xag850-ali-fakhreldins-projects.vercel.app/topNetworkProviders')
      .then(response => response.json())
      .then(data => setNetworkProviders(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Top 5 Network Providers</h2>
      <p>Provider     Total Num of Channels</p>
      <ul>
        {networkProviders.map((provider, index) => (
          <li key={index} className="mb-2">
            <span className="bg-gray-200 rounded-md px-3 py-1 mr-2">{provider.NetworkProvider}</span>
            <span className="bg-gray-200 rounded-md px-3 py-1">{provider.ChannelCount}</span>
          </li>
        ))}
      </ul>
      <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default TopNetworkProviders;
