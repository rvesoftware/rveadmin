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
import axios from "axios";
import LoadingBox from '../components/LoadingBox'
import { useNavigate, useParams } from "react-router-dom";
import { convertFromRaw } from "draft-js";
import { convertFromHTML } from "draft-js";
import { ContentState } from "draft-js";

export default function EditHardwarePostScreen(props) {
  
  const navigate = useNavigate();
  const params = useParams();
  const {id: postId} = params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sanitizedHtml, setSanitizedHtml] = useState("");
  const [category, setCategory] = useState("");

  const hardwarePostDetails = useSelector((state) => state.hardwarePostDetails);
  const { loading: loadingDetails,  data: post } = hardwarePostDetails;

  console.log(post)
  const hardwarePostUpdate = useSelector((state) => state.hardwarePostUpdate);
  const { success: successUpdate } = hardwarePostUpdate;


  const generalReducer = useSelector((state) => state.generalReducer);
  const { loading: loadingReducer } = generalReducer;



  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (successUpdate) {
      const blogConstants = new constantsTemplate("BLOG");
      dispatch({ type: blogConstants.constants().CREATE_RESET });
      setTitle("");
      setDescription("");
      setCategory("");
      setSanitizedHtml("");
      setImage("");
    }

    if(!post || post._id !== postId || successUpdate){
      const blogConstants = new constantsTemplate("BLOG");
      dispatch({ type: blogConstants.constants().UPDATE_RESET });
      dispatch(blogActions.one(postId))
    }else{
      setTitle(post.title)
      setDescription(post.description)
      setImage(post.image)
      setCategory(post.category)
      setSanitizedHtml(post.sanitizedHtml)
      const contentState = ContentState;
      setEditorState(EditorState.createWithContent(contentState.createFromBlockArray(convertFromHTML( post.sanitizedHtml).contentBlocks)))
    }
  }, [dispatch, successUpdate, post, postId, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      blogActions.update({
        _id: postId,
        title: title,
        description: description,
        image: image,
        sanitizedHtml: sanitizedHtml,
        category: category,
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
      {loadingDetails? <LoadingBox /> : (

      <form>
        <button className="btn-none mr-2">Clear All</button>
        <button onClick={submitHandler} type="submit" className="btn">
          Save Post
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
          <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
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
