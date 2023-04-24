import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { getUserProfiles, listProfile, deleteProfile, createProfile } from '../actions/profileActions';
import { PROFILE_CREATE_RESET } from '../constants/profileConstants';


import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfileListScreen({ history, match }) {

    const dispatch = useDispatch()

const profileList = useSelector(state => state.profileList);
const { loading, error, profiles, pages, page } = profileList;

const profileDelete = useSelector(state => state.profileDelete);
const { loading: loadingDelete, error: errorDelete, success: successDelete } = profileDelete;

const profileCreate = useSelector(state => state.profileCreate);
const { loading: loadingCreate, error: errorCreate, success: successCreate, profile: createdProfile } = profileCreate;

const userLogin = useSelector(state => state.userLogin);
const { userInfo } = userLogin;

let keyword = history.location.search;


useEffect(() => {
    dispatch({ type: PROFILE_CREATE_RESET });
  
    if (!userInfo) {
      history.push('/login');
    }
  
    if (successCreate) {
      history.push(`/create/job/${createdProfile._id}/edit`);
    } else {
      dispatch(getUserProfiles(keyword, userInfo)); // Pass the userInfo object to filter Profile items by user
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProfile, keyword]);
  

const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this Profile?')) {
        dispatch(deleteProfile(id));
    }
}
const createProfileHandler = () => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(createProfile(isVerified));
    } else {
      // Show error message or redirect to login page
    }
  }
  
const [isVerified, setIsVerified] = useState(false);


const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [message, setMessage] = useState('')



const userDetails = useSelector(state => state.userDetails)
const { user } = userDetails



const userUpdateProfile = useSelector(state => state.userUpdateProfile)
const { success } = userUpdateProfile

const orderListMy = useSelector(state => state.orderListMy)
const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
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




return (
    <div>
        <Row className='align-items-center'>
           

            <Col className='text-right'>
                <Button className='my-3' onClick={createProfileHandler}>
                    <i className='fas fa-plus'></i> Create
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>You are not the owner</Message>}


        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loading
            ? (<Loader />)
            : error
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <div></div>
            )
    }
</div>
)}

export default ProfileListScreen;