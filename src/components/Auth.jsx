import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import '../styles/signin.css'
import swal from 'sweetalert';
import { signin } from "../actions/adminActions";

export default function Auth(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true)

  // console.log(props)
  // const redirect = props.location.search
  // ? props.location.search.split('=')[1]
  // : '/';

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo, loading, error } = adminSignin;


  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(username.length === 0 && password.length === 0)
    {
        swal('The fields cannot be empty', {
            icon: "error",
            dangerMode: true,
        })
    }else if(username.length === 0){
        swal('The username cannot be empty', {
            icon: "error",
            dangerMode: true,
        })
    }else if(password.length === 0){
        swal('The password cannot be empty', {
            icon: "error",
            dangerMode: true,
        })
    }else{
        dispatch(signin(username.toLowerCase(), password));
    }
};

useEffect(() => {
  if (adminInfo) {
    props.history.push('/');
  }
}, [props.history, adminInfo]);

  return (
    <div className="signin__container">
      <div className="signin__form">
        <form onSubmit={submitHandler}>
          <img src="./logo.png" alt="" />
          <div className="form-group">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <input type={passwordVisibility? "password" : "text"}  name="" id="" placeholder="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
            <span onClick={() => {setPasswordVisibility(!passwordVisibility)}}><i className='bx bxs-low-vision'></i></span>
          </div>
          <input type="submit" value="Login" />
        </form>
        <div className="form__text">
            <h2>Welcome</h2>
            <p>Be the best version of yourself</p>
        </div>
      </div>
    </div>
  );
}
