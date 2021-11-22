import { useSelector } from "react-redux";
import getFileUrl from '../../helpers/getFileUrl';
const Profile = () => {
    const {user} = useSelector(state=>state.auth)
    if(!user){
        return <h5>Loading...</h5>
    }
    return <div className='card p-4'>
        <img src={ getFileUrl(user.profilePic) } width={200} />
        <p><strong>Fullname: </strong> {user.firstname} {user.lastname}</p>
        <p><strong>Email: </strong> {user.email}</p>
    </div>
}

export default Profile;


