import { ThemeProvider } from '@material-ui/core';
import Header from './components/Header/Header';
import Toaster from './components/Toaster/Toaster';
import { Switch, BrowserRouter } from 'react-router-dom';
import PublicRoute from './routes/publicRoutes';
import LogIn from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import HomePage from './components/Dashboard/Home';
import FeatureRequestForm from './components/Dashboard/FeatureRequestForm'
import { StylesProvider } from '@material-ui/core/styles';
import { muiTheme } from './basicThems';
import './styles/app.scss';

const App = () => {
  return (
    <div>
      <StylesProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
      <Toaster />
      <div style={{ marginTop: '64px'}}>
      <BrowserRouter>
      <Header />
          <PublicRoute restricted={true} path="/signup" exact component={SignUp} />
          <PublicRoute restricted={false} path="/login" exact component={LogIn} />
          <PublicRoute restricted={false} path="/" exact component={HomePage} />
          <PublicRoute restricted={false} path="/feature-request-form" exact component={FeatureRequestForm} />
      </BrowserRouter>
      </div>
      </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
