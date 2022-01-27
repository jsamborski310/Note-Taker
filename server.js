
// Packages needed for this application.
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Pulls in database data
let notes = require( './db/db.json');

// Receives data
let allNotes = "";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( express.static("public") );

//////////////////////



app.get('/notes', (req, res)=> 
    res.sendFile( path.join(__dirname, './public/notes.html') )
);

// Grabs database data to display
app.get('/api/notes', (req, res) => 
    res.json(notes)
);


app.post('/api/notes', (req, res) => {

    console.info(`${req.method} request received to add a new note`);
 
    const { title, text } = req.body;

    if (title && text ) {

     // Variable for the object being saved
        const newNote = {
          title,
          text,
          id: uuidv4(),
        };

        // Adds new note to array of saved notes
        notes.push(newNote); 

        allNotes = JSON.stringify(notes, null, 4)

        fs.writeFile(
            './db/db.json', allNotes, 
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated your notes!')
          );
   
       
        const response = {
            status: 'success',
            body: newNote,
          };
      
          console.log(response);
          res.status(201).json(response);
        } else {
          res.status(500).json('Error in adding note.');
        }

    }

);

app.get('/api/notes/:id', (req, res) => 
    res.json(req.params.id)
);

// Deletes notes and removes it from database and HTML
app.delete('/api/notes/:id', (req, res) => {

    // Searches through notes to find matching ID
    const noteIndex = notes.findIndex(({id}) => id === req.params.id);

    // Deletes note with matching ID
    if (noteIndex >= 0) {
        notes.splice(noteIndex, 1)

        // Re-writes file, after removing deleted note.
          fs.writeFile(
            './db/db.json', JSON.stringify(notes, null, 4), 
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully deleted note with ID:' + req.params.id)
          );

        //   Route fired when delete button clicked is valid, and responds with the above logic.
          res.sendStatus(204)
    }

});


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
    console.log(`Example app listening http://localhost:${PORT}`)

);

