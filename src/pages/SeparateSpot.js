import { useState, useEffect } from 'react';
import requester  from '../utils/requester'
import Carousel from "../components/Carousel";
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';

const SeparateSpot = ({spots}) => {
  let { id } = useParams();
  const [spot, setSpot] = useState({spot:{id: 0, title: '', description: '', price: 0, reviews: [], images: [{}]}});
  const [loading, setLoading] = useState(true);

  const revblock = arr => {
    return arr.map((rev, ind) => {
      return (
        <li key={'li' + ind}>
          <q className='me-2'>{rev.content}</q>
          <cite>{rev.author}</cite>
        </li>
      );
    });
  };

  useEffect(()=>{
    if (spots && spots.length > 0) {
      const current_spot = spots.find(elem => elem.id == id)
      setSpot(current_spot);
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          const response = await requester.get(`/spots/${id}`);

          setSpot(prevstate => prevstate.spots = response.data);
          setLoading(false);
        } catch (error) {
        }
      };

      fetchData();
    }

}, [])


  if (loading) {
    return (
      <div className="row">
        <div className="col-lg-12">
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div className="row mt-2">
        <div className="col-lg-6">
          { spot.images && <Carousel images={spot.images} carId={'car' + id} /> }
        </div>
        <div className="col-lg-6">
          <h3>{spot.title}</h3>
          <p>{spot.price}</p>
          <div>
            <p>{spot.description}</p>
          </div>
          <div>
            <h5>Reviews:</h5>
            <ul>
              {spot.reviews && spot.reviews.length ? revblock(spot.reviews) : "It hasn't been reviewed yet"}
            </ul>
          </div>
          <Link to={`/spot-edit/${id}`} className='btn col-12 mt-5 btn-success btn-down'>Edit the spot</Link>
        </div>
      </div>
    );
  }
}

export default SeparateSpot;