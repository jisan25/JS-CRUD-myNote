var accordionDiv = document.getElementById('accordion');

var titleInput = document.getElementById('title');
var descriptionInput = document.getElementById('description');
var dateInput = document.getElementById('date');
var titleValidationDiv = document.getElementById('titleValidation');

var noteCard = null;

function onFormSubmit(){
    var note = getNote();

    if(validate()){
        if(noteCard == null){
            makeNote(note);
            resetNote();
        }else{
            editNote(note);
            resetNote();
        }
    }


}

function getNote(){
    var note = {};

    note["title"] = titleInput.value;
    note["description"] = descriptionInput.value;
    note["date"] = dateInput.value;
    
    return note;
}

function makeNote(note){

    // Title


    var card = document.createElement("div");   
    var cardHeader = document.createElement("div");   
    var title = document.createElement("a");



    card.classList.add('card', 'mt-2');
    cardHeader.classList.add('card-header');

    title.classList.add('card-link', 'text-dark');
    title.setAttribute("data-toggle", "collapse");
    title.setAttribute("href", "#collapseOne");

    // console.log(card);

     var titleNode = document.createTextNode(note.title);         
     title.appendChild(titleNode); 

    accordionDiv.appendChild(card);
    card.appendChild(cardHeader);
    cardHeader.appendChild(title);

    // description

    var collapse = document.createElement("div");  
    collapse.classList.add('collapse', 'show');
    collapse.setAttribute("id", "collapseOne");
    collapse.setAttribute("data-parent", "#accordion");

    card.appendChild(collapse);


    var cardBody = document.createElement("div");
    cardBody.classList.add('card-body');

    var descriptionP = document.createElement("p");
    descriptionP.setAttribute("id", "noteDescription");

    var descriptionNode = document.createTextNode(note.description);         
    descriptionP.appendChild(descriptionNode); 

    cardBody.appendChild(descriptionP);

    // Border Bottom

    var borderBottom = document.createElement("p");
    borderBottom.style.borderBottom = '1px solid #666';
    borderBottom.style.marginTop = '10px';
    cardBody.appendChild(borderBottom);

    // Date

    var date = document.createElement("p");
    cardBody.appendChild(date);

    var dateSpan = document.createElement("span");
    dateSpan.classList.add('font-weight-bold');
    var dateTextNode = document.createTextNode('Date: ');     
    dateSpan.appendChild(dateTextNode);
    date.appendChild(dateSpan);

    var dateNode = document.createTextNode(note.date);  
    date.appendChild(dateNode);

    collapse.appendChild(cardBody);


// Edit 

    var actionDiv = document.createElement("div");
    cardBody.appendChild(actionDiv);
   

    var editBtn = document.createElement("a");
    editBtn.classList.add('btn', 'btn-info', 'mr-1');
    var editNode = document.createTextNode('Edit');     
    editBtn.appendChild(editNode);
    editBtn.setAttribute("onClick", "onEdit(this)");    

    actionDiv.appendChild(editBtn);


    // Delete

 

    var deleteBtn = document.createElement("a");
    deleteBtn.classList.add('btn', 'btn-danger');
    var deleteNode = document.createTextNode('Delete');     
    deleteBtn.appendChild(deleteNode);
    deleteBtn.setAttribute("onClick", "onDelete(this)");    

    actionDiv.appendChild(deleteBtn);

    noteCard = null;
}

function editNote(note){
    noteCard.childNodes[0].firstElementChild.innerHTML = note.title;
    let descriptionDiv = noteCard.childNodes[1].firstElementChild;
    descriptionDiv.firstElementChild.innerHTML = note.description;
    
    let dateP = descriptionDiv.childNodes[2];
    let date = dateP.textContent;
    // console.log(date);
    // var res = date.slice(6, date.length);
    dateP.innerHTML = `<span class="font-weight-bold">Date: </span>${note.date}`;
    noteCard = null;

}

function onEdit(editBtn){
     noteCard = editBtn.parentElement.parentElement.parentElement.parentElement;
    let title = noteCard.childNodes[0].firstElementChild.innerHTML;
    let descriptionDiv = noteCard.childNodes[1].firstElementChild;
    let description = descriptionDiv.firstElementChild.innerHTML;

    let dateP = descriptionDiv.childNodes[2];
    let date = dateP.textContent;
  
    var res = date.slice(6, date.length);

    titleInput.value = title;
    descriptionInput.value = description;
    dateInput.value = res;
    // console.log(res);

}
function onDelete(deleteBtn){
    var card = deleteBtn.parentElement.parentElement.parentElement.parentElement;
    // var cardHeader = card.firstElementChild;
    var title = card.childNodes[0].firstElementChild.innerHTML;
    // console.log(title);
    if(confirm(`Are you sure to delete ${title} ?`)){
        while (card.firstChild) {
            card.removeChild(card.firstChild);
            card.classList.remove('card', 'mt-2');
        }
    }
    
}

function validate(){
    isValid = true;

    if(titleInput.value == ''){
        isValid = false;
        titleValidationDiv.style.display = 'block';
    }else{
        isValid = true;
        titleValidationDiv.style.display = 'none';
    }
    return isValid;
}

function resetNote(){
    titleInput.value = '';
    descriptionInput.value = '';
    dateInput.value = '';
}