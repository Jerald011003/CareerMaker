import React, { useState, useEffect } from 'react';
import Profile from '../components/Jobs';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProfiles } from '../actions/profileActions';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Carousel } from 'react-bootstrap'; // import Carousel

import Paginate from '../components/Paginate';
import ProfileCarousel from '../components/JobsCarousel';
import SearchBox from '../components/SearchBox';

function ProfileListScreen({ history }) {
  const dispatch = useDispatch();
  const profileList = useSelector(state => state.profileList);
  const { error: profileError, loading: profileLoading, profiles, page: profilePage, pages: profilePages } = profileList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProfiles(keyword));
  }, [dispatch, keyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/ProfileList${keyword}&search=${keyword}`);
    } else {
      history.push(`/ProfileList/search/${keyword}`);
    }
  };

  return (
    <div>

      {/* <SearchBox submitHandler={submitHandler} /> */}
      <br />
      {/* {!keyword && <ProfileCarousel />} */}
      {profileLoading ? (
        <Loader />
      ) : profileError ? (
        <Message variant="danger">{profileError}</Message>
      ) : (
        
        <div >
<Row className="justify-content-center">
            {profiles.map((profile) => (
              <Col key={profile._id} sm={12} md={3} lg={2} xl={12}>
                <Profile profile={profile} />
              </Col>
            ))}
          </Row>
         
          
          <Paginate
            page={profilePage}
            pages={profilePages}
            keyword={keyword}
            className="home-screen-pagination"
          />
        </div>
      )}
    </div>
  );
}

export default ProfileListScreen;
