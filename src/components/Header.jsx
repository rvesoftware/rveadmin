import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import '../styles/header.css'
import { toggleFunction } from '../actions/generalActions';

export default function Header() {
    const toggle = useSelector((state) => state.toggle)
    const {isOpen} = toggle;
  
  const [isOpenMenu, setIsOpenMenu] = useState(isOpen);
  const [active, setActive] = useState('home');

  const setOpenMenu = () => {
    console.log(isOpen)
    setIsOpenMenu(!isOpen);
    dispatch(toggleFunction(isOpenMenu));
    console.log(isOpen)

  };


    const [isOpenThemeMenuTwo, setIsOpenThemeMenuTwo] = useState(true);



    const adminSignin = useSelector((state) => state.adminSignin);
    const { adminInfo } = adminSignin;

    const dispatch = useDispatch();

    const setOpenThemeMenu = () => {
        setIsOpenThemeMenuTwo(!isOpenThemeMenuTwo);
        // dispatch(toggleThemeMenu(true));
    }

  return (
    <header className={isOpen ? "header " : "header active"}>
        <div>

        <button className="btn-icon" onClick={() => setOpenMenu()}><i className='bx bx-menu' ></i></button>
        <button className="btn-icon" onClick={() => setOpenMenu()}><i className='bx bx-chat' ></i></button>
        <button className="btn-icon"><i className='bx bx-expand' ></i></button>

        </div>
        <ul className="left__items">

            <li className="user__options">
                <i className='bx bx-bell'></i>
            </li>
            <li className="user__options" onClick={() => setOpenThemeMenu()}>
                <i className='bx bx-palette'></i>
            </li>
            <li className="user__details"><span className="user__img">
                <img src={adminInfo.image} alt="" />
            </span> {adminInfo.name}</li>
        </ul>
    </header>
);
}
