// App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Import HashRouter
import AddUser from './addUser';
import Home from './Home';
import AddFavourite from './AddFavourite';
import TopNetworkProviders from './TopNetworkProviders';
import TopNetworkProviders2 from './TopNetworkProviders2';
import ChannelFilterer from './ChannelFilterer';
import TopChannels from './TopChannels';
import ChannelsByRegion from './ChannelsByRegion';
import SatelliteFilter from './SatelliteFilter';
import TopRocketLaunches from './TopRocketLaunches';
import ChannelsByHDSDFilter from './ChannelsByHDSDFilter';
import ChannelsByLanguageFilter from './ChannelsByLanguageFilter';
import UserFavouriteAvailableChannels from './UserFavouriteAvailableChannels';
import TopGrowingSatellites from './TopGrowingSatellites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/query1" element={<ChannelFilterer />} />
        <Route path="/query2" element={<AddUser />} />
        <Route path="/query3" element={<AddFavourite />} />
        <Route path="/query4" element={<TopNetworkProviders />} />
        <Route path="/query5" element={<TopNetworkProviders2 />} />
        <Route path="/query6" element={<TopRocketLaunches />} />
        <Route path="/query7" element={<TopChannels />} />
        <Route path="/query8" element={<ChannelsByRegion />} />
        <Route path="/query9" element={<SatelliteFilter />} />
        <Route path="/query10" element={<ChannelsByHDSDFilter />} />
        <Route path="/query11" element={<ChannelsByLanguageFilter />} />
        <Route path="/query12" element={<UserFavouriteAvailableChannels />} />
        <Route path="/query13" element={<TopGrowingSatellites />} />
      </Routes>
    </Router>
  );
}

export default App;
