import React from 'react'
import { useSelector } from 'react-redux';

export default function HomeScreen() {

    const adminSignin = useSelector((state) => state.adminSignin);
    const { adminInfo } = adminSignin;
  return (
    <div>
        <div>
          <h2 className='home__title'>Hi {adminInfo.name} {adminInfo.lastname} </h2>
          <p className='home__subtitle'>Welcome Back</p>
        </div>

        <div className="container__home">
          <div className="card">
          </div>
          <div className="card">
          </div>
          <div className="card">
          </div>
          <div className="card">
          </div>
        </div>
    </div>
  )
}
