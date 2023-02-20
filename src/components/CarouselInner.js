const CarouselInner = props => {
  const images = props.images.map((elem, index) => {
    if (index === 0) {
      return (
        <div className="carousel-item active" key={elem['url'] + index}>
          <img src={elem['url']} className="d-block w-100" style={{maxHeight: 400 + 'px'}} alt="" />
        </div>
      );
    }
    return (
      <div className="carousel-item" key={elem['url'] + index}>
        <img src={elem['url']} className="d-block w-100" alt="" />
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