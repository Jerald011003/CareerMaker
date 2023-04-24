import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHeartUser, getUserHeartlist } from '../actions/profileActions';
import {Table} from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

import { listProfileDetails, updateHeart,deleteHeart } from '../actions/profileActions'
import { HEART_UPDATE_RESET } from '../constants/profileConstants'
import { listProfiles } from '../actions/profileActions';
import axios from 'axios';
const HeartListScreen = ({ match, history }) => {

  const heartlistId = match.params.id

  const [hearted, setHearted] = useState(false);
  const [isHeart, setIsHeart] = useState(false);
  const [canMessage, setCanMessage] = useState(false);
  const [users, setUsers] = useState([]);
  
  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const [uploading, setUploading] = useState(false)
    const [resume, setResume] = useState(null)
    const [uploadingDownload, setUploadingDownload] = useState(false)

 


  const dispatch = useDispatch();

  const profileDetails = useSelector((state) => state.profileDetails);
  const { loading, error, profile } = profileDetails;

  const userLogin = useSelector(state => state.userLogin)
  const { error: userError, loading: userLoading, userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails)
  const { error: userDetailsError, loading: userDetailsLoading, user } = userDetails

  const heartList = useSelector((state) => state.heartList);
  const { heartlist, error: heartlistError, loading: heartlistloading } = heartList;

  const heartDelete = useSelector(state => state.heartDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = heartDelete;
  
  useEffect(() => {
    dispatch(getUserHeartlist('', userInfo));
  }, [dispatch, userInfo]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addHeartUser(letter, userReceiver, isHeart, canMessage, resume));
    setHearted(true);
  };
  
  

  useEffect(() => {
    dispatch(getUserHeartlist('', userInfo));
    dispatch(getUserDetails('profile'))

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users', {
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

const [userReceiver, setUserReceiver] = useState(profile.email);
const [letter, setLetter] = useState('');

const handleFileUpload = async (e) => {
  e.preventDefault();

  setUploading(true);

  const formData = new FormData();
  formData.append('resume', resume);

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post('/api/hearts/upload/', formData, config);

    setUploading(false);

    // Do something after the file has been uploaded, e.g. show a success message
  } catch (error) {
    console.error(error);
    setUploading(false);

    // Show an error message to the user
  }
};

const isUserAdmin = userInfo ? userInfo.isAdmin : false;

  return (
    <div>

          
{error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
          {userDetailsError && <Message variant='danger'>{userDetailsError}</Message>}
            {userDetailsLoading && <Loader />}

  
              {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>You are not the owner</Message>}


      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>

{!isUserAdmin && (

   

<div className='text-center'>
          <h2>Send Resume</h2>
          <p>(Please send your resume to {profile.email} )</p>

          <form onSubmit={handleFormSubmit} style={{display: 'flex', flexWrap: 'wrap'}}>
  <label htmlFor="userReceiver" style={{flex: 1, marginRight: '10px'}}>Employer:</label>
  <input
    type="text"
    id="userReceiver"
    placeholder='Name of Employer'

    name="userReceiver"
    value={userReceiver}
    onChange={(e) => setUserReceiver(e.target.value)}

    style={{flex: 2, marginRight: '10px'}}
  />

  <input
    type="text"
    id="userReceiver"
    name="userReceiver"
    placeholder='Link of you resume'
    value={letter}
    onChange={(e) => setLetter(e.target.value)}
    style={{flex: 3, marginRight: '10px'}}
  />

  <button type="submit" variant='primary' style={{flex: 1}}>Send</button>
</form>


          <br/>

</div>
   
       )}
<div>

{/* <Form onSubmit={handleFormSubmit}>
  <Form.Group controlId='isHeart'>
    <Form.Check
      type='checkbox'
      label='Is Heart'
      checked={isHeart}
      onChange={(e) => setIsHeart(e.target.checked)}
    />
  </Form.Group>

  <Form.Group controlId='canMessage'>
    <Form.Check
      type='checkbox'
      label='Can Message'
      checked={canMessage}
      onChange={(e) => setCanMessage(e.target.checked)}
    />
  </Form.Group>

  <Form.Group controlId='userReceiver'>
    <Form.Label>User Receiver</Form.Label>
    <Form.Control
      type='text'
      placeholder='Enter user email'
      value={userReceiver}
      onChange={(e) => setUserReceiver(e.target.value)}
    />
  </Form.Group> */}

  {/* <Form.Group controlId='resume'>
    <Form.Label>Resume</Form.Label>
    <Form.Control
      type='file'
      accept='.pdf,.doc,.docx'
      onChange={(e) => setResume(e.target.files[0])}
    />
  </Form.Group> */}


  {/* <Form.Group controlId='resume'>
                                <Form.Label>Resume</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter resume'
                                    value={resume}
                                    onChange={(e) => setResume(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='file'
                                    label='Choose File'
                                    custom
                                    onChange={handleFileUpload}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group>

  <Button type='submit' variant='primary' disabled={uploading}>
    {uploading ? 'Uploading...' : 'Upload'}
  </Button>
</Form> */}

</div>


          <h2>Proposals</h2>
          <Table>
            <thead>
              <tr>
       
                <th>You</th>
                <th>Employer</th>
      
                <th>FEEDBACK</th>
                <th>APPLICATION</th>

                <th>Applicant Resume</th>
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
                    {userInfo && userInfo.isAdmin && (

                    <td>{heart.letter}</td>
                    )}


                    <td>
                      
                    {userInfo && userInfo.isAdmin && (
  <>
    {/* <LinkContainer to={`/stalk`}>
      <Button variant='light' className='btn-sm'>
        View
      </Button>
    </LinkContainer> */}
    <LinkContainer to={`/heart/${heart._id}/edit`}>
      <Button variant='light' className='btn-sm'>
        <i className='fas fa-edit'></i>
      </Button>
    </LinkContainer>
  </>
)}


                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(heart._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>

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

         
        </div>
      )}
    </div>
  );
};

export default HeartListScreen;
