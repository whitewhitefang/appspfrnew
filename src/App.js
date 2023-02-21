import './App.css';
import { useState, useEffect } from "react";
import SpotList from './components/SpotList';
import AddSpot from './components/AddSpot';
import NavBar from './components/NavBar';
import NoMatchPage from './components/NoMatchPage';
import SeparateSpot from './components/SeparateSpot';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import EditSpot from './components/EditSpot';
import requester from './utils/requester';


function App() {
  const [spots, setSpots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("");
  const [orderTo, setOrderTo] = useState("");

  const setOrdering = (currOrder, currOrderTo) => {
    setOrder(currOrder);
    setOrderTo(currOrderTo);
  };

  const sorting = (ord, ordTo, dataset) => {
    if (ord === "price") {
      const newData = dataset.sort((a, b) => {
        return ordTo === "up" ? a.price - b.price : b.price - a.price;
      });
      return newData;
    }
    if (ord === "rank") {
      const newData = dataset.sort((a, b) => {
        return ordTo === "up" ? a.reviews.length - b.reviews.length : b.reviews.length - a.reviews.length;
      });
      return newData;
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await requester.get('/spots');

        setSpots(response.data);
      } catch (error) {
      }
      setLoading(false);
    };

    fetchData();
	}, []);

  useEffect(() => {
    let spots = [...spots];
    if (!order && !orderTo) {
      setSpots(spots);
    } else {
      const newSpots = sorting(order, orderTo, spots);
      setSpots(newSpots);
    }
  }, [order, orderTo]);


  return (
    <div className='container'>
      <BrowserRouter>
        <NavBar changeOrder={setOrdering} order={order} orderTo={orderTo} />
        <Routes>
          <Route path="/" element={<SpotList sdata={spots} order={order} orderTo={orderTo} isLoading={loading} />} />
          <Route path="spots">
            <Route path=":id" element={<SeparateSpot spots={spots} />} />
          </Route>
          <Route path="spot-edit">
            <Route path=":id" element={<EditSpot spots={spots} />} />
          </Route>
          <Route path="add" element={<AddSpot />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
