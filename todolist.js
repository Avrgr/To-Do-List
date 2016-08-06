/*
	To-Do List: An application to keep track of tasks.

	Author: Alan Simpson
	Version: 1.0
	Date Created: March 15, 2016
*/

//	Keeps track of the number of items in the List
//	Increments when a new item is added, and decrements when
//	an item is removed
var itemCount = 0;

//	Keeps track of the total number of items entered by the user
var totalTasksEntered = 0;
if(localStorage.getItem("totalTasksEntered") != null){
	totalTasksEntered = localStorage.getItem("totalTasksEntered");
}

//	Displays information and statistics about the application
function about(){
	//	Declare variables
	//	Get the number of completed tasks using the length of the input 
	//	array returned by the getCheckedItems function
	var numberOfCompletedTasks = getCheckedItems(document.getElementsByTagName("input")).length;

	//	Outstanding tasks is the number of items minus the
	//	number of completed tasks
	var numberOfOutstandingTasks = itemCount - numberOfCompletedTasks;

	//	Builds the text used in the alert window
	var aboutText = "To-Do List\n\n" +
					"1.0\n\n" +
					"This app was programmed by Alan Simpson.\n\n" +
					"Support: asimpson@rrc.ca \n\n" +
					"Stats\n" +
					"----------------------------------------\n" +
					"Number of tasks: " + itemCount + "\n" +
					"Number of outstanding tasks: " + numberOfOutstandingTasks + "\n" +
					"Number of completed tasks: " + numberOfCompletedTasks + "\n" +
					"Total number of tasks entered: " + totalTasksEntered;

	//	Display an alert box to the user
	alert(aboutText);
}

//	Finds all the checkboxes on the page that are checked 
function getCheckedItems(listItems){
	var checkedListItems = new Array();

	for (var i = 0; i < listItems.length; i++) {
		if(listItems[i].checked){
			checkedListItems.push(listItems[i].parentNode);
		}	
	}

	return checkedListItems;
}

//	Adds an item to the list div using the DOM
function addItem(){
	var listObject = document.getElementById("list");

	var listItemText = prompt("Enter the description of the task:");

	if(listItemText != null && listItemText != ""){
		//	Creating elements for the list item
		var newListItem = document.createElement("div");
		var newCheckbox = document.createElement("input");
		var newLabel = document.createElement("label");

		//	Set the input attributes
		newCheckbox.setAttribute("type","checkbox");
		newCheckbox.setAttribute("id", "item" + itemCount);
		newCheckbox.setAttribute("name", "item" + itemCount);
newCheckbox.setAttribute("onclick","itemChecked(\"" + itemCount + "\")");

		//	Set the label attributes
		newLabel.setAttribute("for", "item" + itemCount);
		newLabel.setAttribute("title", listItemText);
		newLabel.innerHTML = listItemText;

		//	Add the checkbox and label to the div list item
		newListItem.setAttribute("class", "listitem");
		newListItem.appendChild(newCheckbox);
		newListItem.appendChild(newLabel);

		if(itemCount == 0){
			listObject.innerHTML = "";
			listObject.appendChild(newListItem);
		}else{
			listObject.insertBefore(newListItem, listObject.childNodes[0]);
		}

		itemCount++;
		totalTasksEntered++;
	}
	saveListData();
}

//	Removes the checked items from the list
function removeItems(){
	var listObject = document.getElementById("list");
	var items = document.getElementsByTagName("input");
	var checkedTasks = new Array();

	if(itemCount > 0){
		checkedTasks = getCheckedItems(items);

		if(checkedTasks.length > 0 && confirm("Are you sure you want to remove these items?")){
			for (var i = 0; i < checkedTasks.length; i++) {
				listObject.removeChild(checkedTasks[i]);

				itemCount--;
			}
		}

		if(itemCount == 0){
listObject.innerHTML = "<div class=\"listitem\"><p id=\"noListItems\">You currently have no tasks</p></div>";
		}
	}
	saveListData();
}

//	Handles the clicked event for checkbox elements
function itemChecked(itemNumber){
	var listItem = document.getElementById("item" + itemNumber).parentNode;

	if(document.getElementById("item" + itemNumber).checked){
		listItem.setAttribute("class","listitem selected");
	}else{
		listItem.setAttribute("class","listitem");
	}
	saveListData();
}

//	Saves the list data into local storage
function saveListData(){
	var list = document.getElementById("list");
	localStorage.setItem("todoData", list.innerHTML);
	localStorage.setItem("listItemCount", itemCount);
	localStorage.setItem("totalTasksEntered", totalTasksEntered);
}

//	The load function adds event listeners to button objects
function load(){
	var aboutButton = document.getElementById("aboutButton");
	aboutButton.addEventListener("click", about);

	var addButton = document.getElementById("addButton");
	addButton.addEventListener("click", addItem);

	var removeButton = document.getElementById("removeButton");
	removeButton.addEventListener("click", removeItems);

	if(localStorage.getItem("todoData") && localStorage.getItem("listItemCount")){

		document.getElementById("list").innerHTML = localStorage.getItem("todoData");
		itemCount = localStorage.getItem("listItemCount");

		var checkedInputs = document.getElementsByClassName("selected");

		for (var i = 0; i < checkedInputs.length; i++) {
			checkedInputs[i].childNodes[0].checked = true;
		}

	}
}

//	Adds an event listener to the document to execute 
//	the load function after the markup is loaded by the browser
document.addEventListener("DOMContentLoaded", load);



















