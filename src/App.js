import './App.css';
import { useState, useEffect } from 'react';
import SpotList from './components/SpotList';
import AddSpot from './components/AddSpot';
import NavBar from './components/NavBar';
import NoMatchPage from './components/NoMatchPage';
import SeparateSpot from './components/SeparateSpot';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import EditSpot from './components/EditSpot';

function App() {
  const [spots, setSpots] = useState({ spots: [] });

  useEffect(() => {
    const gettingSpots = async function () {
      try {
        const request = await fetch(URL + '/spots/index', "GET");
        if (request.ok) {
          const gettedSpots = await request.json();
          setSpots(prevstate => prevstate.spots = gettedSpots);
        }
      } catch (e) {
        console.log(e);
      }
    };
    gettingSpots();
  }, []);

  return (
    <div className='container'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<SpotList />} />
          <Route path="spots">
            <Route path=":id" element={<SeparateSpot />} />
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
