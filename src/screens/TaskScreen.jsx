import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {listTasks} from '../actions/taskActions'

export default function TaskScreen() {
  const taskList = useSelector((state) => state.taskList);
  const { loading, error, tasks } = taskList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTasks());
  }, [dispatch]);

  console.log(tasks)

  return (
    <div>
      <h2>Task</h2>

      {loading ? (
        <h2>CARGANDO...</h2>
      ) : (
        <div className="task__container">
          <div className="task__card">
            <div className="task__card-title">To do</div>
            {tasks
              .filter((task) => task.state === 0)
              .map((task) => (
                <div className="card__item">
                    <h2>{task.title}</h2>
                </div>
              ))}
          </div>
          <div className="task__card">
            <div className="task__card-title">In Process</div>
          </div>
          <div className="task__card">
            <div className="task__card-title">Review</div>
          </div>
          <div className="task__card">
            <div className="task__card-title">Finished</div>
          </div>
        </div>
      )}
    </div>
  );
}
