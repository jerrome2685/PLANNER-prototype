import rendering from "./calendar.js";

const tasks = [];

let idNum = 0;

function createTodoItem() {
  const namediv = document.createElement('div');
  const nameTitle = document.createElement('span');
  const nameBox = document.createElement('input');

  nameTitle.textContent = '이름: ';
  nameBox.placeholder = '추가할 태스크의 이름을 작성하시오.';
  nameBox.id = 'name-box';
  namediv.appendChild(nameTitle);
  namediv.appendChild(nameBox);

  const datediv = document.createElement('div');
  const dateTitle = document.createElement('span');
  const dateBox = document.createElement('input');

  dateTitle.textContent = '날짜: ';
  dateBox.placeholder = '추가할 태스크의 날짜를 작성하시오.';
  dateBox.id = 'date-box';
  datediv.appendChild(dateTitle);
  datediv.appendChild(dateBox);

  const submitBtn = document.createElement('button');
  submitBtn.id = 'sub-btn';
  submitBtn.textContent = '확인';
  submitBtn.addEventListener('click', subTodo);
  const content = document.createElement('div');
  content.appendChild(namediv);
  content.appendChild(datediv);
  content.appendChild(submitBtn);
  return content;

}

function editTodoItem(text, dateText) {
  const namediv = document.createElement('div');
  const nameTitle = document.createElement('span');
  const nameBox = document.createElement('input');

  nameTitle.textContent = '이름: ';
  nameBox.value = text;
  nameBox.id = 'name-box';
  namediv.appendChild(nameTitle);
  namediv.appendChild(nameBox);

  const datediv = document.createElement('div');
  const dateTitle = document.createElement('span');
  const dateBox = document.createElement('input');

  dateTitle.textContent = '날짜: ';
  dateBox.value = dateText;
  dateBox.id = 'date-box';
  datediv.appendChild(dateTitle);
  datediv.appendChild(dateBox);

  const submitBtn = document.createElement('button');
  submitBtn.id = 'sub-btn';
  submitBtn.textContent = '확인';
  submitBtn.addEventListener('click', subTodo);
  const content = document.createElement('div');
  content.appendChild(namediv);
  content.appendChild(datediv);
  content.appendChild(submitBtn);
  return content;

}

function createList() {
  const content = document.createElement('ul');
  for (let task of tasks) {
    const li = document.createElement('li');
    const spanName = document.createElement('span');
    spanName.textContent = task.name;
    li.appendChild(spanName);
    
    const spanDate = document.createElement('span');
    spanDate.textContent = task.date.toLocaleDateString();
    li.appendChild(spanDate);

    const delBtn = document.createElement('span');
    delBtn.textContent = '삭제';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', () => {
      li.remove();
      tasks.splice(tasks.findIndex(t => t.id === task.id), 1);
      rendering(tasks);
    });
    li.appendChild(delBtn);

    const editBtn = document.createElement('span');
    editBtn.textContent = '수정';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => editTodo(li, task));
    li.appendChild(editBtn);
    content.appendChild(li);
  }
  return content;

}
document.getElementById('add-btn').addEventListener('click', addTodo);

function addTodo() {
  const content = createTodoItem();
  document.getElementById('content').innerHTML = '';
  document.getElementById('content').appendChild(content);
}

function subTodo() {
  const nameInput = document.getElementById('name-box');
  const dateInput = document.getElementById('date-box');
  const nameV = nameInput.value.trim();
  const dateV = Date.parse(dateInput.value.trim());
  if (!isNaN(dateV)) {
    const dateVV = new Date(dateV);
    tasks.push({id: idNum, name: nameV, date: dateVV});
    idNum++;
    console.log(tasks);
    rendering(tasks);
  }
  else {
    console.log("Invalid Date!");
  }
  const content = createList();
  document.getElementById('content').innerHTML = '';
  document.getElementById('content').appendChild(content);

}

function editTodo(li, task) {
  li.remove();
  const content = editTodoItem(task.name, task.date.toLocaleDateString());
  tasks.splice(tasks.findIndex(t => t.id === task.id), 1);
  document.getElementById('content').innerHTML = '';
  document.getElementById('content').appendChild(content);
  rendering(tasks);
}

rendering(tasks)