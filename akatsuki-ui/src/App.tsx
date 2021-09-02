import { ThemeProvider } from '@material-ui/core';
import Header from './components/Header/Header';
import Toaster from './components/Toaster/Toaster';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import PublicRoute from './routes/publicRoutes';
import LogIn from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import HomePage from './components/Dashboard/Home';
import FeatureRequestForm from './components/Dashboard/FeatureRequestForm'
import FeatureDetails from './components/Dashboard/FeatureDetails';
import UserDashboard from './components/Dashboard/UserDashboard';
import { StylesProvider } from '@material-ui/core/styles';
import { muiTheme } from './basicThems';
import './styles/app.scss';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';

const App = () => {
  return (
    <div>
      <StylesProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
      <Toaster />
      <div style={{ marginTop: '64px'}}>
      <BrowserRouter>
      <Header />
        <Switch>
          <PublicRoute restricted={true} path="/signup" exact component={SignUp} />
          <PublicRoute restricted={false} path="/login" exact component={LogIn} />
          <PublicRoute restricted={false} path="/" exact component={HomePage} />
          <PublicRoute restricted={false} path="/feature-requests/:featureId" exact component={FeatureDetails} />
          <PublicRoute restricted={false} path="/feature-request-form" exact component={FeatureRequestForm} />
          <PublicRoute restricted={false} path="/userdashboard" exact component={UserDashboard} />
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
      </div>
      </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
