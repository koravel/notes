var deleteButtonName = "delete-note-btn";
var editButtonName = "edit-node-btn";

var addButton;

var notes = [];

document.body.onload = () => {

    notes = JSON.parse(localStorage.getItem("notes"));
    if(notes != null) {
        notes.forEach(note => {
            noteContainer = addNoteContainer();
            editNote(note);
        });
    }
    else notes = [];

    addButton = document.getElementById("add-note-btn");

    addButton.onclick = addNoteContainer;
}

document.body.onunload = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function editNoteContainer(noteContainer) {
    noteContextMenu = document.getElementById("noteContextMenu");

    noteContainer.innerHTML =
    `<div class="note-title"></div>
    <hr>
    <div class="note-description"></div>
    <input type=button class="btn btn-outline-danger ${delete_button_name}">`;

    document.getElementById("notes-container").insertBefore(noteContainer, addButton);
}

function addNoteContainer() {
    let noteContainer = document.createElement(`div`);
    noteContainer.className = "note-container";
    
    noteContainer.innerHTML =
    `<input type="text" class="note-title" placeholder="title...">
    <hr>
    <input type="text" class="note-description" placeholder="description...">
    <div class="noteContextMenu">
            <input class="btn btn-secondary dropdown-toggle-split" type="button" id="noteContextMenuBtton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value="...">
            <div class="dropdown-menu" aria-labelledby="noteContextMenuBtton">
                <input type=button class="dropdown-item ${deleteButtonName}" value="delete">
                <input type=button class="dropdown-item ${editButtonName}" value="edit">
            </div>
    </div>`;

    document.getElementById("notes-container").insertBefore(noteContainer, addButton);

    noteContainer.onmouseover = () => {
        noteContainer.getElementsByClassName("noteContextMenu")[0].style.visibility = "visible";
    };

    noteContainer.onmouseout = () => {
        noteContainer.getElementsByClassName("noteContextMenu")[0].style.visibility = "hidden";
    };

    noteContainer.getElementsByClassName(editButtonName)[0].onclick = event => {
        
        
        noteContainer.getElementsByClassName("note-title")[0].readOnly = false;
        noteContainer.getElementsByClassName("note-description")[0].readOnly = false;
    };

    noteContainer.getElementsByClassName(deleteButtonName)[0].onclick = event => {
        

        noteContainer.remove();
    };

    return noteContainer;
}