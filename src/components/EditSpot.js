import { useState, useEffect } from 'react';
import requester  from '../utils/requester'
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './Loader';


const EditSpot = ({spots}) => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [spot, setSpot] = useState({})
  const [reviews, setReviews] = useState(spot?.reviews || []);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if (spots && spots.length > 0) {
      setSpot(spots.find(elem => elem.id == id));
    } else {
      const fetchData = async () => {
        try {
          const response = await requester.get(`/spots/${id}`);

          setSpot(response.data);
        } catch (error) {
        }
      };

      fetchData();
    }
    setLoading(false);
	}, [])

  const handleTitle = event => {
    let newSpot = { ...spot };
    newSpot.title = event.target.value;
    setSpot(newSpot);
  };

  const handleDescr = event => {
    let newSpot = { ...spot };
    newSpot.description = event.target.value;
    setSpot(newSpot);
  }

  const handlePrice = event => {
    let newSpot = { ...spot };
    newSpot.price = event.target.value;
    setSpot(newSpot);
  };

  const handleDeleteReview = (event, reviewId) => {
    const newReviews = [...reviews]
    newReviews.splice(+reviewId, 1);
    setReviews(newReviews);
  }

  const setReviewText = event => {
    setNewReviewText(event.target.value);
  }

  const setReviewAuthor = event => {
    setNewReviewAuthor(event.target.value);
  }

  const saveReview = async (event) => {
    if (newReviewText.trim() && newReviewAuthor.trim()) {
      let oldReviews = [...reviews];
      const newReview = { 'review': newReviewText, 'author': newReviewAuthor };
      const newReviews = oldReviews.push(newReview);
      setReviews(newReviews);
    } else {
      event.preventDefault();
    }
  }

  const handleEditReviewText = (event, reviewId) => {
    let newReviews = [...reviews];
    let newReview = newReviews[reviewId];
    newReview.review = event.target.value;
    newReviews[reviewId] = newReview;
    setReviews(newReviews);
  }

  const handleEditReviewAuthor = (event, reviewId) => {
    let newReviews = [...reviews];
    let newReview = newReviews[reviewId];
    newReview.author = event.target.value;
    newReviews[reviewId] = newReview;
    setReviews(newReviews);
  }

  const submitEdit = async () => {
    try {
      const request = await requester.patch(`/spots/${id}`, { spot });
      if (request.ok) {
        navigate(`/spots/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editReviews = reviews => {
    if (reviews && reviews.length) {
      return reviews.map((rev, ind) => {
        return (
          <div key={'rev' + ind}>
            <div className="mb-3 mt-4">
              <label htmlFor="review" className="form-label">Comment</label>
              <textarea className="form-control" id="review" rows="6" value={spot.reviews[ind].review} onChange={e => handleEditReviewText(e, ind)}></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="form-label">Name</label>
              <input type="text" className="form-control" id="author" value={spot.reviews[ind].author} onChange={e => handleEditReviewAuthor(e, ind)} />
            </div>
            <button className='btn btn-danger' type='button' onClick={e => handleDeleteReview(e, ind)}>Delete this comment</button>
            <hr className='mb-4' />
          </div>
        );
      });
    }
    return "";
  }

    if (loading) {
      return (
        <div className="row">
          <div className="col-lg-12">
            <Loader />
          </div>
        </div>
      );
    } else {
      console.log('spot');
      console.log(spot);
      return (
    <div className="row">
      <div className="col-lg-6">
        <h3>Edit a spot</h3>
        <form id='spot'>
          <div className="mb-3 mt-4">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={spot.title} onChange={handleTitle} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="6" value={spot.description} onChange={handleDescr}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" step="1" min="0" value={spot.price} onChange={handlePrice} />
          </div>
          <button className='btn btn-success text-center col-12' type='button' onClick={submitEdit}>Save spot</button>
        </form>
      </div>
      <div className='col-lg-6'>
        <h3>Reviews</h3>
        <form id="reviews">
          {editReviews(reviews)}
          <button className='btn btn-success col-12 mb-5'>Save reviews</button>
          <div>
            <h3>Add new comment</h3>
            <div className="mb-3">
              <label htmlFor="review" className="form-label">Write what you want</label>
              <textarea className="form-control" id="review" rows="4" placeholder="I wanna say..." value={newReviewText} onChange={setReviewText}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Write your name</label>
              <input type="text" className="form-control" id="author" placeholder="My name is..." value={newReviewAuthor} onChange={setReviewAuthor} />
            </div>
            <button className='btn btn-success col-12' onClick={saveReview}>Add the comment</button>
          </div>
        </form>
      </div >
    </div >
    );
  };
}

export default EditSpot;