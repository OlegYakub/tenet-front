import React, {useState} from 'react';
import axios from 'axios';
import {RouteComponentProps} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Api from '../../../service/api';

const URL = 'http://localhost:3001';

interface AppPageProps extends RouteComponentProps {

}

function App(props: AppPageProps) {

  const initialState = {
    email: '',
    password: '',
    name: '',
    age: '',
    searchUserEmail: '',
    loginEmail: '',
    loginPassword: ''
  };

  let [state, setState] = useState(initialState);

  const handleChange = (val: string, field: string) => {
    console.log('val', val);

    setState({
      ...state,
      [field]: val,
    })
  };

  const handleSubmit = () => {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const user = {
      email: state.email,
      password: state.password,
      name: state.name,
      age: state.age,
    };

    axios({
      method: 'post',
      headers,
      url: `${URL}/sign-up`,
      data: {user}
    }).then((res) => {
      console.log('SUCCESS', res);

    });
  };

  const handleLogin = () => {
    const data = {
      email: state.loginEmail,
      password: state.loginPassword,
    };

    Api.get('/login', data).then(res => {
      console.log('SUCCESS', res);
      alert('LOGIN SUCCESS');
      localStorage.setItem('token', res.token)
    });
  };
  //
  const handleGetUserInfo = () => {
    const data =  {
      email: state.searchUserEmail
    };

    Api.get('/get-user', data).then(res => {
      console.log('USER FETCHED', res);
      alert('USER FETCHED');
    });
  };

  console.log('state', state);

  return (
    <div>
      <div >
        <h1>SIGN UP</h1>
      <TextField
        label="Name"
        onChange={(val) => handleChange(val.target.value, 'name')}
      />
      <TextField
        label="Age"
        onChange={(val) => handleChange(val.target.value, 'age')}
      />
      <TextField
        label="Email"
        onChange={(val) => handleChange(val.target.value, 'email')}
      />
      <TextField
        label="Password"
        onChange={(val) => handleChange(val.target.value, 'password')}
      />

      <Button
        onClick={handleSubmit}
      >
        SignUp
      </Button>
      </div>
      <h1>LOGIN</h1>

      <TextField
        label="Email"
        onChange={(val) => handleChange(val.target.value, 'loginEmail')}
      />
      <TextField
        label="Password"
        onChange={(val) => handleChange(val.target.value, 'loginPassword')}
      />
      <Button
        onClick={handleLogin}
        color="primary"
      >
        Log In
      </Button>
      <h1>GET USER</h1>
      <TextField
        label="Email"
        onChange={(val) => handleChange(val.target.value, 'searchUserEmail')}
      />
      <Button
        onClick={handleGetUserInfo}
        color="primary"
      >
        Search
      </Button>
    </div>
  );
}

export default App;
