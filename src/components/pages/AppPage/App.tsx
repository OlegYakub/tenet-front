import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import Api from '../../../service/api';
import './App.css';

function AppPage() {
  const initialState = {
    email: '',
    password: '',
    name: '',
    age: '',
    searchUserEmail: '',
    loginEmail: '',
    loginPassword: '',
    imageId: null,
  };

  let [state, setState] = useState(initialState);

  const handleChange = (val: string, field: string) => {
    setState({
      ...state,
      [field]: val,
    });
  };

  const handleRegistr = () => {
    const user = {
      email: state.email,
      password: state.password,
      name: state.name,
      age: state.age,
    };

    Api.post('/sign-up', { user }).then(res => {
      console.log('SUCCESS', res);
    });
  };

  const handleLogin = () => {
    const data = {
      email: state.loginEmail,
      password: state.loginPassword,
    };

    Api.get('/login', data).then(res => {
      // console.log('SUCCESS', res);
      // alert('LOGIN SUCCESS');
      // localStorage.setItem('token', res.token)
    });
  };
  //
  const handleGetUserInfo = () => {
    const data = {
      email: state.searchUserEmail,
    };

    Api.get('/get-user', data).then(res => {
      console.log('USER FETCHED', res);
      alert('USER FETCHED');
    });
  };

  const handleAddPhoto = async (data: File[]) => {
    const form = new FormData();
    form.append('image', data[0]);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const res = await Api.post('/upload/image', form, headers);
  };

  const handleUpdateProfile = async () => {
    if (!state.imageId) {
      return alert('Error');
    }
    const data = { imageId: state.imageId };
    const res = await Api.post('/update-user', data);
    console.log('res', res);
  };

  console.log('state', state);

  return (
    <div>
      <div>
        <h1>SIGN UP</h1>
        <TextField
          label="Name"
          onChange={val => handleChange(val.target.value, 'name')}
        />
        <TextField label="Age" onChange={val => handleChange(val.target.value, 'age')} />
        <TextField
          label="Email"
          onChange={val => handleChange(val.target.value, 'email')}
        />
        <TextField
          label="Password"
          onChange={val => handleChange(val.target.value, 'password')}
        />

        <Button onClick={handleRegistr}>SignUp</Button>
      </div>
      <h1>LOGIN</h1>

      <TextField
        label="Email"
        onChange={val => handleChange(val.target.value, 'loginEmail')}
      />
      <TextField
        label="Password"
        onChange={val => handleChange(val.target.value, 'loginPassword')}
      />
      <Button onClick={handleLogin} color="primary">
        Log In
      </Button>
      <h1>GET USER</h1>
      <TextField
        label="Email"
        onChange={val => handleChange(val.target.value, 'searchUserEmail')}
      />
      <Button onClick={handleGetUserInfo} color="primary">
        Search
      </Button>
      <Dropzone
        onDrop={handleAddPhoto}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag n drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <Button onClick={handleUpdateProfile}>Update Profile</Button>
    </div>
  );
}

export default AppPage;
