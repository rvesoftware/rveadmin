import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect } from 'react';

export default function Note({title, desc}) {

  const [editorState, setEditorState] = useState(() =>
  EditorState.createEmpty()
);


useEffect(() => {
  console.log(editorState);
}, [editorState]);

  return (
  <div>
    <input type="text" name="" id="" value={title} />
    <div style={{ border: "1px solid black", padding: '2px', minHeight: '900px' }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
  </div>);
}
