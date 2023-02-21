import { useState, useEffect } from "react";
import Spot from "./Spot";
import Loader from './Loader';

const SpotList = props => {
  const [spots, setSpots] = useState(props.sdata);

  useEffect(() => {
    setSpots(props.sdata);
  }, [props.sdata]);

  if (props.loading) {
    return (
      <div className="row">
        <div className="col-lg-12">
          <Loader />
        </div>
      </div>
    );
  } else if (spots.length > 0) {
    return (
      <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-5 mt-2">
        {spots.map((spot, index) => {
          return <Spot
            key={spot.title + index}
            spot={spot}
          />
        })}
      </div>
    );} else {
      return (
        <div className="row">
          No spots are available
        </div>
      );
    }

  }

export default SpotList;
