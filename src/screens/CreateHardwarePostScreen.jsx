import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import blogActions from "../actions/blogActions.js";
import constantsTemplate from "../constants/constantsTemplate.js";

export default function CreateHardwarePostScreen() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const hardwarePostCreate = useSelector((state) => state.hardwarePostCreate);
  const {success: successCreate} = hardwarePostCreate;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sanitizedHtml, setSanitizedHtml] = useState("");
  const [category, setCategory] = useState("");

  const username = adminInfo.name;
  const userphoto = adminInfo.image;

  
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if(successCreate){
      const blogConstants = new constantsTemplate("BLOG");
      dispatch({type: blogConstants.constants().CREATE_RESET})
      setTitle("");
      setDescription("");
      setCategory("");
      setSanitizedHtml("");
      setImage("");      
    }
  }, [dispatch, successCreate]);

  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(blogActions.create({title, description, image, sanitizedHtml, category, username, userphoto}))
  }

  return (
    <div>
      <form>
      <button className="btn-none mr-2">Clear All</button>
        <button onClick={submitHandler} type="submit" className="btn">Create Post</button>

        <div className="form-group-post">
          <input
            type="text"
            placeholder="Write a title for you post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group-post">
          <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
            <option value="Noticias">Noticias</option>
            <option value="Reviews">Reviews</option>
            <option value="Gaming">Gaming</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
          </select>
        </div>
        <div className="form-group-post">
          {/* <input
            type="text"
            placeholder="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          /> */}
          <input type="file" name="" id="" />
        </div>
        <div className="form-group-post">
          <input
            type="text"
            placeholder="Write a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onChange={() => setSanitizedHtml(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
          )}
        />
        {/* <textarea name="" id="" value={markdown} onChange={(e) => setMarkdown(e.target.value)} cols="30" placeholder="Text" rows="10"> */}

        {/* </textarea> */}
      </form>
    </div>
  );
}
