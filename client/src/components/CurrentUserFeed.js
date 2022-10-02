import {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function CurrentUserFeed ({currentUser, clickedImageId, setClickedImageId, clickedImageUrl, setClickedImageUrl, clickedImage, setClickedImage, imageClick, isMounted, imageObjs}) {
    // const [imageObjs, setImageObjs] = useState([])
    // const [clickedImageUrl, setClickedImageUrl] = useState()
    // const [clickedImageId, setClickedImageId] = useState()
    // const [clickedImage, setClickedImage] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // const isMounted = useRef(false)


    let navigate = useNavigate()

    console.log(currentUser)


    // useEffect(() => {
    //     fetch('/my_posts')
    //     .then((res) => res.json())
    //     .then(res => {
    //         console.log(res)
    //         setImageObjs(res)
    //     })
    // }, [])

    // function imageClick (e) {
    //     setClickedImageId(parseInt(e.target.getAttribute('imageId')))
    //     setClickedImageUrl(e.target.getAttribute('src'))
    //     setClickedImage(imageObjs.find(obj => obj.id === parseInt(e.target.getAttribute('imageId'))))
    //     isMounted.current = true
    // }

        useEffect(() => {
            if (isMounted.current) {
                navigate(`/image/${clickedImageId}`, {state: clickedImageId})
                isMounted.current = false
            } else {
                isMounted.current = false
            }
        }, [clickedImageId])
            
    
    

    function imageObjsMapper (obj) {
        return(
            
        <div className='image-container'>
            <img className='current-user-feed-image' src={obj.image_url} imageId={obj.id} imageObj={{obj}} onClick={(e) => {imageClick(e)}} />
        </div>)
    }

    function onSubmit (e) {
        e.preventDefault()
        const data = new FormData()
        data.append('avatar', e.target.profileimage.files[0])

        submitData(data)
    }

    function submitData(data) {

        fetch(`update_user/${currentUser.id}`, {
            method: 'PATCH',
            body: data,
        })
    }



    return(
        <>
        <div className='feed-container'>
            <div className='feed-header'>
                <div className='current-user-avatar'>
                    {!currentUser.avatar ? " " : <img className='current-user-blank-avatar' src={currentUser.avatar_url} onClick={() => setShow(true)}/>}
                    {/* <img className={currentUser.avatar ? '' : ''}/> */}
                </div>
                <div className='current-user'>
                    <h1>{currentUser.username}</h1>
                </div>    
            </div>
            <Modal
                size="sm"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                {currentUser.avatar ? <Modal.Title id="example-modal-sizes-title-sm">Add a profile image?</Modal.Title> : <Modal.Title id="example-modal-sizes-title-sm">Update profile image?</Modal.Title> }
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
            <div className='image-feed'>
                <br></br>
                {imageObjs.map(imageObjsMapper)}
            </div>
        </div>
        </>
    )
}

export default CurrentUserFeed;