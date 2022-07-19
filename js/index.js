let todoInput = document.getElementById("todoInput");
let addTodo = document.getElementById("addTodo");
let table = document.getElementById("table");
let hideAll = document.getElementById("hideAll");
let input;
let data = JSON.parse(localStorage.getItem("sData")) || [];
if (data.length == 0) {
  hideAll.setAttribute("disabled", "");
}
let checkedBoxLength = document.querySelectorAll(
  'input[value="checkbox"]:checked'
).length;

show();
addTodo.addEventListener("click", () => {
  input = todoInput.value.toLowerCase();
  hideAll.removeAttribute("disabled");

  update();
});
let myObj = {};
function update() {
  if (todoInput.value) {
    var dob = new Date();
    var min = dob.getMinutes();
    var hour = dob.getHours();
    var day = dob.getDay();
    var date = dob.getDate();
    var dobArr = dob.toDateString().split(" ");
    // var dobFormat = dobArr[0] + " " + dobArr[1];
    var zone = hour > 12 ? "PM" : "AM";
    hour = hour > 12 ? hour - 12 : hour;

    var dobtime =
      dobArr[0] +
      ":" +
      date +
      ":" +
      dobArr[1] +
      ":" +
      hour +
      ":" +
      min +
      ":" +
      zone;

    myObj = {
      title: input,
      date: dobtime,
      done: false,
    };
    data.push(myObj);
    todoInput.value = "";
    show();
  }
}

function show() {
  let html = "";
  data.forEach((element, index) => {
    html += `<tr class="parent">
     <th scope="row"><div class="form-check">
         <input class="form-check-input" type="checkbox" value="checkbox" onclick="check(${index})" id="checkBox${index}">        
       </div></th>
     <td class="tag">${element.title}</td>
     <td >${element.date}</td>
     <td><button type="button" onclick="edit(${index})" class="btn btn-success btn-sm">Edit</button>
         <button type="button" class="btn btn-danger btn-sm" onclick="deleteTodo(${index})">Del</button>
     </td>
   </tr> `;
  });
  table.innerHTML = html;
  localStorage.setItem("sData", JSON.stringify(data));

  if (data.length == 0) {
    hideAll.setAttribute("disabled", "");
  }
}

function deleteTodo(id) {
  data.splice(id, 1);
  show();
}

function edit(id) {
  todoInput.value = data[id].title;
  data.splice(id, 1);
  show();
}
// let checkInput= document.querySelector('input[type="checkbox"]:checked').value;

function check(id) {
  var ele = document.getElementById(`checkBox${id}`);

  let checked = document.querySelectorAll('input[value="checkbox"]');
  console.log(checked);

  if (ele.checked) {
    ele.closest(".parent").style.setProperty("text-decoration", "line-through");
  } else {
    ele.closest(".parent").style.removeProperty("text-decoration", "line-through");
  }
}
let search = document.getElementById("search");

search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let cardNote = document.getElementsByClassName("tag");

  for (let i = 0; i < cardNote.length; i++) {
    if (cardNote[i].innerHTML.toLowerCase().includes(inputVal)) {
      cardNote[i].parentElement.style.display = "";
    } else {
      cardNote[i].parentElement.style.display = "none";
    }
  }
});

hideAll.addEventListener("click", () => {
  let checked = document.querySelectorAll('input[value="checkbox"]:checked');

  if (hideAll.checked) {
    for (let i = 0; i < checked.length; i++) {
      const element = checked[i];
      element.closest(".parent").style.display = "none";
    }
  } else {
    for (let i = 0; i < checked.length; i++) {
      const element = checked[i];
      element.closest(".parent").style.display = "";
    }
  }
});

// checked = done
//done = true or false
