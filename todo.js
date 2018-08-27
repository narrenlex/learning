function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        addTask();
        return false;
    }
}

function addTask() {
    var task = inputTask.value;
    //alert(task.value);
    var newTask = document.createElement('p');
    newTask.innerHTML = task;
    newTask.addEventListener("click", completeTask);
    newTask.addEventListener("click", activeTaskCount);
    newTask.classList = "task active";
    footer.insertAdjacentElement('beforeBegin', newTask);
    inputTask.value = "";
    taskCount();
    activeTaskCount();
}

function completeTask() {
    this.classList.toggle('completed');
    this.classList.toggle('active');
}

function clearCompleted() {
    var elems = document.getElementsByClassName('completed');
    while (elems.length) {
        taskList.removeChild(elems[0]);
    }
    taskCount();
}

function activeTaskCount() {
    var activeTasks = document.getElementsByClassName('active');
    if (activeTasks.length == 1) {
        var word = ' task left';
    } else {
        var word = ' tasks left';
    }
    counter.innerHTML = activeTasks.length + word;
}

function taskCount() {
    var tasks = document.getElementsByClassName('task');
    if (tasks.length == 0) {
        footer.style.display = 'none';
    } else {
        footer.style.display = '';
    }
}

menu.children[0].addEventListener('click', function() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].style.display = '';
    }
    this.classList.add('menuCurrent');
    menu.children[1].classList.remove('menuCurrent');
    menu.children[2].classList.remove('menuCurrent');
});

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
}

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
}

taskCount();
activeTaskCount();

inputTask.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
        addTask();
        return false;
    };
});

elemClearCompleted.addEventListener('click', clearCompleted);