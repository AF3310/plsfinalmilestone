import React, { useState } from 'react';
import ReturnHomeButton from './returnHomeButton';

const ChannelsByLanguageFilter = () => {
    const [lang, setLang] = useState('');
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8081/channelsByLanguageFilter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lang }),
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
            <h2 className="text-2xl font-bold mb-4">Channels By Language Filter</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <label htmlFor="lang" className="block mb-2">Enter Language:</label>
                <input
                    type="text"
                    id="lang"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Filter</button>
            </form>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {channels.length === 0 ? (
                <div className="text-gray-500">No channels available in this language!</div>
            ) : (
                <ul>
                    {channels.map((channel, index) => (
                        <li key={index} className="py-2 border-b border-gray-200">{channel.ChannelName} - {channel.Lang}</li>
                    ))}
                </ul>
            )}
            <div className='mt-10'></div>
            <ReturnHomeButton />
        </div>
    );
};

export default ChannelsByLanguageFilter;
