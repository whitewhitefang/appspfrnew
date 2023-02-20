import { useState, useEffect } from 'react';
import requester  from '../utils/requester'
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './Loader';


const EditSpot = ({spots}) => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [spot, setSpot] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if (spots && spots.length > 0) {
      const current_spot = spots.find(elem => elem.id == id)
      setSpot(current_spot);
      setReviews(current_spot.reviews);
    } else {
      const fetchData = async () => {
        try {
          const response = await requester.get(`/spots/${id}`);

          setSpot(response.data);
          setReviews(response.data.reviews);
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
      const newReview = { 'content': newReviewText, 'author': newReviewAuthor };
      try {
        const request = await requester.post(`/spot_reviews`, { spot_review: newReview, spot_id: id });
        if (request.ok) {
          navigate(`/spots/${id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      event.preventDefault();
    }
  }

  const handleEditReviewText = (event, reviewId) => {
    let newReviews = [...reviews];
    let newReview = newReviews[reviewId];
    newReview.content = event.target.value;
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

  const submitEditReviews = async (rev) => {
    try {
      const request = await requester.patch(`/spot_reviews/${id}`, { spot_review: rev });
      if (request.ok) {
        navigate(`/spots/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
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
              <textarea type="text" className="form-control" id="content" rows="6" value={spot.reviews[ind].content} onChange={e => handleEditReviewText(e, ind)}></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="form-label">Name</label>
              <input type="text" className="form-control" id="author" value={spot.reviews[ind].author} onChange={e => handleEditReviewAuthor(e, ind)} />
            </div>
            <button className='btn btn-success col-12 mb-5' type='button' onClick={e => submitEditReviews(rev)}>Save review</button>
            <hr className='mb-4' />
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
        <form id="new_review">
          {editReviews(reviews)}
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