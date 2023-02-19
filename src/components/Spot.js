import Carousel from './Carousel';
import Review from './Review';
import { truncate } from '../helpers'
import { Link } from 'react-router-dom';

const Spot = (props) => {

  return (
    <div className='col'>
      <div className="card border-light h-100">
        <Carousel images={props.spot.images} carId={'id' + String(Math.floor(Math.random() * 10000))} />
        <div className="card-body">
          <div>
            <h5 className="card-title">{props.spot.title}</h5>
            <p className="card-text text-start">{truncate(props.spot.description, 18)}</p>
            <div className="card-review-block mb-5">
              {props.spot.reviews.length ? <Review review={props.spot.reviews[0]} /> : ""}
            </div>
          </div>
          <Link to={`/spots/${props.spot.id}`} className="btn btn-primary mb-0 d-flex card-spot-button text-center">Show me more</Link>
        </div>
        <div className='card-footer d-flex'>
          <span title="per dog an hour">${props.spot.price}</span>
          <span className="text-end" title={props.spot.reviews.length + " reviews"}>
            {props.spot.reviews.length}
            <svg className="star ms-1 bi bi-star-fill" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gold" viewBox="0 0 20 20">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Spot;