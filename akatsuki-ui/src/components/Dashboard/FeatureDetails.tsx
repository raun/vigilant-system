import { Avatar, Button, Chip, Container, Link, Step, StepLabel, Stepper, Tooltip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { IconButton } from '@material-ui/core';
import { Comment } from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFeaturesDetails } from '../../redux/action/getFeatureDetails';
import Loading from "../Shared/Loading";
import './dashboard.scss'
import { ThumbUp, Visibility, VisibilityOutlined } from '@material-ui/icons';
import { watchClick, unwatchClick } from '../../redux/action/watchAction';
import { upvoteClick, downvoteClick } from '../../redux/action/upvoteAction';

const FeatureDetails = (props) => {
  const featureId = props.match.params.featureId;
  const dispatch = useDispatch();
  let {loading, details} = useSelector((state: any) => state.featureDetails);
  const [click, setClick] = useState(false);

  // const data = details
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['To be Picked', 'Chosen for Development', 'Under Development', 'To be released in a week', 'Deployed'];

console.log(details)
  useEffect(() => {
    dispatch(getFeaturesDetails(featureId, 1))
  }, [click])

  return (
    <div className="pt-9">
      <Loading open={loading} />
      {/* <Stepper className="position-sticky" activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper> */}
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
            <div className="row center-flex-row text-display-2 mb-5">
              {details.title} 
              <Chip
                label={details.tags}
                color="primary"
                size="small"
                className="ml-2"
              />
            </div>
            <div className="row center-flex-row text-subheading-1 mb-5">
              {details.description}
            </div>
            <div className="row d-flex">
              <IconButton className="cursor-hand mr-2" onClick={() => {
                  details.liked ?
                   dispatch(downvoteClick(details.creator_id, details.id)) :
                   dispatch(upvoteClick(details.creator_id, details.id, 1))
                  setClick(!click)
                  }}>
                {
                  details.liked ?
                    <ThumbUp fontSize="large" className="mr-1" /> :
                    <ThumbUpOutlinedIcon fontSize="large" className="mr-1" />
                }
                 {details.likes} upvote
              </IconButton>

              <Tooltip className="text-body-2" title="Watch">
                <IconButton className="cursor-hand" onClick={() => {
                  !details.watching ?
                   dispatch(watchClick(details.creator_id, details.id, 3)) :
                   dispatch(unwatchClick(details.creator_id, details.id))
                   setClick(!click)
                  }}>
                  {
                    details.watching ?
                      <Visibility fontSize="large" className="mr-1" /> :
                      <VisibilityOutlined fontSize="large" className="mr-1" />
                  }
                </IconButton>
              </Tooltip>
              {/* <Button
                variant="contained"
                color="primary"
                size="small"
                // className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button> */}
            </div>
          </div>
          <div>
            <Comment featureId={details.id} userId={details.id} />
          </div>
        </Container>
    </div>
  );
}

export default FeatureDetails;