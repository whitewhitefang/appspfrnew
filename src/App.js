import './App.css';
import SpotList from './components/SpotList';
import AddSpot from './components/AddSpot';
import NavBar from './components/NavBar';
import NoMatchPage from './components/NoMatchPage';
import SeparateSpot from './components/SeparateSpot';
import { Route, BrowserRouter, Routes, useParams } from 'react-router-dom';
import Loader from './components/Loader';
import EditSpot from './components/EditSpot';

function App() {
  const { id } = useParams();
  console.log(id)
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
