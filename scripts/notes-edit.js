"use strict";

const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#remove-note");
const updatedElement = document.querySelector("#note-updated");
const noteId = location.hash.substring(1);

let notes = getSavedNotes();
//check of de hash overeenkomt met een ID van een individuele note
let note = notes.find((note) => note.id === noteId);

// als note leeg is (dus niet true), dan stuur terug naar index.html
if (!note) {
  location.assign("./index.html");
}

// Voer note.updatedAt in de functie in voor initiele render
generateLastEdited(note.updatedAt);

//Zet de value van de velden wat we hebben opgeslagen als note.title en note.body
titleElement.value = note.title;
bodyElement.value = note.body;
updatedElement.textContent = generateLastEdited(note.updatedAt);

// Luister naar events en sla veranderingen op

titleElement.addEventListener("input", (e) => {
  note.title = e.target.value;
  // roep hier pas moment aan, anders als je het al eerder definieerd dan pakt hij die tijd.
  note.updatedAt = moment().valueOf();
  updatedElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

bodyElement.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  updatedElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

//Luister naar klik op remove button
removeElement.addEventListener("click", (e) => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("./index.html");
});

//Realtime updaten
window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    //assign de nieuwe waarde en parse het
    notes = JSON.parse(e.newValue);
  }
  let note = notes.find((note) => note.id === noteId);

  // als note leeg is (dus niet true), dan stuur terug naar index.html
  if (!note) {
    location.assign("./index.html");
  }

  //Zet de value van de velden wat we hebben opgeslagen als note.title en note.body
  titleElement.value = note.title;
  bodyElement.value = note.body;
  updatedElement.textContent = generateLastEdited(note.updatedAt);
});
