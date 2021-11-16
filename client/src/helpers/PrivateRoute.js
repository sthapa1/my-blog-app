import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = ({children}) => {
    const { isLoggedIn } = useSelector(state=>state.auth);
    const hasToken = localStorage.getItem('token');

    return (isLoggedIn || hasToken) ? children : <Navigate to='/login' />
}

export default PrivateRoute;