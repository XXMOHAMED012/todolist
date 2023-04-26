let input = document.querySelector(".input");
let button = document.querySelector(".add");
let tasksdiv = document.querySelector(".tasks");

let tasks = [];
if (localStorage.getItem("tasks")){
    tasks = JSON.parse(localStorage.getItem("tasks"))
}

getFromStorage()

button.onclick = function () {
    let text = input.value;
    if(text !== ""){
        addToArray(text);
        input.value = "";
    }
}

tasksdiv.addEventListener("click" , e => {
    if(e.target.classList.contains("del")){
        let tt = e.target.parentElement.parentElement.remove()
        delFromStorage(e.target.parentElement.parentElement.getAttribute("data-id"))
    }
    if(e.target.classList.contains("cont")){
        e.target.classList.toggle("done")
        togglecompleted(e.target.parentElement.getAttribute("data-id"))
    }
})

function addToArray(taskText){
    let task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    tasks.push(task);
    addToPage(tasks);
    addToStorage(tasks)
}

function addToPage(tasksArray){
    tasksdiv.innerHTML = "";
    tasksArray.forEach( task => {
        let div  = document.createElement("div");
        let con  = document.createElement("div");
        let h2   = document.createElement("h2");
        let btn  = document.createElement("button");
        
        h2.innerHTML = task.title;
        btn.innerHTML = "حذف"
    
        div.classList.add("task"); 
        div.setAttribute("data-id" , task.id);
        if(task.completed){
            con.classList.add("done")
        }
        con.classList.add("cont");
        btn.classList.add("del");
        
        con.appendChild(h2);
        con.appendChild(btn);
        div.appendChild(con);
        tasksdiv.appendChild(div);
    });
}

function addToStorage(tasksArray){  
    window.localStorage.setItem("tasks" , JSON.stringify(tasksArray));
}

function getFromStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addToPage(tasks)
    }
}

function delFromStorage(taskId){
    tasks = tasks.filter( task => task.id != taskId );
    addToStorage(tasks)
}

function togglecompleted(taskId){
    for(let i = 0; i < tasks.length ; i++){
        if(tasks[i].id == taskId ){
            tasks[i].completed = !tasks[i].completed
        }
    }
    addToStorage(tasks)
}