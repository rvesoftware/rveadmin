import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { toggle } from '../actions/generalActions';
import '../styles/navigation.css';
// import { signout } from '../actions/userActions';

export default function Navigation() {
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');

  const dispatch = useDispatch();

  const setOpenMenu = () => {
    setIsOpen(!isOpen);
    // dispatch(toggle(isOpen));
  };

  const signoutHandler = () => {
    // dispatch(signout());
  };

  return (
    <aside
      className={
        isOpen ? 'navigation menu__expanded ' : 'navigation menu__collapse'
      }
    >
      <div className="navigation__header">
        <div className="title">Real Vision Enterprise</div>
        <button className="navigation__btn" onClick={() => setOpenMenu()}>
          <i className="bx bx-menu"></i>
        </button>
      </div>

      {/* <div className="navigation__profile">
        <div className="photo">
          <img src={userInfo.image} alt="" />
        </div>
        <div className="name">
          <span>{userInfo.name}</span>
        </div>
      </div> */}

      <div className="navigation__items">
        <details>
          <summary className="navigation__subtitle">
            Main <i className="bx bx-down-arrow-alt"></i>
          </summary>
          <div>
            <Link
              to="/"
              onClick={() => setActive('home')}
              className={
                active === 'home'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
                <i className="bx bxs-home"></i>
              </div>
              <div className="title">Home</div>
            </Link>
            <Link
              to="/post"
              onClick={() => setActive('post')}
              className={
                active === 'post'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
              <i className='bx bxl-blogger'></i>
              </div>
              <div className="title">Posts</div>
            </Link>
            <Link
              to="/createpost"
              onClick={() => setActive('createPost')}
              className={
                active === 'createPost'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
              <i className='bx bxs-comment-add' ></i>
              </div>
              <div className="title">Create Post</div>
            </Link>
          </div>
        </details>
        <details>
          <summary className="navigation__subtitle">
            Hardware <i className="bx bx-down-arrow-alt"></i>
          </summary>
          <div>
            <Link
              to="/categories"
              onClick={() => setActive('categories')}
              className={
                active === 'categories'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
                <i className="bx bx-menu"></i>
              </div>
              <div className="title">Categories</div>
            </Link>
            <Link
              to="/products"
              onClick={() => setActive('products')}
              className={
                active === 'products'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
                <i className="bx bxl-product-hunt"></i>
              </div>
              <div className="title">Products</div>
            </Link>
            <Link
              to="/computers"
              onClick={() => setActive('computers')}
              className={
                active === 'computers'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
                <i className="bx bx-desktop"></i>
              </div>
              <div className="title">Computers</div>
            </Link>
            <h3 className="navigation__subtitle">Quotation</h3>
            <Link
              to="/quotation"
              onClick={() => setActive('quotation')}
              className={
                active === 'quotation'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
                <i className="bx bxs-category"></i>
              </div>
              <div className="title">Create Quotation</div>
            </Link>

            <Link
              to="/quotations"
              onClick={() => setActive('quotations')}
              className={
                active === 'quotations'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
                <i className="bx bxs-check-square"></i>
              </div>
              <div className="title">Quotations List</div>
            </Link>
            <h3 className="navigation__subtitle">Sells</h3>
            <Link to="" className="navigation__item">
              <div className="icon">
                <i className="bx bx-money"></i>
              </div>
              <div className="title">Sell</div>
            </Link>
            <Link to="/sells" className="navigation__item">
              <div className="icon">
                <i className="bx bx-list-ul"></i>
              </div>
              <div className="title">Sells</div>
            </Link>
          </div>
        </details>
        <details>
          <summary className="navigation__subtitle">
            ENTERPRISE <i className="bx bx-down-arrow-alt"></i>
          </summary>
          <div>
            <Link
              to="/task"
              onClick={() => setActive('task')}
              className={
                active === 'task'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
                <i className="bx bx-task"></i>
              </div>
              <div className="title">Task</div>
            </Link>
            <Link
              to="/chat"
              onClick={() => setActive('chat')}
              className={
                active === 'chat'
                  ? 'navigation__item active'
                  : 'navigation__item'
              }
            >
              <div className="icon">
                <i className="bx bx-task"></i>
              </div>
              <div className="title">Chat</div>
            </Link>
          </div>
        </details>
        <Link to="/" onClick={signoutHandler} className="navigation__item end">
          <div className="icon">
            <i className="bx bx-log-out"></i>
          </div>
          <div className="title">Sign Out</div>
        </Link>
      </div>
    </aside>
  );
}