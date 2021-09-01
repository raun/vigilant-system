import { Container } from "@material-ui/core";
import HomeHeader from "../Header/HomeHeader";
import FeatureSummary from "./FeatureSummary";
import { useDispatch, useSelector } from 'react-redux';
import  { getAllRequests } from '../../redux/action/getAllRequests';
import { useState, useEffect } from "react";
import { Features } from '../../redux/reducer/featureRequestsReducer';

const HomePage = () => {
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();
  const allFeatures: Features = useSelector((state: any) => state.features);
  useEffect(() => {
    dispatch(getAllRequests());
  }, [])

  return (
    <Container maxWidth="md">
      <HomeHeader />
      {
        allFeatures.featuresRequests.map((feature) => (
          <FeatureSummary key={feature.id} feature={feature} />
        ))
      }
    </Container>
  )
}

export default HomePage;
