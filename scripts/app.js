const nonImportantIcon = "fa-regular fa-star";
const importantIcon = "fa-solid fa-star";
var isImportant = false;
var isVisible = true;

function init() {
    console.log("Task Manager");
    $("#topIcon").click(toggleImportant);
    $("#btnSave").click(saveTask);
    $("#btnToggleDetails").click(toggleDetails);
}

window.onload = init;

// console log a message when the user clicks on the icon
//add an id to the icon
//catch the click event on the icon, (on init fn)
//when th eicon is clicked, call a fn named toggleImportant
//in toggleImportant console log a message

function toggleImportant() {
    if (isImportant) {
        $("#topIcon").removeClass(importantIcon);
        $("#topIcon").addClass(nonImportantIcon);
        isImportant = false;
    } else {
        console.log("Toggled");
        $("#topIcon").removeClass(nonImportantIcon);
        $("#topIcon").addClass(importantIcon);
        isImportant = true;
    }
}

function saveTask() {
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let dueDate = $("#txtDueDate").val();
    let category = $("#selCategory").val();
    let priority = $("#txtPriority").val();
    let cost = $("#txtCost").val();

    //create a new instance of Task (object)

    let task = new Task(
        isImportant,
        title,
        description,
        dueDate,
        category,
        priority,
        cost
    );
    console.log(task);
    displayTask(task);
}

function displayTask(task) {
    let syntax = `
    <div class="pTask">
    <i class="fa-regular fa-star"></i>
    <div class="titleTask">
    <h5>${task.title}</h5>
    </div>
    <div class="descTask">
    <label>Description:</label>
    <p>${task.description}<p>
    </div>
    <div class="dateTask">
    <label>Date:</label>
    <p>${task.dueDate}</p>
    </div>
    <div class="catTask">
    <label>Category:</label>
    <p>${task.category}</p>
    </div>
    <div class="priTask">
    <label>Priority:</label>
    <p>${task.priority}</p>
    </div>
    <div class="costTask">
    <label>Cost:</label>
    <p>${task.cost}</p>
    </div>
    </div>`;
    $("#pendingTasks").append(syntax);
}

function toggleDetails() {
    console.log("whoa");
    if (isVisible) {
        $("#secForm").hide();
        isVisible = false;
    } else {
        $("#secForm").show();
        isVisible = true;
    }
}

//homework read about git and github

//creat a button with hide/show, call a function toggle details, and console log something there
