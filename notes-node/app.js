console.log("Start...");

// Require
const filesys = require('fs');
const _ = require('lodash');
const notes = require('./notes.js');
const yargs = require('yargs');
var titleOptions = {
  describe: "title of the command",
  demand: true,
  alias: 't'
};

var bodyOptions = {
  describe: "body of the title",
  alias: 'b'
};

const argv = yargs
  .command('add', 'adds a new note', {
      title: titleOptions,
      body: bodyOptions
  })
  .command('list', 'lists all notes')
  .command('read', 'read a note', {
      title: titleOptions
  })
  .command('remove', 'remove a note', {
      title: titleOptions
  })
  .help()
.argv;
var argum = argv._[0];

console.log('Command', argum  );
//console.log('Process', process.argv);
console.log('Yargs', argv);

if (argum === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if(note){
    console.log("Note created.");
    logNote(note);
  } else{
    console.log("error code: [7] it definetly exist.");
  }
} else if (argum === 'list') {
  console.log('- listing notes');
  var allNotes = notes.getAll();
  allNotes.forEach((note) => notes.logNote(note));
} else if (argum === 'read') {
  //console.log('- fetching note');
  notes.getNote(argv.title);
} else if (argum === 'remove') {
  notes.removeNote(argv.title);
} else {
  console.log('- Command invalid.');
}
