import React, { useState } from 'react';
import ReturnHomeButton from './returnHomeButton';

const AddFavourite = () => {
  const [channelName, setChannelName] = useState('');
  const [email, setEmail] = useState('');
  const [responseStatus, setResponseStatus] = useState(null); // State to track response status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://plsfinalmilestone-edwsqlquk-ali-fakhreldins-projects.vercel.app/addFavourites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channels: channelName, email: email })
      });
      const data = await response.json();
      
      console.log(data);
      // Set response status based on the data received
      if (data.error) {
        setResponseStatus('error');
      } else if (data.message) {
        setResponseStatus('success');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Favourite</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="channelName">Channel(s) Name:</label>
          <input 
            type="text" 
            id="channelName" 
            value={channelName} 
            onChange={(e) => setChannelName(e.target.value)} 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
        >
          Add Favourite
        </button>
      </form>
      <div className='mt-4'>

        {responseStatus === 'error' && <div className="w-4 h-4 bg-red-500 rounded-full inline-block mr-2"></div>}
        {responseStatus === 'success' && <div className="w-4 h-4 bg-green-500 rounded-full inline-block mr-2"></div>}
        {responseStatus && ( // Render status message if response status is set
          <span className={responseStatus === 'error' ? 'text-red-500' : 'text-green-500'}>
            {responseStatus === 'error' ? 'Failed to add favourite' : 'Favourite added successfully'}
          </span>
        )}
      </div>
      <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default AddFavourite;
