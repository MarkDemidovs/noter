import { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";

export default function App() {
  const [notesInfo, setNotesInfo] = useState<string[]>(["a"]);
  const [mainInput, setMainInput] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => {
        console.log("Fetched notes: ", res.data);
        setNotesInfo(res.data.map((note: { content: string }) => note.content));
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, []);

  const handleNoteChange = (index: number, value: string) => {
    setNotesInfo((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes[index] = value;
      return updatedNotes;
    });
  };

  const createNote = () => {
    if (mainInput.trim()) {
      axios
        .post("http://localhost:3000/api/notes", { note: mainInput })
        .then((res) => {
          setNotesInfo((prevNotes) => [...prevNotes, res.data.content]);
          setMainInput("");
        })
        .catch((err) => {
          console.error("Error creating note through axios backend:", err);
          alert("Error creating note!");
        });
    } else {
      console.log("error! fully blank input.");
    }
  };

  return (
    <>
      <div className="container">
        <button onClick={createNote}>Create</button>
        <input
          type="text"
          value={mainInput}
          onChange={(e) => setMainInput(e.target.value)}
          placeholder="write something.."
        ></input>
      </div>

      <div>
        {notesInfo.map((note, index) => (
          <textarea
            key={index}
            value={note}
            onChange={(e) => handleNoteChange(index, e.target.value)}
            
          />
        ))}
      </div>
    </>
  );
}
