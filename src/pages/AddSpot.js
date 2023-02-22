import { useState, useRef } from "react";
import requester  from '../utils/requester'
import { useNavigate } from "react-router-dom";

const AddSpot = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const files = useRef(null);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescr = (event) => {
    setDescription(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const newSpotForm = new FormData();
    newSpotForm.set("title", title);
    newSpotForm.set("description", description);
    newSpotForm.set("price", price);
    const arrFiles = Array.from(files.current.files);
    arrFiles.forEach(elem => {
      newSpotForm.set("images[]", elem);
    })
    try {
      const request = await requester.post(`/spots`, newSpotForm, {headers: {'Content-Type': 'multipart/form-data' }} );
      if (request.ok) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row">
      <form id="spot" encType="multipart/form-data">
        <div className="col-lg-6">
          <h2>Add a new spot</h2>
          <div className="">
            <label htmlFor="photos" className="col-form-label">Upload photos</label>
            <input type="file" className="form-control" id="photos" accept="image/jpeg" multiple aria-describedby="uploadfiles" ref={files} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Amazing spot" onChange={handleTitle} value={title}  />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="6" onChange={handleDescr} value={description} ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" step="1" min="0" onChange={handlePrice} value={price}  />
          </div>
          <div className="text-center">
            <button  className='btn btn-success mt-5 mb-2 col-12' onClick={handleAdd}>Save spot</button>
          </div>

        </div>
      </form >
    </div >
  );
}

export default AddSpot;