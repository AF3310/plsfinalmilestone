import React, { useState } from 'react';
import ReturnHomeButton from './returnHomeButton';
const ChannelsByHDSDFilter = () => {
    const [hdsd, setHdsd] = useState('');
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://plsfinalmilestone-edwsqlquk-ali-fakhreldins-projects.vercel.app/channelsByHDSDFilter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hdsd }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setChannels(data);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch data. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
             
            <h2 className="text-2xl font-bold mb-4 text-center">Channels By HD/SD Filter</h2>
           
            <form onSubmit={handleSubmit} className="mb-4 flex items-center">
                <label htmlFor="hdsd" className="mr-2">HD/SD:</label>
                <input
                    type="text"
                    id="hdsd"
                    value={hdsd}
                    onChange={(e) => setHdsd(e.target.value)}
                    required
                    className="border rounded px-2 py-1 flex-1 focus:outline-none"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-1 ml-2 rounded hover:bg-blue-600 transition duration-300">Filter</button>
            </form>

            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

            <ul>
            {channels.filter(channel => !(/^\[.*\]$/.test(channel.ChannelName))).map((channel, index) => (
    <li key={index} className="mb-2">{channel.ChannelName} - {channel.hdsd}</li>
))}


            </ul>
            <div className='mt-10'></div>
      <ReturnHomeButton />
        </div>
    );
};

export default ChannelsByHDSDFilter;
