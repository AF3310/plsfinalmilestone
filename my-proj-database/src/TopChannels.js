import React, { useState, useEffect } from 'react';
import ReturnHomeButton from './returnHomeButton';
const TopChannels = () => {
  const [topChannels, setTopChannels] = useState([]);

  useEffect(() => {
    fetch('https://plsfinalmilestone-edwsqlquk-ali-fakhreldins-projects.vercel.app/topChannels')
      .then(response => response.json())
      .then(data => setTopChannels(data))
      .catch(error => console.error('Error:', error));
  }, []);


  const groupByLanguage = () => {
    const groupedChannels = {};
    topChannels.forEach(channel => {
      if (!groupedChannels[channel.Lang]) {
        groupedChannels[channel.Lang] = [];
      }
      groupedChannels[channel.Lang].push(channel);
    });
    return groupedChannels;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {Object.entries(groupByLanguage()).map(([language, channels]) => (
        <div key={language} className="mb-8">
          <h2 className="mt-4 mb-2 text-xl font-semibold">{language}</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satellite Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {channels.map((channel, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap">{channel.Channel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{channel.SatelliteCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
            <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default TopChannels;
