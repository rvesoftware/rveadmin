import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listHardwarePosts } from "../actions/hardwarePostActions";
import * as timeago from 'timeago.js';

export default function PostScreen() {
  const hardwarePostList = useSelector((state) => state.hardwarePostList);
  const { loading, posts } = hardwarePostList;
    const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listHardwarePosts());
  }, [dispatch]);

  console.log(posts)
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
                        <th>Actions</th>
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
