import { NavLink as RouterLink } from 'react-router-dom';
import { Container, Link } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { Box, IconButton } from '@material-ui/core';
import { Comment } from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFeaturesDetails } from '../../redux/action/getFeatureDetails';
import Loading from "../Shared/Loading";

const FeatureDetails = (props) => {
  const featureId = props.match.params.featureId;
  const dispatch = useDispatch();
  const {loading, details} = useSelector((state: any) => state.featureDetails)
  
  useEffect(() => {
    dispatch(getFeaturesDetails(featureId))
  }, [])

  return (
    <div>
      <Loading open={loading} />
      <Container maxWidth="md" >
        <div className="pt-5 border-bottom">
          <div className="row center-flex-row text-title mb-5">
              {details.title}
          </div>
          <div className="row center-flex-row text-subheading-1 mb-5">
            {details.description}
          </div>
          <div className="row d-flex">
            <IconButton className="cursor-hand">
              <ThumbUpOutlinedIcon fontSize="large"  />
            </IconButton>
          </div>
        </div>
        <div>
          <Comment />
        </div>
      </Container>
    </div>
  );
}

export default FeatureDetails;