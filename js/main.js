var deleteButtonName = "delete-note-btn";
var editButtonName = "edit-node-btn";
var saveButtonName = "save-changes-btn";
var contextMenu = "note-context-menu";
var contextMenuButton = "note-context-menu-button";
var titleInput = "note-title";
var descriptionTextArea = "note-description";


var addButton;

var notes = [];

document.addEventListener("DOMContentLoaded", event => {
    addButton = document.getElementById("add-note-btn");
    addButton.onclick = addNoteContainer;

    notes = JSON.parse(localStorage.getItem("notes"));
    if(notes != null) {
        notes.forEach(note => {
            noteContainer = addNoteContainer();
            
            editContainer(noteContainer, note);

        });
    }
    else notes = [];
});

document.body.onunload = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function editContainer(noteContainer, note) {
    noteContainer.getElementsByClassName(titleInput)[0].value = note.title;
    noteContainer.getElementsByClassName(descriptionTextArea)[0].value = note.description;
}

function switchToEdit(noteContainer) {
    noteTitle = noteContainer.getElementsByClassName("note-title")[0];
    noteDescription = noteContainer.getElementsByClassName("note-description")[0];

    noteTitle.readOnly = false;
    noteDescription.readOnly = false;
    
    noteTitle.className = "note-title-editing";
    noteDescription.className = "note-description-editing";
    
    noteContainer.getElementsByClassName(saveButtonName)[0].style.visibility = "visible";
}

function switchToNote(noteContainer) {
    noteTitle = noteContainer.getElementsByClassName("note-title-editing")[0];
    noteDescription = noteContainer.getElementsByClassName("note-description-editing")[0];
    
    noteTitle.className = "note-title";
    noteDescription.className = "note-description";
    
    noteContainer.getElementsByClassName(saveButtonName)[0].style.visibility = "hidden";
}

function addNoteContainer() {
    let noteContainer = document.createElement(`div`);
    noteContainer.className = "note-container";
    
    noteContainer.innerHTML = 
    `<div class=${contextMenu}>
            <input class="btn btn-secondary dropdown-toggle-split" type="button" id="${contextMenuButton}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value="...">
            <div class="dropdown-menu" aria-labelledby="${contextMenuButton}">
                <input type=button class="dropdown-item ${deleteButtonName}" value="delete">
                <input type=button class="dropdown-item ${editButtonName}" value="edit">
            </div>
    </div>
    <input type="text" class="note-title" placeholder="title..."></textArea>
    <hr>
    <div class="d-flex flex-column edit-container">
        <textArea type="text" class="note-description" cols=25 rows=2 placeholder="description..."></textArea>
        <input class="btn btn-secondary dropdown-toggle-split ${saveButtonName}" type="button" value="save">
    </div>
    `;

    noteContainer.onmouseover = () => {
        noteContainer.getElementsByClassName(contextMenu)[0].style.visibility = "visible";
    };

    noteContainer.onmouseout = () => {
        noteContainer.getElementsByClassName(contextMenu)[0].style.visibility = "hidden";
    };

    noteContainer.getElementsByClassName(editButtonName)[0].onclick = event => {

        switchToEdit(noteContainer);
    };

    length = notes.length;

    noteContainer.getElementsByClassName(deleteButtonName)[0].onclick = event => {
        
        notes.splice(notes[length - 1], 1);

        noteContainer.remove();
    };
    
    noteContainer.getElementsByClassName(saveButtonName)[0].onclick = () => {
        switchToNote(noteContainer);
        notes[length] = { 
            id: length,
            title: noteContainer.getElementsByClassName("note-title")[0].value,
            description: noteContainer.getElementsByClassName("note-description")[0].value
        };
    };

    document.getElementById("notes-container").insertBefore(noteContainer, addButton);

    return noteContainer;
}