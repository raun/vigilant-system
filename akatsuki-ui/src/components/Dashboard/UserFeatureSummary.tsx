import { NavLink as RouterLink } from 'react-router-dom';
import { Chip, Link } from '@material-ui/core';
import { Box } from '@material-ui/core';

const UserFeatureSummary = ({feature}) => {

  return (
    <div className="py-4 border-bottom">
      <div className="row center-flex-row justify-between">
        <div className="col-xs-12">
          <Link component={RouterLink} to={`/feature-requests/${feature.id}`} className="text-link mr-3">
            <Box component="span" className="text-subheading-2 text-link">
              {feature.title}
            </Box> 
          </Link>
          <Chip
            label={feature.tags}
            color="primary"
            size="small"
          />
        </div>
      </div>
    </div>
  );
}

export default UserFeatureSummary;
