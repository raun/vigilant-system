import { NavLink as RouterLink } from 'react-router-dom';
import { Chip, Link } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { Box, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ThumbUp, VisibilityOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FeatureSummary = ({ feature }) => {
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
            <span className="center-flex-row">
              {feature.watching ? <Visibility fontSize="large" color="primary" className="mr-1" /> : 
                <VisibilityOutlined fontSize="large" color="primary" className="mr-1" />}
            </span>
            <span className="ml-4 center-flex-row">
            {feature.liked ? <ThumbUp fontSize="large" color="primary" className="mr-1" /> : 
                <ThumbUpOutlinedIcon fontSize="large" color="primary" className="mr-1" />}
              {feature.likes}
            </span>
          </div>
        </div>
      </div>
    );
}

export default FeatureSummary;