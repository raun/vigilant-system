import { Link } from "@material-ui/core";
import { NavLink as RouterLink } from 'react-router-dom';

const HomeHeader = () => {
  return (
      <div className="pt-9 border-bottom">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <h2 className="text-bold">
              Features Request
            </h2>

            <p className="">
              Hevo is a no-code data pipeline as a service. Start moving data from any source to your data warehouse such as Redshift, BigQuery, and Snowflake in real-time.
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