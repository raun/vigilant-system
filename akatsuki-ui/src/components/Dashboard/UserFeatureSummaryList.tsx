import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserRequests } from '../../redux/action/getUserFeatures';
import UserFeatureSummary from './UserFeatureSummary';

const UserFeatureSummaryList = () => {
  const dispatch = useDispatch();
  const {loading, userFeatures} = useSelector((state: any) => state.userFeatures);
  useEffect(() => {
    dispatch(getUserRequests(1));
  },[])

  return (
    <div>
      {userFeatures.map((feature: any) => 
        <UserFeatureSummary key={feature.id} feature={feature} />
      )}
    </div>
  );
}

export default UserFeatureSummaryList;
