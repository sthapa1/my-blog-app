import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect} from 'react';
import getFileUrl from '../../helpers/getFileUrl';
import {Button, Container, Modal} from 'react-bootstrap';
import CreatePost from "./CreatePost";
import { fetchUserPostAction } from "../../store/slices/postSlice";
const defaultProfilePic = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=';

const Profile = () => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const {user} = useSelector(state=>state.auth);
    const {userPosts} = useSelector(state=>state.posts);

    useEffect(()=>{
        if(user && user._id){
            dispatch(fetchUserPostAction(user._id));
        }
    }, [user])

    if(!user){
        return <h5>Loading...</h5>
    }
    return <Container>
        <div className='card p-4 d-flex flex-column align-items-center'>
            <img src={ user.profilePic ? getFileUrl(user.profilePic) : defaultProfilePic } width={200} />
            <p><strong>Fullname: </strong> {user.firstname} {user.lastname}</p>
            <p><strong>Email: </strong> {user.email}</p>
        </div>
        <div className='my-4 d-flex justify-content-between'>
            <h4>My Posts</h4>
            <Button onClick={handleShow}>Create Post</Button>
        </div>
        <hr></hr>
        {
            userPosts.map(post=>{
                return (
                    <div key={post._id} className='card p-3'>
                        <img src={getFileUrl(post.image)} width='150' />
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                        <p className='text-muted'>{post.createdAt} | {post.creator.email}</p>
                    </div>
                )
            })
        }

        <Modal show={showModal} onHide={handleClose}>
            <CreatePost closeModal={handleClose}/>
        </Modal>
    </Container>
}

export default Profile;


