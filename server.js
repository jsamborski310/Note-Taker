const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let notes = require( './db/db.json')
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


app.get('/api/notes', (req, res) => {

    
    console.info(`${req.method} request received to add a note`);

    res.json(notes)
    

});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.post('/api/notes', (req, res) => {

    console.info(`${req.method} request received to add a review`);
 
    const { title, text } = req.body;

    if (title && text ) {
        // Variable for the object we will save
        const newNote = {
          title,
          text,
          note_id: uuidv4(),
        };



    // Read existing notes
        // fs.readFile('./db/db.json', 'utf8', (err, data) => {
        //     if (err) {
        //     console.error(err);
        //     } else {

    // Pushes new notes onto notes stored.
        // notes.push(newNote);

        // allNotes = JSON.parse(notes);    
        // allNotes.push(newNote);

        
        // notes.push(newNote);
        // const allNotes = JSON.parse(data);

        // Add a new review

        notes.push(newNote); 
        allNotes = JSON.stringify(notes, null, 4)

        
       

        fs.writeFile(
            './db/db.json', allNotes, 
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
    //     }
    // });
       
        const response = {
            status: 'success',
            body: newNote,
          };
      
          console.log(response);
          res.status(201).json(response);
        } else {
          res.status(500).json('Error in posting review');
        }

    }

);


app.listen(PORT, () =>
    console.log(`Example app listening http://localhost:${PORT}`)

);

