inputTask.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
        addTask(inputTask.value);
        return false;
    };
});

function addTask(task) {
    //var task = inputTask.value;
    
    var newTask = document.createElement('p');
    newTask.innerHTML = task;
    newTask.classList = "task active";
    
    var completeButton = document.createElement('input');
    completeButton.type = 'checkbox';
    completeButton.classList.add('completeButton');
    completeButton.onclick = function() {return completeTask(this.parentNode)};
    newTask.appendChild(completeButton);
    
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton', 'invisible');
    deleteButton.onclick = function() {return deleteTask(this.parentNode)};
    deleteButton.innerHTML = 'X';
    newTask.appendChild(deleteButton);
    
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
    task.children[0].checked = !task.children[0].checked;
    activeTaskCount();
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
    } else {
        tasks = document.getElementsByClassName('task');
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].classList.add('active');
            tasks[i].classList.remove('completed');
            tasks[i].children[1].classList.toggle('invisible');
            tasks[i].children[1].checked = false;
        }
    }
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
};

function taskCount() {
    var tasks = document.getElementsByClassName('task');
    if (tasks.length == 0) {
        footer.style.display = 'none';
        completeAll.classList.add('invisible');
    } else {
        footer.style.display = '';
        completeAll.classList.remove('invisible');
    };
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
                'text' : tasks[i].innerHTML,
                'classes' : tasks[i].classList.value
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
            //console.log(theTask);
            let restoredTask = document.createElement('p');
            restoredTask.innerHTML = theTask['text'];
            restoredTask.classList = theTask['classes'];
            footer.insertAdjacentElement('beforeBegin', restoredTask);
        };
    }

    localStorage.clear();
}

elemClearCompleted.addEventListener('click', clearCompleted);
completeAll.addEventListener('click', completeAllFunc);
window.addEventListener('unload', storeAll);

restoreAll();
taskCount();
activeTaskCount();



