import React, { useState, useEffect } from 'react';
import ReturnHomeButton from './returnHomeButton';
const TopGrowingSatellites = () => {
    const [satellites, setSatellites] = useState([]);

    useEffect(() => {
        fetch('https://plsfinalmilestone-edwsqlquk-ali-fakhreldins-projects.vercel.app/topGrowingSatellites')
            .then(response => response.json())
            .then(data => {
              
                const updatedData = data.map(satellite => ({
                    ...satellite,
                    growth_rate: parseFloat(satellite.growth_rate)
                }));
                setSatellites(updatedData);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
               
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Top 5 Growing Satellites</div>
                    <ul className="divide-y divide-gray-200">
                        {satellites.map((satellite, index) => (
                            <li key={index} className="py-4">
                                <div className="flex space-x-3">
                                    <div className="space-y-1">
                                        <p className="text-lg font-semibold text-gray-900">{satellite.SatelliteName}</p>
                                        <p className="text-sm text-gray-500">{typeof satellite.growth_rate === 'number' ? satellite.growth_rate.toFixed(2) : 'N/A'} channels/year</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='mt-10'></div>
      <ReturnHomeButton />
        </div>
    );
};

export default TopGrowingSatellites;
