import nomatch from '../imgs/nomatch.jpeg';

const NoMatchPage = () => {

  return (
    <div className='row'>
      <div className="col-lg-12 nomatch">
        <div className='wounderdog text-center'>
          <img src={nomatch} width="60%" alt="" />
          <h3>Sorry, there is no such page</h3>
        </div>
      </div>
    </div>
  );
};

export default NoMatchPage;