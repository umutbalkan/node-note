console.log("Start notes...");

const fs = require('fs');

var fetchNote = () => {
  try {
    var notesString = fs.readFileSync("notes-data.json");
    return JSON.parse(notesString);
  } catch (e){
    return [];
  }
}

var saveNote = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNote();
    var note = {
      title,
      body
};

  var duplicateNotes = notes.filter((note) => note.title === title);

  if( duplicateNotes.length === 0){
    notes.push(note);
    saveNote(notes);
    return note;
  }
};



var getAll = () => {
  return fetchNote();
};

var getNote = (title) => {
  var notes = fetchNote();
  var searchNote = notes.filter((note) => note.title === title);
  if(searchNote[0]){
    logNote(searchNote[0]);
  } else {
    console.log("Note ~ found.");
  }

};

var removeNote = (title) => {
  var notes = fetchNote();
  var deletednotes = notes.filter((note) => note.title !== title);
  saveNote(deletednotes);
  if (notes.length === deletednotes.length){
    console.log("Note is ~ exist");
  }
  else{
    console.log("Note deleted.");
  }

};

var logNote = (note) => {
  debugger;
  console.log("---");
  console.log("Title: " + note.title);
  console.log("Body: " + note.body);
}

module.exports = {
  logNote,
  addNote,
  getAll,
  getNote,
  removeNote
};
