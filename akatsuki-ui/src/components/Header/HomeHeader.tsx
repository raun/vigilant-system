import { Link } from "@material-ui/core";
import { NavLink as RouterLink } from 'react-router-dom';

const HomeHeader = () => {
  return (
      <div className="pt-9 pb-5 border-bottom">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <h2 className="text-bold mb-5">
              Feature Requests
            </h2>

            <p className="mb-5">
              Share your ideas with us. Your ideas are widely appreciated and recognized at Hevo. Upvoting existing requests will help us priorities your requests.
              You can choose to recieve updates via slack or email.
            </p>
          </div>

          <Link to="/feature-request-form"
            component={RouterLink}
            color="inherit"
            className="py-2 px-2 cursor-hand"
            style={{ color: '#fff' }}>
            <button className="btn btn-primary">
              Submit a feature
            </button>
          </Link>
        </div>
      </div>
  );
}

export default HomeHeader