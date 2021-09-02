import { NavLink as RouterLink } from 'react-router-dom';
import { Avatar, Container, Link, Step, StepLabel, Stepper } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { Box, IconButton } from '@material-ui/core';
import { Comment } from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFeaturesDetails } from '../../redux/action/getFeatureDetails';
import Loading from "../Shared/Loading";
import './dashboard.scss'

const FeatureDetails = (props) => {
  const featureId = props.match.params.featureId;
  const dispatch = useDispatch();
  const {loading, details} = useSelector((state: any) => state.featureDetails)
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['To be Picked', 'Chosen for Development', 'Under Development', 'To be released in a week', 'Deployed'];


  useEffect(() => {
    dispatch(getFeaturesDetails(featureId))
  }, [])

  return (
    <div>
      <Loading open={loading} />
      <Stepper className="position-sticky" activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Container maxWidth="md" >
          <div className="p-5 border-bottom">
            {/* <div>
              <Avatar
                // alt={review.user.name}
                // src={`${imageUrl}/${review.user.image}`}
                className="mb-2">
                A
              </Avatar>
            </div> */}
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