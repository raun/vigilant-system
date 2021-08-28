import { BrowserRouter, Route, Link} from 'react-router-dom';
import LogIn from './components/Auth/login';
import SignUp from './components/Auth/signup';
import HomePage from './components/Dashboard/home';
import Header from './components/Header/Header';
import './styles/app.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LogIn} />
        <Route path="/signup" exact component={SignUp} />
      </div>
    </BrowserRouter>
  )
}

export default App;
