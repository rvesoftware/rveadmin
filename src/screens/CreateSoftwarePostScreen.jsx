import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import constantsTemplate from "../constants/constantsTemplate.js";
import axios from "axios";
import LoadingBox from '../components/LoadingBox'
import softwareBlogActions from "../actions/softwareBlogActions.js";

export default function CreateSoftwarePostScreen() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const softwarePostCreate = useSelector((state) => state.softwarePostCreate);
  const { loading, success: successCreate } = softwarePostCreate;


  const generalReducer = useSelector((state) => state.generalReducer);
  const { loading: loadingReducer } = generalReducer;

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
    if (successCreate) {
      const blogConstants = new constantsTemplate("BLOG_SOFTWARE");
      dispatch({ type: blogConstants.constants().CREATE_RESET });
      setTitle("");
      setDescription("");
      setCategory("");
      setSanitizedHtml("");
      setImage("");
    }
  }, [dispatch, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      softwareBlogActions.createNewUrl({
        title,
        category,
        image,
        description,
        content: sanitizedHtml,
        username,
        userphoto,
      })
    );
  };

  const uploadHandler = async (e, imageFIeld = "image") => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post(
        "https://rveapi.herokuapp.com/api/v1/users/upload",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({ type: "UPLOAD_SUCCESS" });
      setImage(data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-post">
      {loading? <LoadingBox /> : (

      <form>
        <button className="btn-none mr-2">Clear All</button>
        <button onClick={submitHandler} type="submit" className="btn">
          Create Post
        </button>

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
            <option value="Automatizacion">Automatizacion</option>
            <option value="Empresas">Empresas</option>
            <option value="Marketing">Marketing</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Desarrollo">Desarollo</option>
          </select>
        </div>
        <div className="form-group-post">
          {/* <input
            type="text"
            placeholder="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          /> */}
          {loadingReducer? <LoadingBox /> : (
<>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => uploadHandler(e, "featuredImage")}
          />
          <img className="img-preview" src={image} />
          </>
          )}

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
          onChange={() =>
            setSanitizedHtml(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            )
          }
        />
        {/* <textarea name="" id="" value={markdown} onChange={(e) => setMarkdown(e.target.value)} cols="30" placeholder="Text" rows="10"> */}

        {/* </textarea> */}
      </form>
      )}

    </div>
  );
}
