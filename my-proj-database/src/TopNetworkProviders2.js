import React, { useState, useEffect } from 'react';
import ReturnHomeButton from './returnHomeButton';
const TopNetworkProviders2 = () => {
  const [networkProviders, setNetworkProviders] = useState([]);

  useEffect(() => {
    fetch('https://plsfinalmilestone-edwsqlquk-ali-fakhreldins-projects.vercel.app/topNetworkProviders2')
      .then(response => response.json())
      .then(data => {
    
        const updatedData = data.map(provider => ({
          ...provider,
          average_satellite_count: parseFloat(provider.average_satellite_count)
        }));
        setNetworkProviders(updatedData);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Top 5 Network Providers by Average Satellite Count</h2>
      <ul className="list-disc pl-6">
        {networkProviders.map((provider, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">{provider.NetworkProvider}:</span> {typeof provider.average_satellite_count === 'number' ? provider.average_satellite_count.toFixed(2) : 'N/A'}
          </li>
        ))}
      </ul>
      <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default TopNetworkProviders2;
