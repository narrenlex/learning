inputTask.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
        addTask(inputTask.value, 'active');
        return false;
    };
});

function addTask(task, taskStatus) {
    //var task = inputTask.value;
    
    var newTask = document.createElement('p');
    newTask.innerHTML = task;
    newTask.classList.add('task');
    newTask.classList.add(taskStatus || 'active');
    
    var completeButton = document.createElement('label');
    var completeButtonChkBx = document.createElement('input');
    completeButtonChkBx.type = 'checkbox';
    completeButton.classList.add('chkBxContainer');
    completeButtonChkBx.classList.add('chkBxInput');
    completeButtonChkBx.onclick = function() {return completeTask(this.parentNode.parentNode)};
    completeButton.appendChild(completeButtonChkBx);
    var completeButtonChecked = document.createElement('span');
    completeButtonChecked.classList.add('chkBxCheckmark');
    completeButton.appendChild(completeButtonChecked);
    newTask.appendChild(completeButton);
    
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    if (taskStatus == 'active') {deleteButton.classList.add('invisible');};
    deleteButton.onclick = function() {return deleteTask(this.parentNode)};
    deleteButton.innerHTML = '&#x2715';
    newTask.appendChild(deleteButton);

    ///newTask.addEventListener('dblclick', function() {return editTask(this)});
    
    footer.insertAdjacentElement('beforeBegin', newTask);
    inputTask.value = "";

    taskCount();
    activeTaskCount();
};

function deleteTask(task) {
    taskList.removeChild(task);
    taskCount();
};

function completeTask(task) {
    task.classList.toggle('completed');
    task.classList.toggle('active');
    task.lastChild.classList.toggle('invisible');
    if (task.children[0].checked == false) {
        task.children[0].checked = true;
    } else {
        task.children[0].checked = false;
    };
    console.log(task.textContent.slice(0, -1), 'checked:', task.children[0].checked);
    console.log('all checked:', completeAll.checked);
    activeTaskCount();
    taskCount();
};

function completeAllFunc() {
    var activeTasks = document.getElementsByClassName('active');
    if (activeTasks.length) {
        while (activeTasks.length) {
            activeTasks[0].children[0].checked = true;
            activeTasks[0].children[1].classList.toggle('invisible');
            activeTasks[0].classList.toggle('completed');
            activeTasks[0].classList.toggle('active');
        }
        completeAll.checked = true;
    } else {
        tasks = document.getElementsByClassName('task');
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].classList.add('active');
            tasks[i].classList.remove('completed');
            tasks[i].children[1].classList.toggle('invisible');
            tasks[i].children[1].checked = false;
        }
        completeAll.checked = false;
    }
    console.log('all checked:', completeAll.checked);
    activeTaskCount();
}

function clearCompleted() {
    var elems = document.getElementsByClassName('completed');
    while (elems.length) {
        taskList.removeChild(elems[0]);
    };
    taskCount();
};

function activeTaskCount() {
    var activeTasks = document.getElementsByClassName('active');
    if (activeTasks.length == 1) {
        var word = ' task left';
    } else {
        var word = ' tasks left';
    };
    counter.innerHTML = activeTasks.length + word;
    return activeTasks.length;
};

function taskCount() {
    var tasks = document.getElementsByClassName('task');
    if (tasks.length == 0) {
        footer.style.display = 'none';
        completeAll.classList.add('invisible');
    } else {
        footer.style.display = '';
        completeAll.classList.remove('invisible');
        if (tasks.length == activeTaskCount()) {
            completeAll.checked = true;
        } else {
            completeAll.checked = false;
        }
    };
    return tasks.length;
};

menu.children[0].onclick = function() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].style.display = '';
    }
    this.classList.add('menuCurrent');
    menu.children[1].classList.remove('menuCurrent');
    menu.children[2].classList.remove('menuCurrent');
};

menu.children[1].onclick = function() {
    var activeTasks = document.getElementsByClassName('active');
    for (let i = 0; i < activeTasks.length; i++) {
        activeTasks[i].style.display = '';
    }
    var completedTasks = document.getElementsByClassName('completed');
    for (let j = 0; j < completedTasks.length; j++) {
        completedTasks[j].style.display = 'none';
    }
    this.classList.add('menuCurrent');
    menu.children[0].classList.remove('menuCurrent');
    menu.children[2].classList.remove('menuCurrent');
};

menu.children[2].onclick = function() {
    var activeTasks = document.getElementsByClassName('active');
    for (let i = 0; i < activeTasks.length; i++) {
        activeTasks[i].style.display = 'none';
    }
    var completedTasks = document.getElementsByClassName('completed');
    for (let j = 0; j < completedTasks.length; j++) {
        completedTasks[j].style.display = '';
    }
    this.classList.add('menuCurrent');
    menu.children[0].classList.remove('menuCurrent');
    menu.children[1].classList.remove('menuCurrent');
};

function storeAll() {
    //let tasksArr = [];
    let tasks = document.getElementsByClassName('task');
    if (tasks.length) {
        for (let i = 0; i < tasks.length; i++) {
            let theTask = {
                'text' : tasks[i].textContent.slice(0, -1),
                'classes' : tasks[i].classList.value.replace('task', '').replace(' ', '')
            };
            theTaskJson = JSON.stringify(theTask);
            localStorage.setItem(i, theTaskJson);
        }
        //localStorage.setItem('storedData', tasksArr);
    }
}

function restoreAll() {
    if (localStorage.length != 0) {
        for (let i = 0; i < localStorage.length; i++) {
            let theTaskJson = localStorage.getItem(i);
            //console.log(theTaskJson);
            let theTask = JSON.parse(theTaskJson);
            console.log(theTask);
            addTask(theTask.text, theTask.classes);
        };
    }

    localStorage.clear();
}

function editTask(task) {
    task.hidden = true;
    var editField = document.createElement('input');
    editField.type = 'text';
    editField.style.position = 'absolute';
    editField.style.left = '30px';
    editField.style.width = (task.style.width.replace('px','') - 30) + 'px';
    editField.placeholder = task.textContent.slice(0, -1);
    
    editField.addEventListener("keydown", function (event) {
        if (event.keyCode == 13) {
            //console.log(editField.value, task.textContent.replace('X',''));
            var temp = task.innerHTML;
            console.log(temp, temp.type);
            temp.replace(task.textContent.slice(0, -1), editField.value);
            console.log(temp, temp.type, task.textContent.slice(0, -1).type, editField.value);
            task.innerHTML = temp;
            //task.innerHTML.replace(task.textContent.replace('X',''), editField.value);
            task.hidden = false;
            taskList.removeChild(editField);
            return false;
        };
    });

    taskList.appendChild(editField);
}

function addTaskList() {
    var cln = taskList.cloneNode(true);
    cln.
    document.body.appendChild(cln);
    taskList.insertAdjacentElement('afterEnd', cln);
}

elemClearCompleted.addEventListener('click', clearCompleted);
completeAll.addEventListener('click', completeAllFunc);
window.addEventListener('unload', storeAll);
//elemAddTaskList.addEventListener('click', addTaskList);

restoreAll();
taskCount();
activeTaskCount();
