
// // Elementlerin Seçimleri

// New Todo Input Alanı
const input = document.querySelector("#create-todo");

// Add Todo - Ekleme
const todoInsert = document.querySelector(".add-todo");

// Ekleme Yapılacak UL elementi
const taskList = document.querySelector("#task-list");

// Clear Completed 
const clearCompleted = document.querySelector("#clear-todos"); 

// Filter Active Elements
const active = document.querySelector("#active");

// Filter Completed Elements
const completed = document.querySelector("#completed");

// Filter All Elements
const allElements = document.querySelector("#all");


// EVENT LISTENER FUNCTIONS
eventListeners();

function eventListeners(){

    todoInsert.addEventListener("click",addTodo); // 1-A
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI); // 3
    taskList.addEventListener("click",deleteTodo); // 4
    taskList.addEventListener("click",completedTask); // 6
    clearCompleted.addEventListener("click",clearCompletedTodosFromUI); // 8.Adım
    active.addEventListener("click",filterActiveItems); // 10
    completed.addEventListener("click",filterCompletedItems); // 11
    allElements.addEventListener("click",filterAllElements); // 12

}

// 1. ADIM ARAYÜZE TODOLARI EKLEME

function addTodo(e){ // 1-B

  newTodo = input.value.trim();

  if(newTodo === ""){
    alert("Boş todo verilemez")
  } else {
    addTodoToUI(newTodo); // 1. Adım
    addTodoToStorage(newTodo) // 2. Adım
  }

  e.preventDefault();

}

function addTodoToUI(newTodo){ // 1-C

  const listItem = document.createElement("li");
    
  listItem.innerHTML += `
      <div id="todo-mark">
      
      </div>
      <p id="task-item">${newTodo}</p>
      <img src="images/icon-cross.svg" alt="" id="delete-todo">
    `;

  taskList.appendChild(listItem);
  input.value = "";
  countItemsLeft(); // 7.Adım Function Call

}

// 2. ADIM STORAGE'A TODOLARI EKLEME

function getTodosFromStorage(){ // 2-A Öncelikle storage'da değer varsa veya yoksa bunu bir arraya yazdırırız.

  let todos;

  if(localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;

}

function addTodoToStorage(newTodo){ // 2-B Bu arraya newTodo ekleyip, tekrar string değer olarak storage'a set ederiz.

  let todos = getTodosFromStorage();
  todos.push(newTodo);

  localStorage.setItem("todos",JSON.stringify(todos));

}


// 3. ADIM STORAGE'DAN UI'A GERİ YÜKLEME

function loadAllTodosToUI (){

  let todos = getTodosFromStorage();

  todos.forEach(function(todo){

    addTodoToUI(todo); // 1.Adım fonksiyonudur. Newtodo yerine her bir todoyu ekleriz.
  })

}

// 4. ADIM ARAYÜZDEN TODO SİLME

function deleteTodo(e){

  if(e.target.id === "delete-todo"){

    e.target.parentElement.remove();
    deleteTodoFromStorage(e.target.previousElementSibling.textContent);
    countItemsLeft(); // 7. Adım

  }

}

// 5. ADIM SİLİNEN TODOLARIN STORAGE'DAN DA SİLİNMESİ

function deleteTodoFromStorage(deletetodo){

  let todos = getTodosFromStorage();

  todos.forEach(function(todo,index){

    if(todo === deletetodo){
      todos.splice(index,1);
    }

  });

  localStorage.setItem("todos",JSON.stringify(todos)); // Yeni haliyle tekrar set edilir.

}

// 6. ADIM GÖREV TAMAMLANDI

number = 0;

function completedTask(e){

  number ++;

  if(e.target.id === "todo-mark" && number % 2 != 0){

    e.target.parentElement.classList.add("completed");
    countItemsLeft(); // 7. Adım

  } else {

    e.target.parentElement.classList.remove("completed");
    countItemsLeft(); // 7. Adım
  }

}

// 7. ADIM KALAN GÖREV SAYISI

function countItemsLeft(){

  const totalItem = document.querySelectorAll("#todo-mark").length;
  const completedItem = document.querySelectorAll(".completed").length;

  const itemsLeft = totalItem - completedItem;

  document.getElementById("items").textContent = `${itemsLeft} items left`;


}

// 8. ADIM CLEAR COMPLETED İLE ARA YÜZDEN SİLME

function clearCompletedTodosFromUI(e){

  const completedItems = document.querySelectorAll(".completed");

  completedItems.forEach(function(item){

    item.remove();
    

  })

  updateStorage(); // 9.Adım

}

// 9. ADIM CLEAR COMPLETED SONRASI STORAGE GÜNCELLEME

function updateStorage(){

  const totalItem = document.querySelectorAll("#task-item");

  let todos = [];

  totalItem.forEach(function(item){
    
    todos.push(item.textContent);
    

  })

  localStorage.setItem("todos",JSON.stringify(todos));

}

// 10. ADIM FİLTER ACTIVE ELEMENTS

function filterActiveItems(){

  const listElements = document.querySelectorAll("li");

  listElements.forEach(function(element){

    element.setAttribute('style', 'display:flex');
  })


  const completedItems = document.querySelectorAll(".completed");

  completedItems.forEach(function(item){

    item.setAttribute('style', 'display:none !important');
  })

}

// 11. ADIM FİLTER COMPLETED ELEMENTS

function filterCompletedItems(){

  const listElements = document.querySelectorAll("li");

  listElements.forEach(function(element){

    element.setAttribute('style', 'display:none');
  })

  const completedItems = document.querySelectorAll(".completed");

  completedItems.forEach(function(item){

    item.setAttribute('style', 'display:flex !important');
  })

}

// 12.ADIM FİLTER ALL ELEMENTS

function filterAllElements(){

  const listElements = document.querySelectorAll("li");
  listElements.forEach(function(element){

    element.setAttribute('style', 'display:flex');
  })
}



