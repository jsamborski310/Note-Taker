const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let notes = require( './db/db.json');
const { parse } = require('path');
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

app.delete('/api/notes/:id', (req, res) => {


    const noteIndex = notes.findIndex(({id}) => id === req.params.id);

    if (noteIndex >= 0) {

        // const updatedNotes = notes.splice(noteIndex, 1)
        // const parseUpdatedNotes = JSON.parse(updatedNotes)

        notes.splice(noteIndex, 1)

        // const updatedNotes = JSON.stringify(notes, null)

        // fs.writeFile(
        //     './db/db.json', updatedNotes, // notes or allNotes
        //     (writeErr) =>
        //       writeErr
        //         ? console.error(writeErr)
        //         : console.info('Successfully deleted notes with ID:' + req.params.id)
        //   );

          fs.writeFile(
            './db/db.json', JSON.stringify(notes, null, 4), // notes or allNotes
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully deleted notes with ID:' + req.params.id)
          );

        
    }

});



app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
    console.log(`Example app listening http://localhost:${PORT}`)

);

