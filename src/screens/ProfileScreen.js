import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { deleteOrder } from '../actions/orderActions';
import { ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL } from '../constants/orderConstants';
import { addHeartUser, getUserHeartlist } from '../actions/profileActions';

function ProfileScreen({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const heartList = useSelector((state) => state.heartList);
    const { heartlist, error: heartlistError, loading: heartlistLoading } = heartList;
  
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(getUserHeartlist('', userInfo));
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }

    const deleteOrderHandler = (id) => {
        if (window.confirm('Are you sure?')) {
          dispatch({ type: ORDER_DELETE_REQUEST });
    
          dispatch(deleteOrder(id)).then((res) => {
            if (res.type === ORDER_DELETE_SUCCESS) {
              dispatch(listMyOrders());
            } else if (res.type === ORDER_DELETE_FAIL) {
              console.log(res.payload);
            }
          });
        }
      };
    return (
<Row className="justify-content-center">
            <Col md={3}>
                <h2>Profile</h2>
                {heartlistError && <Message variant='danger'>{heartlistError}</Message>}
            {heartlistLoading && <Loader />}
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter username'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                </Button>

                </Form>
            </Col>

            <Col md={12} >
                <h2>Jobs</h2>
                {heartlistLoading ? (
                    <Loader />
                ) : heartlistError ? (
                    <Message variant='danger'>{heartlistError}</Message>
                ) : (
                    <Table>
                    <thead>
                      <tr>
               
                      <th>You</th>
                <th>Employer</th>
      
                <th>FEEDBACK</th>
                <th>APPLICATION</th>
                <th></th>
        
                      </tr>
                    </thead>
                    <tbody>
                      {heartlist.map((heart) => (
                        <tr key={heart._id}>
                         
                 
                          <td>{heart.userOwner}</td>
                          <td>{heart.userHeart}</td>
                  
                          <td>
                         
                            
                            {heart.isHeart? 'Good Job!' : ''}</td>
                          <td>
                            
                          
                            {heart.canMessage ? 'Accepted' : ''}</td>
                            <td>
                            {/* <LinkContainer to={`/stalk`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            View
                                                        </Button>
                                                    </LinkContainer> */}
                            {/* <LinkContainer to={`/heart/${heart._id}/edit`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            <i className='fas fa-edit'></i>
                                                        </Button>
                                                    </LinkContainer> */}
        
                                                    {/* <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(heart._id)}>
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
         */}
                                                    {/* <LinkContainer to={`/message/${profile._id}`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            Message
                                                        </Button>
                                                    </LinkContainer> */}
                                                    
        
                                                    
                  </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                        )}
            </Col>
        </Row>
    )
}

export default ProfileScreen