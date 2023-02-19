import { Link } from "react-router-dom";

const AuthorizeBlock = () => {

  return (
    <div className="d-flex ms-5">
      <Link to={'/add'} className="btn btn-success m-2" type="button">Add spot</Link>
      <button className="btn btn-outline-success m-2" type="button">Login</button>
    </div>
  );
}

export default AuthorizeBlock;