import { useState, useContext } from 'react';
import SpotsContext from '../store/SpotsContext';
import { useParams, Link } from 'react-router-dom';

const EditSpot = () => {
  let context = useContext(SpotsContext);
  let { id } = useParams();
  const [spot, setSpot] = useState(context.spots.find(elem => +elem.id === +id));

  function submitEdit() { }

  const editReviews = reviews => {
    if (reviews.length) {
      return reviews.map((rev, ind) => {
        return (
          <div key={'rev' + ind}>
            <div class="mb-3 mt-4">
              <label htmlFor="review" className="form-label">Comment</label>
              <textarea className="form-control" id="review" rows="6" value={rev.review}></textarea>
            </div>
            <div class="mb-4">
              <label htmlFor="author" className="form-label">Name</label>
              <input type="text" className="form-control" id="author" value={rev.author} />
            </div>
            <button className='btn btn-danger'>Delete this comment</button>
            <hr className='mb-4' />
          </div>
        );
      });
    }
    return "";
  }

  return (
    <div className="row">
      <div className="col-lg-6">
        <h2>Edit a spot</h2>
        <form id='spot'>
          <div class="mb-3 mt-4">
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
          <button className='btn btn-success text-center col-12'>Save spot</button>
        </form>
      </div>
      <div className='col-lg-6'>
        <h3>Reviews</h3>
        <form id="reviews">
          {editReviews(spot.reviews)}
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
        </form>
      </div>
    </div >
  );
}

export default EditSpot;