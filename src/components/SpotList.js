import Spot from "./Spot";

const SpotList = (props) => {

  return (
    <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-5 mt-2">
      {props.spots.map((spot, index) => {
        return <Spot
          key={spot.title + index}
          spot={spot}
        />
      })}
    </div>
  );
}

export default SpotList;