import dog from '../imgs/dog.png';
import AuthorizeBlock from './AuthorizeBlock';
import Search from './Search';
import { useState } from 'react';
import Arrow from './Arrow';

const NavBar = props => {
  const [toUpOrder, setToUpOrder] = useState(props.order);
  const [order, setOrder] = useState(props.orderTo);

  const settingOrder = event => {
    event.preventDefault();
    const order = event.target.dataset['order'];
    const orderTo = toUpOrder === "up" ? "down" : "up";
    setOrder(order);
    setToUpOrder(orderTo);
    props.changeOrder(order, orderTo);
  };

  return (
    <div className="row mt-4">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand me-5" href="/">
            <img src={dog} width="70" alt="dogspots" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active m-4" aria-current="page" href="/">All spots</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active m-4" aria-current="page" href="/" data-order="price" onClick={settingOrder}>
                    Best price
                    {order === "price" ? <Arrow orderMark={toUpOrder} /> : ""}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active m-4" aria-current="page" href="/" data-order="rank" onClick={settingOrder}>
                  Best rank
                  {order === "rank" ? <Arrow orderMark={toUpOrder} /> : ""}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active m-4" aria-current="page" href="/">Near by</a>
              </li>
            </ul>
            <Search />
            <AuthorizeBlock />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;