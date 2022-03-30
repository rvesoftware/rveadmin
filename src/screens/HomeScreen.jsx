import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listAdmins } from "../actions/adminActions";
import { listTasks } from "../actions/taskActions";
import { TASK_CREATE_RESET } from "../constants/taskConstants";
import * as timeago from "timeago.js";
import { useState } from "react";
import { listOrders } from "../actions/ordersActions";
import { listUsers } from "../actions/userActions";
import { listHardwarePosts } from "../actions/hardwarePostActions";


export default function HomeScreen() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const taskList = useSelector((state) => state.taskList);
  const { loading, error, tasks } = taskList;

  const adminList = useSelector((state) => state.adminList);
  const { loading: loadingAdmin, error: errorAdmin, admins } = adminList;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;

  const hardwarePostList = useSelector((state) => state.hardwarePostList);
  const { loading: loadingPosts, posts } = hardwarePostList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTasks());
    dispatch(listAdmins());
    dispatch(listOrders());
    dispatch(listUsers());
    dispatch(listHardwarePosts());
  }, [dispatch]);

  let myTasks = [];
  if (!loading) {
    tasks.filter((task) => {
      task.users.map((user) => {
        if (user.img == adminInfo.image) {
          myTasks.push(task);
        }
      });
    });
  }

  const selectTask = (task) => {
    setOpenTaskModal(true);
    setTaskSelected(task);
  };

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [taskSelected, setTaskSelected] = useState([]);


  return (
    <div>
      <div>
        <h2 className="home__title">
          Hi {adminInfo.name} {adminInfo.lastname}{" "}
        </h2>
        <p className="home__subtitle">Welcome Back</p>
      </div>

 
      <div className="container__home">
        {loadingUsers ? (
          <h2>Cargando...</h2>
        ) : (
          <div className="card data-card">
            <span>
            <h2>{users.length}</h2>
            <p>Total Gaming Users</p>
            </span>
            <i className='bx bxs-group'></i>
          </div>
        )}
              {loadingOrders ? (
          <h2>Cargando...</h2>
        ) : (
          <div className="card data-card">
            <span>
            <h2>{orders.length}</h2>
            <p>Total Hardware Orders</p>
            </span>
            <i className='bx bxs-package' ></i>
          </div>
        )}
               {loadingPosts ? (
          <h2>Cargando...</h2>
        ) : (
          <div className="card data-card">
            <span>
            <h2>{posts.length}</h2>
            <p>Total Hardware Posts</p>
            </span>
            <i className='bx bxl-blogger'></i>
          </div>
        )}
         <div>
          {loading ? (
        <h2>CARGANDO...</h2>
      ) : (
          <div className="task__card home-task">
            <div className="task__card-title">To do</div>
                {myTasks
              .filter((task) => task.users.map((user) => user.img === adminInfo.image) )
              .filter((task) => task.state === 0)
              .map((task) => (
                <div className="card__item" onClick={() => selectTask(task)}>
                  <div className="card__task-header">
                    <span className={task.priority} title={task.priority}></span>
                    <button className="check__task"><i className='bx bx-subdirectory-right'></i></button>
                  </div>
                    <h2 className="task__item-title">{task.title}</h2>
                    <p className="task__item-description">{task.description}</p>
                  <div className="card__task-footer">
                    <div className="item__date">
                    <i className='bx bxs-time-five'></i> {timeago.format(task.createdAt)}
                    </div>
                    <div className="item__users">
                      {task.users.map((user) => (
                        <div className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              </div>
      )}
          </div>
      </div>

      <div className="container__home">
         
      </div>
    </div>
  );
}
