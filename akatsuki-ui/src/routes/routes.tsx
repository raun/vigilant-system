import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import PublicRoute from './publicRoutes';
import AdminRoute from './adminRoutes';

import SignUp from '../components/Auth/signup';
import LogIn from '../components/Auth/login';
import Home from '../components/Dashboard/home';

const Routes = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<AdminRoute path="/admindashboard" exact component={'AdminDashboard'} />
					<PrivateRoute path="/userdashboard" exact component={'UserDashboard'} />
					<PublicRoute
						restricted={true}
						path="/auth/activate/:token"
						exact
						component={'Activate'}
					/>
					<PublicRoute restricted={true} path="/signup" exact component={SignUp} />
					<PublicRoute restricted={true} path="/signin" exact component={LogIn} />
					<PublicRoute restricted={false} path="/" exact component={Home} />
					<PrivateRoute
						restricted={true}
						path="/dashboard"
						exact
						component={Home}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default Routes;
