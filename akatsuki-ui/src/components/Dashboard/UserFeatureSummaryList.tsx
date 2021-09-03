import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserRequests } from '../../redux/action/getUserFeatures';
import UserFeatureSummary from './UserFeatureSummary';
import { useState } from 'react';

const UserFeatureSummaryList = () => {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  const {loading, userFeatures} = useSelector((state: any) => state.userFeatures);
  useEffect(() => {
    dispatch(getUserRequests(1));
  },[change])

  return (
    <div>
      {userFeatures.map((feature: any) => 
        <UserFeatureSummary key={feature.id} feature={feature} change={change} setChange={setChange} />
      )}
    </div>
  );
}

export default UserFeatureSummaryList;
