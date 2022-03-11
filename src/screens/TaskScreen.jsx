import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createTask, listTasks, updateTask} from '../actions/taskActions'
import * as timeago from 'timeago.js'
import { useState } from "react";
import { TASK_CREATE_RESET, TASK_UPDATE_RESET } from "../constants/taskConstants";
import { listAdmins } from "../actions/adminActions";

export default function TaskScreen() {

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [priority, setPriority] = useState('Delayed');
  const [title, setTitle] = useState('Unknown');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [myTask, setMyTask] = useState('false');

  const [taskSelected, setTaskSelected] =useState([])

  const taskList = useSelector((state) => state.taskList);
  const { loading, error, tasks } = taskList;

  const adminList = useSelector((state) => state.adminList);
  const { loading: loadingAdmin, error: errorAdmin, admins } = adminList;

  const taskCreate = useSelector((state) => state.taskCreate);
  const {success: successCreate} = taskCreate;

  const taskUpdate = useSelector((state) => state.taskUpdate);
  const { success: successUpdate} = taskUpdate;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createTask(priority, title, description, users));
  };

  useEffect(() => {
    if(successUpdate){
      console.log("entro")
      dispatch({ type: TASK_UPDATE_RESET }); 
      window.location.replace('');
  }
    if(successCreate){
      dispatch({ type: TASK_CREATE_RESET });
      setTitle('');
      setDescription("");
      setPriority("Delayed");
      setUsers([]);
    }

    dispatch(listTasks());
    dispatch(listAdmins());
  }, [dispatch, successCreate, successUpdate]);

  const addUser = (data) => {
    setUsers(prevItems => [...prevItems, {
      name: data.name,
      img: data.img
    }]);
  }

  const selectTask = (task) => {
    setOpenTaskModal(true);
    setTaskSelected(task);
  }

  const updateTaskManager = (task) => {
    setOpenTaskModal(false)
    dispatch(updateTask(task))
}

  let myTasks = []
  if(!loading){
    tasks.filter((task) => {
      task.users.map((user) => {
        if(user.img == adminInfo.image){
          myTasks.push(task)
        }
      })})
    }
  return (
    <div>
      <div className='section__header'>
        <button className='btn' onClick={() => setOpenModal(!openModal)}>Add Task</button>
        <div>
          <select name="" id="" onChange={(e) => setMyTask(e.target.value)}>
            <option value="false" >ALL</option>
            <option value="true">MY TASKS</option>
          </select>

          <button className='btn-none'>EXPORT</button>
        </div>
      </div>

      {loading ? (
        <h2>CARGANDO...</h2>
      ) : (
        <div className="task__container">
          <div className="task__card">
            <div className="task__card-title">To do</div>
            {myTask == "true"? (
              <>
                {myTasks
              .filter((task) => task.users.map((user) => user.img === adminInfo.image) )
              .filter((task) => task.state === 0)
              .map((task) => (
                <div key={task._id} className="card__item" onClick={() => selectTask(task)}>
                  <div className="card__task-header">
                    <span className={task.priority} title={task.priority}></span>
                    <button onClick={() => updateTaskManager(task)} className="check__task"><i className='bx bx-subdirectory-right'></i></button>
                  </div>
                    <h2 className="task__item-title">{task.title}</h2>
                    <p className="task__item-description">{task.description}</p>
                  <div className="card__task-footer">
                    <div className="item__date">
                    <i className='bx bxs-time-five'></i> {timeago.format(task.createdAt)}
                    </div>
                    <div className="item__users">
                      {task.users.map((user) => (
                        <div key={user._id} className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              </>
            )
              :
              (
                <>
                {tasks
              .filter((task) => task.users.map((user) => user.img === adminInfo.image) )
              .filter((task) => task.state === 0)
              .map((task) => (
                <div key={task._id} className="card__item" onClick={() => selectTask(task)}>
                  <div className="card__task-header">
                    <span className={task.priority} title={task.priority}></span>
                    <button onClick={() => updateTaskManager(task)} className="check__task"><i className='bx bx-subdirectory-right'></i></button>
                  </div>
                    <h2 className="task__item-title">{task.title}</h2>
                    <p className="task__item-description">{task.description}</p>
                  <div className="card__task-footer">
                    <div className="item__date">
                    <i className='bx bxs-time-five'></i> {timeago.format(task.createdAt)}
                    </div>
                    <div className="item__users">
                      {task.users.map((user) => (
                        <div key={user._id} className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
                </>
              
            )}
          </div>
          <div className="task__card">
            <div className="task__card-title">In Process</div>
            {myTask == "true"? (
              <>
                {myTasks
              .filter((task) => task.users.map((user) => user.img === adminInfo.image) )
              .filter((task) => task.state === 1)
              .map((task) => (
                <div key={task._id} className="card__item" onClick={() => selectTask(task)}>
                  <div className="card__task-header">
                    <span className={task.priority} title={task.priority}></span>
                    <button onClick={() => updateTaskManager(task)} className="check__task"><i className='bx bx-subdirectory-right'></i></button>
                  </div>
                    <h2 className="task__item-title">{task.title}</h2>
                    <p className="task__item-description">{task.description}</p>
                  <div className="card__task-footer">
                    <div className="item__date">
                    <i className='bx bxs-time-five'></i> {timeago.format(task.createdAt)}
                    </div>
                    <div className="item__users">
                      {task.users.map((user) => (
                        <div key={user._id} className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              </>
            )
              :
              (
                <>
                {tasks
              .filter((task) => task.users.map((user) => user.img === adminInfo.image) )
              .filter((task) => task.state === 1)
              .map((task) => (
                <div key={task._id} className="card__item" onClick={() => selectTask(task)}>
                  <div className="card__task-header">
                    <span className={task.priority} title={task.priority}></span>
                    <button onClick={() => updateTaskManager(task)} className="check__task"><i className='bx bx-subdirectory-right'></i></button>
                  </div>
                    <h2 className="task__item-title">{task.title}</h2>
                    <p className="task__item-description">{task.description}</p>
                  <div className="card__task-footer">
                    <div className="item__date">
                    <i className='bx bxs-time-five'></i> {timeago.format(task.createdAt)}
                    </div>
                    <div className="item__users">
                      {task.users.map((user) => (
                        <div key={user._id} className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
                </>
              
            )}
          </div>
          <div className="task__card">
            <div className="task__card-title">Review</div>
            {myTask == "true"? (
              <>
                {myTasks
              .filter((task) => task.users.map((user) => user.img === adminInfo.image) )
              .filter((task) => task.state === 2)
              .map((task) => (
                <div key={task._id} className="card__item" onClick={() => selectTask(task)}>
                  <div className="card__task-header">
                    <span className={task.priority} title={task.priority}></span>
                    <button onClick={() => updateTaskManager(task)} className="check__task"><i className='bx bx-subdirectory-right'></i></button>
                  </div>
                    <h2 className="task__item-title">{task.title}</h2>
                    <p className="task__item-description">{task.description}</p>
                  <div className="card__task-footer">
                    <div className="item__date">
                    <i className='bx bxs-time-five'></i> {timeago.format(task.createdAt)}
                    </div>
                    <div className="item__users">
                      {task.users.map((user) => (
                        <div key={user._id} className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              </>
            )
              :
              (
                <>
                {tasks
              .filter((task) => task.users.map((user) => user.img === adminInfo.image) )
              .filter((task) => task.state === 2)
              .map((task) => (
                <div key={task._id} className="card__item" onClick={() => selectTask(task)}>
                  <div className="card__task-header">
                    <span className={task.priority} title={task.priority}></span>
                    <button onClick={() => updateTaskManager(task)} className="check__task"><i className='bx bx-subdirectory-right'></i></button>
                  </div>
                    <h2 className="task__item-title">{task.title}</h2>
                    <p className="task__item-description">{task.description}</p>
                  <div className="card__task-footer">
                    <div className="item__date">
                    <i className='bx bxs-time-five'></i> {timeago.format(task.createdAt)}
                    </div>
                    <div className="item__users">
                      {task.users.map((user) => (
                        <div key={user._id} className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
                </>
              
            )}
          </div>
          <div className="task__card">
            <div className="task__card-title">Finished</div>
            {myTask == "true"? (
              <>
                {myTasks
              .filter((task) => task.users.map((user) => user.img === adminInfo.image) )
              .filter((task) => task.state === 3)
              .map((task) => (
                <div key={task._id} className="card__item" onClick={() => selectTask(task)}>
                  <div className="card__task-header">
                    <span className={task.priority} title={task.priority}></span>
                    <button onClick={() => updateTaskManager(task)} className="check__task"><i className='bx bx-subdirectory-right'></i></button>
                  </div>
                    <h2 className="task__item-title">{task.title}</h2>
                    <p className="task__item-description">{task.description}</p>
                  <div className="card__task-footer">
                    <div className="item__date">
                    <i className='bx bxs-time-five'></i> {timeago.format(task.createdAt)}
                    </div>
                    <div className="item__users">
                      {task.users.map((user) => (
                        <div key={user._id} className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              </>
            )
              :
              (
                <>
                {tasks
              .filter((task) => task.users.map((user) => user.img === adminInfo.image) )
              .filter((task) => task.state === 3)
              .map((task) => (
                <div key={task._id} className="card__item" onClick={() => selectTask(task)}>
                  <div className="card__task-header">
                    <span className={task.priority} title={task.priority}></span>
                    <button onClick={() => updateTaskManager(task)} className="check__task"><i className='bx bx-subdirectory-right'></i></button>
                  </div>
                    <h2 className="task__item-title">{task.title}</h2>
                    <p className="task__item-description">{task.description}</p>
                  <div className="card__task-footer">
                    <div className="item__date">
                    <i className='bx bxs-time-five'></i> {timeago.format(task.createdAt)}
                    </div>
                    <div className="item__users">
                      {task.users.map((user) => (
                        <div key={user._id} className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
                </>
              
            )}
          </div>
        </div>
      )}

<div className={openModal ? 'modal active' : 'modal'}>
        <div className="modal__dialog">
          <div className="modal__card">
            <div className="card__header b-line">
              <h2 className="card__title">Add Task</h2>
              <button
                className="card__title btn-icon"
                onClick={() => setOpenModal(!openModal)}
              >
                <i className="bx bxs-x-circle"></i>
              </button>
            </div>
            <div className="card__body">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <select name="" id="" onChange={(e) => setPriority(e.target.value)}>
                    <option value="Delayed">Delayed</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Express">Express</option>
                  </select>
                </div>

                <div className="form-group">
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                </div>
                <div className="form-grup labels-task">
                  {loadingAdmin? (<h2>CARGANDO...</h2>) : (
                    <>
                  {admins.map((admin) => (
                    <label key={admin._id} htmlFor={admin.name} title={admin.name + " " + admin.lastname }>
                    <div className="picture">
                      <img src={admin.image} alt="" />
                    </div>
                    <input type="checkbox" onChange={() => addUser({name: admin.name + " " + admin.lastname , img:admin.image})} name={admin.name} id={admin.name} />
                  </label>
                  ))}  
                   </>
                  )}
                </div>
              </form>
            </div>
            <div className="card__footer">
              <button className="btn" onClick={submitHandler}>
                Save
              </button>
            </div>
          </div>
        </div>
    </div>

    <div className={openTaskModal ? 'modal active' : 'modal'}>
        <div className="modal__dialog">
          <div className="modal__card">
            <div className="card__header b-line">
              <h2 className="card__title">Task</h2>
              <button
                className="card__title btn-icon"
                onClick={() => setOpenTaskModal(!openTaskModal)}
              >
                <i className="bx bxs-x-circle"></i>
              </button>
            </div>
            <div className="card__body">
              <h2>{taskSelected.title}</h2>
              <p>{taskSelected.description}</p>
              <span>{timeago.format(taskSelected.createdAt)}</span>
              <div className="item__users mb">
                      {taskSelected.users? (taskSelected.users.map((user) => (
                        <div key={user._id} className="picture">
                          <img src={user.img} alt={user.name} title={user.name} />
                        </div>
                      ))) : (<h2>Nom</h2>)}
                    </div>
            </div>
            <div className="card__footer">
            </div>
          </div>
        </div>
    </div>
    </div>

  );
}
