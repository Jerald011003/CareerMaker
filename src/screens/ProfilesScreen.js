import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProfileDetails } from '../actions/profileActions';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { Dropdown } from 'react-bootstrap';
import { useRef } from 'react';
import { createProfileReview } from '../actions/profileActions';
import { PROFILE_CREATE_REVIEW_RESET } from '../constants/profileConstants';
import { addHeartUser, getUserHeartlist } from '../actions/profileActions';


import {  updateHeart,deleteHeart } from '../actions/profileActions'
import { HEART_UPDATE_RESET } from '../constants/profileConstants'
import { listProfiles } from '../actions/profileActions';


function ProfileScreen({ match, history}) {

  const [showDropdown, setShowDropdown] = useState(false);

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();

  const profileDetails = useSelector(state => state.profileDetails);
  const {  profile, error, loading} = profileDetails;



  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [wishlist, setWishlist] = useState([]);

    
  const [hearted, setHearted] = useState(false);
  const [isHeart, setIsHeart] = useState(false);
  const [canMessage, setCanMessage] = useState(false);
  const [users, setUsers] = useState([]);
  const [userReceiver, setUserReceiver] = useState(profile.email);
  const heartlistId = match.params.id







  const profileReviewCreate = useSelector(state => state.profileReviewCreate);
  const {
    loading: loadingProfileReview,
    error: errorProfileReview,
    success: successProfileReview,
  } = profileReviewCreate;

  useEffect(() => {
    if (successProfileReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PROFILE_CREATE_REVIEW_RESET });
    }

    dispatch(listProfileDetails(match.params.id));
  }, [dispatch, match, successProfileReview]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProfileReview(
        match.params.id, {
        rating,
        comment
    }
    ));
  };

  useEffect(() => {
    dispatch(listProfileDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cartProfile/${match.params.id}?qty=${qty}`);
  };

  const addToWishlist = () => {
    history.push(`/liked/${match.params.id}?qty=${qty}`);
    setLiked(true); // Update the state to indicate that the user has liked the Profile

  };

  const addToPreorder = () => {
    history.push(`/playlist/${match.params.id}?qty=${qty}`);
  };


  const [showPremium, setShowPremium] = useState(false);
  // const [showBasic, setShowBasic] = useState(true);

  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const [showDownload, setShowDownload] = useState(false)

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])
    const handleDropdownToggle = () => {
      setShowDropdown(!showDropdown);
    };

    const addToPlaylist = (playlistId, playlistTitle) => {
      history.push(`/playlist/${match.params.id}?qty=${qty}/${playlistTitle}`);
    };
    const download = () => {
      window.location.href = profile.download;
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      dispatch(
        addHeartUser(userReceiver, isHeart, canMessage)
        
      );
  
    };


  const heartList = useSelector((state) => state.heartList);
  const { heartlist, error: heartlistError, loading: heartlistloading } = heartList;

  const heartDelete = useSelector(state => state.heartDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = heartDelete;
  
  useEffect(() => {
    dispatch(getUserHeartlist('', userInfo));
  }, [dispatch, userInfo]);



  useEffect(() => {
    dispatch(getUserHeartlist('', userInfo));
    dispatch(getUserDetails('profile'))

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://careermaker.pythonanywhere.com/api/users', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [dispatch, userInfo, successDelete]);
  
  const heartUpdate = useSelector(state => state.heartUpdate)
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = heartUpdate


  useEffect(() => {
    if (successUpdate) {
        dispatch({ type: HEART_UPDATE_RESET });
        
        history.push('/proposal');
    }
}, [dispatch, successUpdate, history]);



const [updatedIsHeart, setUpdatedIsHeart] = useState(false);
const [updatedCanMessage, setUpdatedCanMessage] = useState(false);


const handleUpdateClick = () => {

  setUpdatedIsHeart(isHeart);
  setUpdatedCanMessage(canMessage);
}

const handleModalSave = () => {
  dispatch(updateHeart( updatedIsHeart, updatedCanMessage));

  }

  const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this Profile?')) {
        dispatch(deleteHeart(id));
    }
}

const profileList = useSelector(state => state.profileList);
const { error: profileError, loading: profileLoading, profiles, page: profilePage, pages: profilePages } = profileList;



useEffect(() => {
  dispatch(listProfiles());
}, [dispatch]);



  return (
    <div>
       {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

      {loading ? (
        <Loader />
     ) : error ? ( 
        <Message variant="danger">{error}</Message>
     ) : ( 
        <div>
          <Row className="justify-content-center">
          <Col className="home-screen-product-col d-flex align-items-center justify-content-center">
  <Card className="justify-content-center">
    <Image
      src={profile.image} 
      alt={profile.headline} 
      fluid 
      className="float-md-end mx-auto" 
      style={{ width: '100%', height: '250px', objectFit: 'cover' }}
    />        
  </Card>
  
</Col>




<div className='text-center'>
                <ListGroup.Item>

                <Link to="/proposal" className="btn btn-primary">

Apply to {profile.email}
  
</Link>

{/* <div className="text-center">
    <h2>Send Request</h2>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error}</p>
    ) : (
      <>
        <p>(Please send request to message {profile.email} )</p>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="userReceiver">User Receiver:</label>
          <input
            type="text"
            id="userReceiver"
            name="userReceiver"
            value={profile.email || userReceiver}
            onChange={(e) => setUserReceiver(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </>
    )}
  </div> */}
{/* <Link to={`/message/${profile._id}`} className="btn btn-dark my-3" style={{ color: 'white', backgroundColor: '#24A0ED' }}>

Message
  
</Link> */}

{/* <Link to="#" className="btn" style={{ color: 'white', backgroundColor: '#24A0ED' }}>

<i>like</i>
  
</Link> */}

{/* <button className="btn btn-dark my-3"  style={{ color: 'white', backgroundColor: '#24A0ED' }}>Like</button> */}
<Link to="/" className="btn btn-dark my-3">
        Find Other Job
      </Link>
     
                </ListGroup.Item>
                </div>

<Col md={12} >
<br/>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{profile.headline}</h1>
                  <p>Email: {profile.email}</p>

                  <p>Posted At: {profile.createdAt}</p>
               {profile.description}
                </ListGroup.Item>
              

             
      


              </ListGroup>

              
            </Col>



      
      </Row>
     
    </div>
   )} 

   
</div>

);
}

export default ProfileScreen;

