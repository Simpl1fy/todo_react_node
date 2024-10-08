// import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useRef, useMemo } from "react";
import JoditEditor from 'jodit-react';
import api from "../config/axiosConfig";

export default function NoteViewEditModal({ isOpen, closeModal, isDisabled, heading, content, noteId, setSuccess, setMessage, handleChange, toggleToast }) {

  const [editHeading, setEditHeading] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    setEditHeading(heading);
    setEditContent(content);
  }, [heading, content])

  const editor = useRef(null);

  const config = useMemo(() => ({
      readonly: isDisabled,
      placeholder: 'Start typing...'
    }), [isDisabled]);




  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      heading: editHeading,
      content: editContent
    }
    try {
      const res = await api.put(`/note/update/${noteId}`, updatedData);
      if(res.data.success) {
        console.log("Your note has been updated successfully");
        setSuccess(true);
        setMessage(res.data.message);
        handleChange();
        closeModal();
      } else {
        console.log("Failed");
        setSuccess(false);
        setMessage(res.data.message);
        closeModal();
      }
      toggleToast();
    } catch(err) {
      console.error(err);
    }
  }

  const handleClose = () => {
    setEditContent(content);
    setEditHeading(heading);
    closeModal();
  }

  return (
    <div>
      <Modal
        show={isOpen}
        onHide={handleClose}
        size='xl'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{isDisabled ? 'View Note' : 'Edit Note'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-container">
            <form className="px-auto border border-2 border-dark p-3 rounded-4 bg-light">
              <div className="mb-3">
                <label htmlFor="heading" className="form-label">
                  <strong>Heading</strong>
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="headingInput"
                  onChange={(e) => setEditHeading(e.target.value)}
                  disabled={isDisabled}
                  value={editHeading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="explanation" className="form-label">
                  <strong>Explanation</strong>
                </label>
                <JoditEditor
                  ref={editor}
                  value={editContent}
                  config={config}
                  tabIndex={1}
                  onBlur={newContent => setEditContent(newContent)}
                  onChange={newContent => setEditContent(newContent)}
                />
              </div>
            </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          {isDisabled ?
            <>
              <Button variant='danger' onClick={closeModal}>Close</Button>
            </> :
            <>
              <Button variant='primary' onClick={handleUpdate}>Update</Button>
              <Button variant='danger' onClick={handleClose}>Close</Button>
            </>
          }
        </Modal.Footer>
      </Modal>
    </div>
  )
}
