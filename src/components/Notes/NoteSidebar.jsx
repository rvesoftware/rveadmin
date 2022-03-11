import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, listNotes } from '../../actions/notesActions';
import Note from './Note';
import * as timeago from "timeago.js"
import { NOTE_CREATE_RESET, NOTE_CREATE_SUCCESS } from '../../constants/notesConstants';
import { NavLink, useLocation, useNavigate} from 'react-router-dom';

export default function NoteSidebar(props) {

  const noteCreate = useSelector((state) => state.noteCreate)
  const {loading, error, success, note} = noteCreate;

  const noteList = useSelector((state) => state.noteList)
  const {loading: loadingList, error: errorList, notes} = noteList;

  const noteUpdate = useSelector((state) => state.noteUpdate)
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = noteUpdate;

  const [noteSelected, setNoteSelected] = useState([])

  const dispatch = useDispatch();

  const location = useLocation();
  let navigate = useNavigate();
  
  const [desc, setDesc] = useState('');
  const newNote = () => {
    dispatch(createNote());
    if(success){
      setNoteSelected(note)
      navigate({ pathname:`/notes/${note._id}`})
      dispatch({ type: NOTE_CREATE_RESET }); 
    }
  } 
  

  useEffect(() => {

    dispatch(listNotes());
  }, [props.history, dispatch, success])

  return (
    <div className='note__container'>
    <div className='note__sidebar'>
    {loadingList? (
        <h2>Cargando...</h2>
      ): (
        <>
        <div className='sidebar__header'>
            <h2><i className='bx bx-note' ></i> All Notes</h2>
            <button onClick={newNote}> <i className='bx bx-plus' ></i>Add Note</button>
        </div>
        <p className='notes-length'>{notes.length} notes</p>
        <div>
        
        
        {notes.map((newNote) => (
          <NavLink to={`/notes/${newNote._id}` } onClick={()=> setNoteSelected(newNote)} key={newNote._id} className="note-item" >
            <div>
            <h2>{newNote.title}</h2>
            <p>{newNote.desc}</p>
            </div>
            <span>{timeago.format(newNote.createdAt)}</span> 

          </NavLink>
        ))}
        
        </div>
        </>

    )}
     </div>
          <Note theNote={noteSelected} />
    </div>
  );
}
