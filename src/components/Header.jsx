import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import '../styles/header.css'

export default function Header() {

    const [isOpenThemeMenuTwo, setIsOpenThemeMenuTwo] = useState(true);

    const toggle = useSelector((state) => state.toggle);
    const { isOpen } = toggle;

    console.log(isOpen)
    const adminSignin = useSelector((state) => state.adminSignin);
    const { adminInfo } = adminSignin;

    const dispatch = useDispatch();

    const setOpenThemeMenu = () => {
        setIsOpenThemeMenuTwo(!isOpenThemeMenuTwo);
        // dispatch(toggleThemeMenu(true));
    }

  return (
    <header className={isOpen ? "header active" : "header"}>
        <button className="btn-icon"><i className='bx bx-expand' ></i></button>
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
