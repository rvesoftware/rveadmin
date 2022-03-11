import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect } from "react";
import * as timeago from "timeago.js";
import { updateNote } from "../../actions/notesActions";
import { useSelector } from "react-redux";
import { NOTE_UPDATE_RESET } from "../../constants/notesConstants";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
export default function Note({ theNote }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateAt, setUpdateAt] = useState("");
  const [isArchive, setIsArchive] = useState("");

  const navigate = useNavigate();

  const noteUpdate = useSelector((state) => state.noteUpdate)
  const {loading, error, success} = noteUpdate;
  const dispatch = useDispatch();
    
  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value)
  };

  const handleDescChange = (e) => {
    console.log(e.target.value);
    setDesc(e.target.value)
  };

  const handleUpdateNote = async (key) => {
    console.log("ENTRITO")
    let query = {};
    if (key == "title") {
      query["title"] = "title";
      
    } else if (key == "desc") {
      query["desc"] = "desc";
    }
    dispatch(updateNote(theNote._id, title, desc));

  };


  useEffect(() => {
    if (theNote && !success) {
      console.log("NUMBER")
      setTitle(theNote.title);
      setDesc(theNote.desc);
      setUpdateAt(theNote.updatedAt);
    }
    
    if(success){
      console.log("ENTROOTRAVEZACA");
      dispatch({ type: NOTE_UPDATE_RESET }); 
    }
  }, [editorState, dispatch, theNote, success, navigate]);

  return (
    <div>
      <div className="note__header-data">
        Last edited on {timeago.format(updateAt)}
      </div>
      <input
      id="title"
      name="title"
        type="text"
        value={title}
        onChange={handleTitleChange}
        onBlur={() => handleUpdateNote("title")}
      />

      <textarea
        name="desc"
        id="desc"
        cols="30"
        placeholder="Start writing"
        rows="10"
        value={desc}
        onChange={handleDescChange}
        onBlur={() => handleUpdateNote("desc")}
      ></textarea>
    </div>
  );
}
