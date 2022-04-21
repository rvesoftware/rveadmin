import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import  blogActions  from "../actions/softwareBlogActions";
import * as timeago from 'timeago.js';
import constantsTemplate from "../constants/constantsTemplate";
import { useNavigate } from "react-router-dom";

export default function SoftwarePostScreen() {
  const navigate = useNavigate();

  const softwarePostList = useSelector((state) => state.softwarePostList);
  const { loading, data: posts } = softwarePostList;

  const softwarePostDelete = useSelector((state) => state.softwarePostDelete);
  const { success } = softwarePostDelete;

    const [search, setSearch] = useState('');

  const dispatch = useDispatch();


  const deleteHandler = (element) => {
    dispatch(blogActions.deleteNewUrl(element._id));
  }
  useEffect(() => {
    if(success){
      const blogConstants = new constantsTemplate("BLOG_SOFTWARE");
      dispatch({ type: blogConstants.constants().DELETE_RESET });
    }
    dispatch(blogActions.listNewUrl());
  }, [dispatch, success]);

  return (
    <>
      {loading ? (
        <p>CARGANDO...</p>
      ) : (
        <div>
          <div className="section__header">
            <button className="btn">Add Post</button>
            <div>
              <select name="" id="">
                <option value="">FILTER</option>
              </select>

              <button className="btn-none">EXPORT</button>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <input type="text" className="input" value={search} onChange={ (e) => setSearch(e.target.value)} placeholder="Search..." />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
                .map((post) => (
                    <tr key={post._id}>
                        <th>{post.title}</th>
                        <th>{post.status}</th>
                        <th>{timeago.format(post.createdAt, 'en_US')}</th>
                        <th>
                        <button className="btn-icon" onClick={() => navigate(`/hardwarePost/${post._id}`)}><i className='bx bxs-pencil' ></i></button>
                          <button className="btn-icon" onClick={() => deleteHandler(post)}><i className='bx bxs-trash' ></i></button>
                        </th>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
