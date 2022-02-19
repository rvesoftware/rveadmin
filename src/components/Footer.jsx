import React from 'react'
import { useSelector } from 'react-redux';

export default function Footer() {


    const toggle = useSelector((state) => state.toggle);
    const { isOpen } = toggle;

  return (
    <footer className={isOpen? 'footer__active' : ""}>&copy; 2022, Made with <i className='bx bxs-heart'></i> by <strong> Nestor Mosquera </strong> for a better work </footer>
  )
}
