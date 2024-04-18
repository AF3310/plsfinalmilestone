import React, { useState } from 'react';
import ReturnHomeButton from './returnHomeButton';

const AddUser = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bday, setBday] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [direction, setDirection] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false); 

    try {
      
      const userData = {
        username,
        email,
        bday,
        gender,
        location,
        region,
        coordinates,
        direction
      };

      // Send POST request to backend
      const response = await fetch('https://plsfinalmilestone-edwsqlquk-ali-fakhreldins-projects.vercel.app/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }


      setUsername('');
      setEmail('');
      setBday('');
      setGender('');
      setLocation('');
      setRegion('');
      setCoordinates('');
      setDirection('');
 
      setSuccess(true);

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add user. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input mt-1 block w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input mt-1 block w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="bday" className="block text-gray-700">Birthday:</label>
          <input type="date" id="bday" value={bday} onChange={(e) => setBday(e.target.value)} className="form-input mt-1 block w-full" required />
        </div>
        <div className="mb-4">
  <label htmlFor="gender" className="block text-gray-700">Gender:</label>
  <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="form-select mt-1 block w-full" required>
    <option value="">Select Gender</option>
    <option value="Female">Female</option>
    <option value="Male">Male</option>
  </select>
</div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">Location:</label>
          <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="form-input mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="region" className="block text-gray-700">Region:</label>
          <input type="text" id="region" value={region} onChange={(e) => setRegion(e.target.value)} className="form-input mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="coordinates" className="block text-gray-700">Coordinates:</label>
          <input type="number" id="coordinates" value={coordinates} onChange={(e) => setCoordinates(e.target.value)} className="form-input mt-1 block w-full" />
        </div>
        <div className="mb-4">
  <label htmlFor="direction" className="block text-gray-700">Direction:</label>
  <select id="direction" value={direction} onChange={(e) => setDirection(e.target.value)} className="form-select mt-1 block w-full" required>
    <option value="">Select Direction</option>
    <option value="W">W</option>
    <option value="E">E</option>
    <option value="N">N</option>
    <option value="S">S</option>
  </select>
</div>

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">User added successfully!</div>} 
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add User</button>
      </form>
      <div className='mt-10'></div>
      <ReturnHomeButton />
    </div>
  );
};

export default AddUser;
