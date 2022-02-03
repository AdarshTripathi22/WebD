

let todoItemsContainer=document.getElementById("todoItemsContainer");
let buttonElement=document.getElementById("addtodoButton");

let saveButton=document.getElementById("saveTodoButton");
saveButton.onclick=function(){
    let stringedtodoList=JSON.stringify(todoList);
    localStorage.setItem("todoList",stringedtodoList);
};

function gettodoListfromLocalStorage(){
    let stringifiedTodoList=localStorage.getItem("todoList");
    let parsedTodoList=JSON.parse(stringifiedTodoList);
    if(parsedTodoList===null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}

let todoList=gettodoListfromLocalStorage();


let todosCount=todoList.length;
buttonElement.onclick=function(){
    ontodoAdd();
};

function ontodoAdd(){
    let userInputElement=document.getElementById("todoUserInput");
    let userInputValue=userInputElement.value;

    if(userInputValue==""){
        alert("Enter valid text");
        return;
    }
    todosCount+=1;
    let newtodo={
        text: userInputValue,
        uniqueNo: todosCount
    };
    todoList.push(newtodo);
    createTodoandAppend(newtodo);
    userInputElement.value="";
}

function ontodoStatusChange(checkboxId,labelId){
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle("checked");
};

function deleteStatus(todoId){
    let todoElement=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let childToDelete=todoList.findIndex(function(eachtodo){
        let eachTodoId="todo"+eachtodo.uniqueNo;
        if(eachTodoId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    todoList.splice(childToDelete,1);
}

function createTodoandAppend(todo){
    let todoId="todo"+todo.uniqueNo;
    let checkboxId="checkbox"+todo.uniqueNo;
    let labelId="label"+todo.uniqueNo;

    let todoElement=document.createElement("li");
    todoElement.classList.add("d-flex","flex-row","todo-item-container");
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement=document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id=checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick=function(){
        ontodoStatusChange(checkboxId,labelId);
    };
    todoElement.appendChild(inputElement);
    
    let labelContainer=document.createElement("div");
    labelContainer.classList.add("d-flex","flex-row","label-container");
    todoElement.appendChild(labelContainer);
    
    let labelElement=document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent=todo.text;
    labelElement.id=labelId;
    labelContainer.appendChild(labelElement);
    
    let deleteContainer=document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);
    
    let deleteIcon=document.createElement("i");
    deleteIcon.classList.add("far","fa-trash-alt","delete-icon");
    deleteIcon.onclick=function(){
        deleteStatus(todoId);
    };
    deleteContainer.appendChild(deleteIcon);
}

for (let todo of todoList){
    createTodoandAppend(todo);
}