import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Navigation from './Navigation';

export default function Layout({children}) {
    const toggle = useSelector((state) => state.toggle)
    const {isOpen} = toggle;

    return (
        <>
            <Header />
            <Navigation />
            <div className={isOpen? 'screen active' : 'screen'}>
                {children}
            </div>
        </>
    );
}
