import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import PublicRoute from './publicRoutes';
import AdminRoute from './adminRoutes';

import Header from '../components/Header/Header';
import LogIn from '../components/Auth/Login';
import SignUp from '../components/Auth/Signup';
import HomePage from '../components/Dashboard/Home';
import FeatureRequestForm from '../components/Dashboard/FeatureRequestForm'
import '../styles/app.scss';

const Routes = () => {
	return (
		<Switch>
			{/* <AdminRoute path="/admindashboard" exact component={'AdminDashboard'} />
			<PrivateRoute path="/userdashboard" exact component={'UserDashboard'} />
			<PublicRoute
				restricted={true}
				path="/auth/activate/:token"
				exact
				component={'Activate'}
			/> */}
			<Header />
			<PublicRoute restricted={true} path="/signup" exact component={SignUp} />
			<PublicRoute restricted={false} path="/login" exact component={LogIn} />
			<PublicRoute restricted={false} path="/" exact component={HomePage} />
			<PublicRoute restricted={false} path="/feaure-request-form" exact component={FeatureRequestForm} />
		</Switch>
	);
};

export default Routes;
