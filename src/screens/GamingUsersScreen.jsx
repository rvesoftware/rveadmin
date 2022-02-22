import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";

export default function GamingUsersScreen() {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <h2>Cargando ...</h2>
      ) : (
        <div>
          <div className="section__header">
            <button className="btn">Add User</button>
            <div>
            <button className="btn">{users.length}</button>
              <select name="" id="">
                <option value="">FILTER</option>
              </select>

              <button className="btn-none">EXPORT</button>
            </div>
          </div>

          <div className="list-users">
            {users.map((user) => (
              <div className="item__user">
                <div className="img">
                  <img src={user.photo} alt="" />
                </div>
                <div>
                  <h2>
                    {user.firstname} {user.lastname}
                  </h2>
                  <p>{user.username}</p>
                </div>
                <span>{user.points}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
