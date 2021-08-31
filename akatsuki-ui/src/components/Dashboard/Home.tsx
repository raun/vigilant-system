import { Container } from "@material-ui/core";
import HomeHeader from "../Header/HomeHeader";
import CommentSummary from "./CommentSummary";
import { useDispatch, useSelector } from 'react-redux';
import  { getAllRequests } from '../../redux/action/getAllRequests';
import { useEffect } from "react";

const HomePage = () => {
  const requests = ['jkfjsdkjfajskfj' , 'fjldjfakdjf']

  const showRequest = requests.map((request) => (
      <CommentSummary key={request} request={request} />
    ))

console.log(showRequest)
  return (
    <Container maxWidth="md">
      <HomeHeader />
      {
        requests.map((request) => (
          <CommentSummary key={request} request={request} />
        ))
      }
    </Container>
  )
}

export default HomePage;
