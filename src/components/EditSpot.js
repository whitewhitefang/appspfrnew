import { useState, useContext } from 'react';
import SpotsContext from '../store/SpotsContext';
import { useParams, Link } from 'react-router-dom';

const EditSpot = () => {
  let context = useContext(SpotsContext);
  let { id } = useParams();
  const [spot, setSpot] = useState(context.spots.find(elem => elem.id == id));

  const editReviews = reviews => {
    if (reviews.length) {
      return reviews.map(rev => {
        return (
          <div>
            <div class="mb-3">
              <label htmlFor="review" className="form-label">I wanna say...</label>
              <textarea className="form-control" id="review" rows="6" value={rev.review}></textarea>
            </div>
            <div class="mb-3">
              <label htmlFor="author" className="form-label">My name is...</label>
              <input type="text" className="form-control" id="author" value={rev.author} />
            </div>
          </div>
        );
      });
    }
    return "";
  }

  return (
    <div className="row">
      <form>
        <div className="col-lg-6">
          <h2>Edit a spot</h2>
        </div>
        <div className="col-lg-6">
          <div class="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={spot.title} />
          </div>
          <div class="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="6" value={spot.description}></textarea>
          </div>
          <div class="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" step="1" min="0" value={spot.price} />
          </div>
          <hr />
          <p>Reviews</p>
          {editReviews(spot.reviews)}
          <hr></hr>
          <div>
            <h3>Add new comment</h3>
            <div class="mb-3">
              <label htmlFor="review" className="form-label">Write what you want</label>
              <textarea className="form-control" id="review" rows="6" placeholder="I wanna say..."></textarea>
            </div>
            <div class="mb-3">
              <label htmlFor="author" className="form-label">Write your name</label>
              <input type="text" className="form-control" id="author" placeholder="My name is..." />
            </div>
          </div>
        </div>
      </form >
      <button className='btn d-flex btn-success card-spot-button text-center'>Save spot</button>
    </div >
  );
}

export default EditSpot;