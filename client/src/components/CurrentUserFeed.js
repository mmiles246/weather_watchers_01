import AccountPageBanner from './AccountPageBanner'
import {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function CurrentUserFeed ({currentUser, clickedImageId, setClickedImageId, clickedImageUrl, setClickedImageUrl, clickedImage, setClickedImage, imageClick, isMounted, imageObjs, imageObjsMapper, currentUserPosts}) {
    // const [imageObjs, setImageObjs] = useState([])
    // const [clickedImageUrl, setClickedImageUrl] = useState()
    // const [clickedImageId, setClickedImageId] = useState()
    // const [clickedImage, setClickedImage] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // const isMounted = useRef(false)


    let navigate = useNavigate()


    // useEffect(() => {
    //     fetch('/my_posts')
    //     .then((res) => res.json())
    //     .then(res => {
    //         console.log(res)
    //         setImageObjs(res)
    //     })
    // }, [])


        useEffect(() => {
            if (isMounted.current) {
                navigate(`/image/${clickedImageId}`, {state: clickedImageId})
                isMounted.current = false
                setClickedImageId(null)
            } else {
                isMounted.current = false
            }
        }, [imageClick])
    

    // function onSubmit (e) {
    //     e.preventDefault()
    //     const data = new FormData()
    //     data.append('avatar', e.target.profileimage.files[0])

    //     submitData(data)
    // }

    // function submitData(data) {

    //     fetch(`update_user/${currentUser.id}`, {
    //         method: 'PATCH',
    //         body: data,
    //     })
    // }



    return(
        <>
        <div className='feed-container'>
            {/* <Modal
                size="sm"
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
                
            </Modal> */}
            <div className='image-feed'>
                <br></br>
                {currentUserPosts.map(imageObjsMapper)}
            </div>
        </div>
        </>
    )
}

export default CurrentUserFeed;