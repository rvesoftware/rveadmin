import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from '../../actions/notesActions';
import Note from './Note';

export default function NoteSidebar() {

  const noteCreate = useSelector((state) => state.noteCreate)
  const {loading, error, note} = noteCreate;

  const dispatch = useDispatch();
  
  
  const [desc, setDesc] = useState('');
  const newNote = () => {
    dispatch(createNote());
    console.log('CLICK')
  } 

  // useEffect(() => {

  // }, [success])

  return (
    <div className='note__container'>
    <div className='note__sidebar'>
        <div className='sidebar__header'>
            <h2><i className='bx bx-note' ></i> Notes</h2>
            <button onClick={() => newNote()}> <i className='bx bx-plus' ></i>Add Note</button>
        </div>
        <p>1 note</p>

     </div>
        <Note title={note.title} desc={note.desc} />
    </div>
  );
}
