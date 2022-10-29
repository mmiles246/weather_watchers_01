import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'

function EditAccountModal () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    return(
        <>
        <Modal
                size="md"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                {!currentUser.avatar_url ? <Modal.Title id="example-modal-sizes-title-sm">Add a profile image?</Modal.Title> : <Modal.Title id="example-modal-sizes-title-sm">Update profile image?</Modal.Title> }
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <input 
                        type='file'
                        accept='image/*'
                        name='profileimage'
                        id='profileimage'
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

export default EditAccountModal;