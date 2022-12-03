const nonImportantIcon = "fa-regular fa-star";
const importantIcon = "fa-solid fa-star";
var isImportant = false;
var isVisible = true;

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

    //create a post request to: https://fsdiapi.azurewebsites.net/api/tasks/
    $.ajax({
        type: "post",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (data) {
            displayTask(task);
            console.log("Server says", data);
        },
        error: function (error) {
            console.log("Save failed", error);
            alert("Error, task not saved");
        },
    });
}
function postRequest() {
    $.ajax({
        type: "post",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (data) {
            console.log("Server says", data);
        },
        error: function (error) {
            console.log("Save failed", error);
        },
    });
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
//server commands. call ajax with jquery, then curly brackets with "type" of command and URL. Types get, post, put, push, remove. Success/error - error executes function you define if there is an error. Success executes function if successful
function fetchTasks() {
    //send get request
    //console log the server results
    $.ajax({
        type: "get",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function (data) {
            let all = JSON.parse(data); //will parse json string into js obj/array
            //console.log(all);
            //for loop will travel the array of data and now able to display the data
            for (let i = 0; i < all.length; i++) {
                let task = all[i];
                //show only your own tasks on display
                if (task.name === "Jim") {
                    displayTask(task);
                }
            }
        },
        error: function (error) {
            console.log("Request error", error);
        },
    });
}
//homework read about git and github

//creat a button with hide/show, call a function toggle details, and console log something there

function init() {
    fetchTasks();
    console.log("Task Manager");
    $("#topIcon").click(toggleImportant);
    $("#btnSave").click(saveTask);
    $("#btnToggleDetails").click(toggleDetails);
}

window.onload = init;
