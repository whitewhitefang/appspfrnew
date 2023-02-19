import CarouselInner from "./CarouselInner";

const Carousel = props => {
  return (
    <div id={props.carId.toString()} className="carousel slide carousel-fade">
      <CarouselInner images={props.images} />
      <button className="carousel-control-prev" type="button" data-bs-target={'#' + props.carId} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={'#' + props.carId} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div >
  );
}

export default Carousel;