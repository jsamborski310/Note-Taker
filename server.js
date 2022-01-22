const express = require('express');
const path = require('path');

const notes = require( './db/db.json') //Check if this is the correct path
// Make sure this file has an array format of json data. [{ "title" : "test title"}]

const app = express();
const PORT = process.env.PORT || 3001;

app.use( express.static("public") );

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//////////////////////

app.get('/notes', (req, res)=> {

    //send the file notes.html. 
    // SEE PREVIOUS CLASS NOTES FOR THIS SET UP. 
    res.sendFile( path.join(__dirname, 'public/notes.html') );

});

app.get('/api/notes', (req, res) => {

    // send the file http://localhost:3001/api/notes
    // sending json data /*send note data*/

    res.json( /* send note data */);
});

app.post('/api/notes', (req, res) => {

    // Access th note data that as sent

    const newNote = req.body

    // NEED TO ADD ON TO NEWNOTE IF DELETE FUNCTION IS INCLUDED
    // ADD NOTEDATA TO EXISTING ARRAY LIST


    // Create (persist) data
    // Access the new note data from 'req'
    // Push it to my existing list of notes
    // Stringify array list of data and write it. See highscores list from code quiz.
    // Write my updated note list to the d`db.json`


    // Test. On console, look at Response tab in Network.
        res.json( 'a message' )

});



app.listen(PORT, () =>
    console.log(`Example app listening http://localhost:${PORT}`)

)

// SEE ACTIVITY 20 FROM DAY 2. MAY HAVE EVERYTHING.
// NEED TO SET UP VARIOUS ROUTES
// USE INSOMNIA TO SEE POST AND GET REQUEST. SEE PAYLOAD TAB IN NETWORK TAB.
// IN INSOMNIA, MAKE SURE EVERYTHING IS WRAPPED IN QUOTES
// INSOMNIA > POST > SELECT JSON. 

// LOOK AT SAT CLASS EXAMPLE. THEY READ THE FILE BEFORE WRITING IT. MORE EFFICIENT THAN REQUIRING THE FILE AT THE BEGINNING. KEEPING THE REQUIRE AT THE TOP JUST MEANS THAT THE DATA WILL ALWAYS BE THERE. WITH READ FILE, THE FILE WILL BE READ WHEN WE NEED IT TO. MEMORY EFFICIENT.

// MAKE SURE GITIGNORE NODE_MODULES. HEROKU WILL NOT READ IT.


