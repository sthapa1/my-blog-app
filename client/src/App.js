import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
