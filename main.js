

// keeping data in local storage
var data = (localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')):{
	todo: [],
	completed:[]
};




// Trash button , unchecked button and checked button
var trashI = '<i class="fas fa-trash"></i>';
var checkI = '<i class="far fa-check-circle"></i>';
var checkCompleted = '<i class="fas fa-check-circle"></i>';
var comp_title = document.getElementById('title');

renderTodoList(); //render the task list

document.getElementById('add').addEventListener('click', function () {

	var value = document.getElementById('item').value;
	document.getElementById('item').value;
	if (value) {
		addItem(value);
	}

});


// add task by pressing the enter key
document.getElementById('item').addEventListener('keydown', function(e) {

	var value = this.value;
	if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
		addItem(value);
	}

});


function addItem(value) {
	addItemTodo(value);
	document.getElementById('item').value = '';

	data.todo.push(value);
	dataObjectUpdated();

}


function renderTodoList() {
	if (!data.todo.length && !data.completed.length) return;

	for (var i = 0; i < data.todo.length; i++) {
		var value = data.todo[0];
		addItemTodo(value);
	}

	for (var j = 0; j < data.completed.length; j++) {
		var value = data.completed[0];
		addItemTodo(value, true);
	}



}


function dataObjectUpdated() {
	localStorage.setItem('todolist', JSON.stringify(data));
}


function removeItem() {

	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
	} else {
		data.completed.splice(data.completed.indexOf(value), 1);
	}
	dataObjectUpdated();


	if (data.completed.length == 0) comp_title.style.display = "none";




	parent.removeChild(item);
}


function checkItem() {

	comp_title.style.display = "block";
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;


	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
		data.completed.push(value);
	} else {
		data.completed.splice(data.completed.indexOf(value), 1);
		data.todo.push(value);
	}
	dataObjectUpdated();


	var target;


	if (id === 'todo') {

		target = document.getElementById('completed');
		 //place checked button instead of unchecked button

		} else {																																		

			target = document.getElementById('todo');
			
		}


		parent.removeChild(item);
		target.insertBefore(item, target.childNodes[0]);


	}


	function addItemTodo(text, completed) {


		var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

		var item = document.createElement('li');
		item.innerText = text;


		var buttons = document.createElement('div');
		buttons.classList.add('liButtons');

		var trash = document.createElement('button');
		trash.classList.add('trash');
		trash.innerHTML = trashI;

	// Add click event for removing item
	trash.addEventListener('click', removeItem);

	var check = document.createElement('button');
	check.classList.add('check');
	check.innerHTML = checkI;


	check.addEventListener('click', checkItem);

	//setting trash & check as a child of button
	buttons.appendChild(trash);
	buttons.appendChild(check);
	//setting buttons as child of item
	item.appendChild(buttons);

	//listing from up to down
	list.insertBefore(item, list.childNodes[0]);

}

// completed task title displaying
if (data.completed.length > 0) {
	comp_title.style.display = "block"; 
} else {
	comp_title.style.display = "none";
}