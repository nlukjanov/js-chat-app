import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Redirect } from 'react-router';
import './HomePage.css';
import { joinRoom, getChatRooms } from './requests';

const schema = yup.object({
  handle: yup.string().required('Handle is required'),
  chatRoomName: yup.string().required('Chat room is required')
});

const HomePage = () => {
  const [redirect, setRedirect] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [rooms, setRooms] = useState([]);
  const handleSubmit = async (event) => {
    if (event.type === 'click') {
      console.log('event', event.target);
      const handle = document.getElementById('handle');
      const chatRoomName = document.getElementById('chatRoomName');
      event = { handle: handle.value, chatRoomName: chatRoomName.value };
    }
    const isValid = await schema.validate(event);
    if (!isValid) return;
    localStorage.setItem('chatData', JSON.stringify(event));
    await joinRoom(event.chatRoomName);
    setRedirect(true);
  };

  const getRooms = async () => {
    const response = await getChatRooms();
    setRooms(response.data);
    setInitialized(true);
  };

  useEffect(() => {
    if (!initialized) {
      getRooms();
    }
  }, [initialized]);

  if (redirect) return <Redirect to='/chatroom' />;

  return (
    <div className='home-page'>
      <h2>Available Chat Rooms</h2>
      <div className='button-container'>
        {rooms.map((room, index) => {
          return (
            <Button
              className='chat-room-button'
              onClick={handleSubmit}
              key={index}
            >
              {room.name}
            </Button>
          );
        })}
      </div>
      <h2>Join Chat</h2>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={JSON.parse(localStorage.getItem('chatData') || '{}')}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md='12' controlId='handle'>
                <Form.Label>Handle</Form.Label>
                <Form.Control
                  type='text'
                  name='handle'
                  placeholder='Handle'
                  value={values.handle || ''}
                  onChange={handleChange}
                  isInvalid={touched.handle && errors.handle}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md='12' controlId='chatRoomName'>
                <Form.Label>Chat Room Name</Form.Label>
                <Form.Control
                  type='text'
                  name='chatRoomName'
                  placeholder='Chat Room Name'
                  value={values.chatRoomName || ''}
                  onChange={handleChange}
                  isInvalid={touched.chatRoomName && errors.chatRoomName}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.chatRoomName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type='submit' style={{ marginRight: '10px' }}>
              Join
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HomePage;
