import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Autocomplete from "react-google-autocomplete";
import { useState } from 'react'

function EditAccountDropMenu ({currentUser}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [editedAccountInfo, setEditedAccountInfo] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: '',
        location_id: currentUser.location_id,

    })

    function submitEditedInfo (e) {
        e.preventDefault()
        fetch(`/edit-account/${currentUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: editedAccountInfo.username,
                email: editedAccountInfo.email,
                password: editedAccountInfo.password,
                location_id: editedAccountInfo.location_id
            })
        })
    }   

    function handleInfoChange (e) {
        const {name, value} = e.target;

        setEditedAccountInfo({
            ...editedAccountInfo,
            [name]: value
        }
        )
    }

    

    return(
        <>
            <div className='account-drop-menu' onClick={()=>setShow(true)}>
                <i class="fa-solid fa-2x fa-ellipsis-vertical"></i>
            </div>
            <Modal
                size="md"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Account Details?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitEditedInfo}>
                        <label htmlFor='edit-username'>Username: </label>
                        <br></br>
                        <input 
                        type='text'
                        name='username'
                        id='edit-username'
                        placeholder={currentUser.username}
                        onChange={handleInfoChange}
                        value={editedAccountInfo.username}
                        />
                        <br></br>
                        <br></br>
                        <label htmlFor='edit-email'>Email: </label>
                        <br></br>
                        <input 
                        type='text'
                        name='email'
                        id='edit-email'
                        placeholder={currentUser.email}
                        onChange={handleInfoChange}
                        value={editedAccountInfo.email}
                        />
                        <br></br>
                        <br></br>
                        <label htmlFor='edit-password'>Password: </label>
                        <br></br>
                        <input 
                        type='password'
                        name='password'
                        id='edit-password'
                        placeholder='New password...'
                        onChange={handleInfoChange}
                        value={editedAccountInfo.password}
                        />
                        <br></br>
                        <br></br>
                        {/* <Autocomplete apiKey={process.env.REACT_APP_GOOGLE_KEY} id='account-auto' /> */}
                        <label htmlFor='edit-location'>Location: </label>
                        <br></br>
                        <input 
                        type='text'
                        name='location_id'
                        id='edit-location'
                        placeholder='Update Location'
                        />
                        <Button variant="primary" type='submit'>
                            Save Changes
                        </Button>
                    </form>
                </Modal.Body>
                
            </Modal>
        </>
    )
}

export default EditAccountDropMenu;