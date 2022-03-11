import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

export default function CreateHardwarePostScreen() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sanitizedHtml, setSanitizedHtml] = useState("");
  const [category, setCategory] = useState("");

  const username = adminInfo.name;
  const userphoto = adminInfo.image;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

//   setSanitizedHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))

  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  return (
    <div>
      <form action="">
        <div className="form-group-post">
          <input
            type="text"
            placeholder="Write a title wor you post"
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
          />
          {/* <textarea name="" id="" value={markdown} onChange={(e) => setMarkdown(e.target.value)} cols="30" placeholder="Text" rows="10"> */}

          {/* </textarea> */}

      </form>
      <button>Create Post</button>
    </div>
  );
}
