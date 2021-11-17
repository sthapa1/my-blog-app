import { useSelector } from "react-redux";

const Profile = () => {
    const {user} = useSelector(state=>state.auth)
    return <div className='card p-4'>
        <p><strong>Fullname: </strong> {user.firstname} {user.lastname}</p>
        <p><strong>Email: </strong> {user.email}</p>
    </div>
}

export default Profile;


