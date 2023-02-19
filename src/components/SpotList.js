import { useState, useContext } from "react";
import Spot from "./Spot";
import Loader from './Loader';
import SpotsContext from "../store/SpotsContext";

const SpotList = () => {
  const context = useContext(SpotsContext);
  // Mock-data
  const [data, setData] = useState(context.spots);

  let [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="row">
        <div className="col-lg-12">
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-5 mt-2">
        {data.map((spot, index) => {
          return <Spot
            key={spot.title + index}
            spot={spot}
          />
        })}
      </div>
    );
  }
}

export default SpotList;