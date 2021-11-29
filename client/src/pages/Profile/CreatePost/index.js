import React, {useState, useEffect} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { createPostAction, fetchCategoriesAction } from '../../../store/slices/postSlice';
import {toast} from 'react-hot-toast';
import Status from '../../../constants/status';
const CreatePost = ({closeModal}) => {

    const dispatch = useDispatch();
    const {categories, status, error} = useSelector(state=>state.posts)
    const initialState = {
        title: '',
        content: '',
        image: '',
        category: ''
    };

    const [postDetail, setPostDetail] = useState(initialState);

    useEffect(() => {
        if(categories.length < 1){
            dispatch(fetchCategoriesAction())
        }
    }, [categories])

    const handleFormChange = (e) => {
        if(e.target.type === 'file'){
            setPostDetail({...postDetail, [e.target.name]: e.target.files[0]});
            return;
        }

        setPostDetail({...postDetail, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        if(status === Status.ERROR){
            toast.error(error || 'Something went wrong.')
        }else if(status===Status.SUCCESS){
            setPostDetail(initialState);
            toast.success('Post created successfully.');
            closeModal()
        }
    }, [status])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(postDetail)
        const payload = new FormData();
        payload.append('title', postDetail.title);
        payload.append('content', postDetail.content);
        payload.append('image', postDetail.image);
        payload.append('category', postDetail.category);
        dispatch(createPostAction(payload))
    }


    return (
    <Form onSubmit={handleFormSubmit} encType='multipart/form-data'>
        <Card>
            <Card.Header>Create a new post.</Card.Header>
            <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text" placeholder="Title of the post" name='title' value={postDetail.title} onChange={handleFormChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select required name='category' value={postDetail.category} onChange={handleFormChange}>
                        <option>--Select category--</option>
                        {categories.map(category=><option key={category._id} value={category._id}>{category.title}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        required
                        placeholder="Content Here.."
                        style={{ height: '100px' }}
                        name='content'
                        onChange={handleFormChange}
                        value={postDetail.content}
                    />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Post Image</Form.Label>
                    <Form.Control required type="file" name='image' onChange={handleFormChange} />
                </Form.Group>

            </Card.Body>
            <Card.Footer className='d-flex justify-content-end'>
                <Button onClick={closeModal} variant="danger" type="button">
                    Cancel
                </Button>
                &nbsp;
                <Button variant="primary" type="submit">
                    { status === Status.PENDING ? 'Creating...' : 'Create Post'}
                </Button>
            </Card.Footer>
        </Card>
    </Form>
    )
}

export default CreatePost;