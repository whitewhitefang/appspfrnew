const CarouselInner = props => {
  const images = props.images.map((elem, index) => {
    if (index === 0) {
      return (
        <div className="carousel-item active" key={elem + index}>
          <img src={elem} className="d-block w-100" alt="" />
        </div>
      );
    }
    return (
      <div className="carousel-item" key={elem + index}>
        <img src={elem} className="d-block w-100" alt="" />
      </div>
    );
  });

  return (
    <div className="carousel-inner">
      {images}
    </div>
  );
}

export default CarouselInner;