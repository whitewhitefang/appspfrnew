const AddSpot = () => {

  return (
    <div className="row">
      <form>
        <div className="col-lg-6">
          <h2>Add a new spot</h2>
          <div className="">
            <label htmlFor="photos" className="col-form-label">Upload photos</label>
            <input type="file" className="form-control" id="photos" aria-describedby="uploadfiles" />
          </div>
        </div>
        <div className="col-lg-6">
          <div class="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Amazing spot" />
          </div>
          <div class="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="6"></textarea>
          </div>
          <div class="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" step="1" min="0" />
          </div>
          <button className='btn d-flex btn-success mb-0 card-spot-button text-center'>Save spot</button>
        </div>
      </form >
    </div >
  );
}

export default AddSpot;