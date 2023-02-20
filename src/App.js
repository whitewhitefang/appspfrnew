import './App.css';
import { useState } from "react";
import SpotList from './components/SpotList';
import AddSpot from './components/AddSpot';
import NavBar from './components/NavBar';
import NoMatchPage from './components/NoMatchPage';
import SeparateSpot from './components/SeparateSpot';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import EditSpot from './components/EditSpot';

function App() {
  const [spots, setSpots] = useState({ spots: [] });

  return (
    <div className='container'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<SpotList spots={spots} setSpots={setSpots} />} />
          <Route path="spots">
            <Route path=":id" element={<SeparateSpot spots={spots} />} />
          </Route>
          <Route path="spot-edit">
            <Route path=":id" element={<EditSpot />} />
          </Route>
          <Route path="add" element={<AddSpot />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
