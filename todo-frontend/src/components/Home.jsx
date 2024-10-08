// import React from 'react'
import { useState } from "react";
// import Form from "./Form";
import ShowNotes from "./ShowNotes";
import ToastFile from "./ToastFile";
import NoteModal from "./NoteModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Home() {

  const navigate = useNavigate();
  
  const { isLoggedIn, isMobile } = useAuth();

  // state for toasts
  const [showToast, setShowToast] = useState(false);

  // state for opening a modal for note writing
  const [newModal, setnewModal] = useState(false);

  // formSubmitted state is for re-rendering of the notes after user has submitted or deleted a note
  const [formSubmitted, setFormSubmitted] = useState(false);

  // states success and message are for toasts
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);


  const handleChange = () => {
    // changing the state from true to false and vice versa everytime the function is called, resulting in re-render of the ShowNotes component
    setFormSubmitted(prevState => !prevState);
  }

  // functions for toggling modals
  const openModal = () => {
    setnewModal(true);
  }

  const closeModal = () => {
    setnewModal(false);
  }

  // function to handle create note button click
  const handleCreateNoteClick = () => {
    if(isLoggedIn)
    {
      if(isMobile)
      {
        navigate("/create-note");
      } else {
        openModal(setnewModal);
      }
    }
    else {
      navigate('/login');
    }
  }

  const toggleToast = () => setShowToast(!showToast); // function to render toast

  return (
    <>
        <ToastFile show={showToast} onClose={toggleToast} success={success} message={message} />
        <div className="d-flex align-items-center justify-content-center my-7">
          <button className="btn btn-primary m-3" onClick={handleCreateNoteClick}>
            Create a New Note
          </button>
        </div>
        <ShowNotes formSubmitted={formSubmitted} setSuccess={setSuccess} setMessage={setMessage} toggleToast={toggleToast} handleChange={handleChange} />
        <NoteModal isOpen={newModal} closeModal={() => closeModal(setnewModal)} handleChange={handleChange} setSuccess={setSuccess} setMessage={setMessage} toggleToast={toggleToast} />
    </>
  )
}
