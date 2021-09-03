import { NavLink as RouterLink } from 'react-router-dom';
import { Button, Chip, IconButton, Link } from '@material-ui/core';
import { Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFeature } from '../../redux/action/deleteFeature'

const UserFeatureSummary = ({feature, change, setChange}) => {

  const dispatch = useDispatch();

  return (
    <div className="py-4 border-bottom">
      <div className="row center-flex-row justify-between">
        <div className="col-xs-12 col-sm-10">
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
        <div className="col-xs-12 col-sm-2">
          <IconButton
            onClick={() => {
              dispatch(deleteFeature(feature.id))
              setChange(!change)
            }}
            >
           <DeleteIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default UserFeatureSummary;
