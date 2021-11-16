import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import {Toaster} from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUser } from './store/slices/authSlice';
import Profile from './pages/Profile';
import PrivateRoute from './helpers/PrivateRoute';

function App() {
  const {isAuthenticating} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const userId = localStorage.getItem('user_id');
  React.useEffect(()=>{
    if(userId){
      dispatch(getLoggedInUser(userId));
    }
  }, [userId]);

  if(isAuthenticating){
    return <h3>Loading...</h3>
  }

  return (
    <React.Fragment>
      <Toaster />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/profile' element={ <PrivateRoute><Profile /></PrivateRoute> } />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
