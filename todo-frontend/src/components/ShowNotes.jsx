import { useState, useEffect } from "react"
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export default function ShowNotes({ formSubmitted, setSuccess, setMessage, toggleToast }) {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const showNotes = async () => {
      console.log("Fetching notes");
      try {
        const res = await axios.get('http://localhost:5000/note/show', {
          headers: {Authorization: `Bearer ${token}`}
        });
        if (res.data.length > 0) {
          setNotes(res.data);
        }
      } catch(err) {
        console.error(err);
      }
    }
    showNotes();
  }, [token, formSubmitted]);

  const deleteNote = async (id) => {
    console.log("Deleting note with id = " + id);
    try {
      const res = await axios.post(`http://localhost:5000/note/delete/${id}`);
      console.log(res);
      if(res.data.success) {
        console.log("deletion successful");
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.filter((note) => note.notes_id !== id);
          console.log(`Updated Notes = ${updatedNotes}`);
          return updatedNotes;
        })
        setSuccess(true);
        setMessage(res.data.message);
      } else {
        console.log("failed");
        setSuccess(false);
        setMessage(res.data.message);
      }
      toggleToast();
    } catch(err) {
      console.error(err);
    }
  }


  return (
    <div style={{marginLeft: '20px'}}>
      <h3>Your Notes</h3>
      <div className="d-flex m-2 flex-wrap">
        {notes.length > 0 ?
        <>
          {notes.map((note, index) => (
            <Card style={{width: '12rem', height:'15rem', marginRight:'5px', marginTop:'5px'}} key={index}>
              <Card.Body>
                <Card.Title>{note.heading}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
              </Card.Body>
              <div className="d-flex">
                <Button variant="primary" style={{width:'3rem'}} className="flex-fill m-2" ><RemoveRedEyeIcon /></Button>
                <Button variant="primary" style={{width:'3rem'}} className="flex-fill m-2"><ModeEditIcon /></Button>
                <Button variant="danger" style={{width:'3rem'}} onClick={() => deleteNote(note.notes_id)} className="flex-fill m-2"><DeleteIcon /></Button>
              </div>
            </Card>
          ))}
        </> : <>
          <h6>No notes found</h6>
        </>
        }
      </div>
    </div>
  )
}
