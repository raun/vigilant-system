import { Route, Redirect } from 'react-router-dom';
// import { isAuth } from './../utils/helpers';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
	// console.log(Component, rest, restricted);
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route like login
		<Route
			{...rest}
			render={(props) => {
				// isAuth()
        return false && restricted ? <Redirect to="/" /> : <Component {...props} />
			}
			}
		/>
	);
};

export default PublicRoute;