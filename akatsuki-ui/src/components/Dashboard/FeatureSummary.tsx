import { NavLink as RouterLink } from 'react-router-dom';
import { Chip, Link } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { Box, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { VisibilityOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FeatureSummary = ({ feature }) => {console.log(feature)
  const [state1,setState]  = useState(false);
  const watch = useSelector((state: any) => state.watch); 
console.log(watch)
    return (
      <div className="py-4 border-bottom">
        <div className="row center-flex-row justify-between">
          <div className="col-xs-12 col-sm-8 col-md-8  center-flex-row">
            <Link component={RouterLink} to={`/feature-requests/${feature.id}`} className="text-link">
              <Box component="div" className="text-subheading-2 text-link">
                {feature.title}
              </Box> 
            </Link>
            <Chip
              label={feature.tags}
              color="primary"
              size="small"
              className="ml-2"
            />
          </div>
          
          <div className="col-xs-12 col-sm-4 col-md-4 d-flex justify-end">
            <IconButton className="cursor-hand" onClick={() => setState(!state1)}>
              {!state1 ? 
              <VisibilityOutlined fontSize="large" color="primary"  /> : 
              <Visibility fontSize="large" color="primary"  />
              } 
            </IconButton>
            <IconButton className="cursor-hand ml-2">
              <ThumbUpOutlinedIcon fontSize="large" color="primary"  />
            </IconButton>
          </div>
        </div>
      </div>
    );
}

export default FeatureSummary;