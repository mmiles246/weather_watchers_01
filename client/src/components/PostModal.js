import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';



function PostModal () {
    const location = useLocation()
    const currentUser = location.state


    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function handleSubmit (e) {
        e.preventDefault()

        const data = new FormData();

        // const user_id = currentUser.id
        // const location_id = currentUser.location_id

        data.append('user_id', parseInt(currentUser.id))
        data.append('location_id', parseInt(currentUser.location_id))
        data.append('caption', e.target.caption.value)

        data.append('image', e.target.image.files[0])

        console.log([...data])
        submitToAPI(data)
    }

    function submitToAPI(data) {
        
        fetch('/create_post', {
            method: 'POST',
            body: data
        })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })
    }

    return(
        
        <Modal show={show}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <input
                    type='file'
                    accept='image/*'
                    name='image'
                    id='image'
                    // placeholder="name@example.com"
                    autoFocus
                />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Caption</Form.Label>
                <input type='text' name='caption' id='caption' />
                <Form.Control as="textarea"  rows={3} />
                </Form.Group>
                <Button variant="primary" type='submit'>
                    Save Changes
                </Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Link to='/'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Link>
            
            </Modal.Footer>
        </Modal>
    )
}

export default PostModal;