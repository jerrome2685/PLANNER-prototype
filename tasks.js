import rendering from "./calendar.js";

const tasks = [];

let idNum = 0;

function createTodoItem() {
  const nameDiv = document.createElement('div');
  const nameTitle = document.createElement('span');
  const nameBox = document.createElement('input');

  nameTitle.textContent = '이름: ';
  nameBox.placeholder = '추가할 태스크의 이름을 작성해주세요.';
  nameBox.id = 'name-box';
  nameDiv.appendChild(nameTitle);
  nameDiv.appendChild(nameBox);

  const dateDiv = document.createElement('div');
  const dateTitle = document.createElement('span');
  const dateBox = document.createElement('input');

  dateTitle.textContent = '날짜: ';
  dateBox.placeholder = '추가할 태스크의 날짜를 작성하시오.';
  dateBox.id = 'date-box';
  dateDiv.appendChild(dateTitle);
  dateDiv.appendChild(dateBox);

  const memoBox = document.createElement('textarea');
  memoBox.placeholder = '태스크에 대한 정보를 입력해주세요.';
  memoBox.id = 'memo-box';


  const submitBtn = document.createElement('button');
  submitBtn.id = 'sub-btn';
  submitBtn.textContent = '확인';
  submitBtn.addEventListener('click', subTodo);
  const content = document.createElement('div');
  content.appendChild(nameDiv);
  content.appendChild(dateDiv);
  content.appendChild(memoBox);
  content.appendChild(submitBtn);
  return content;

}

function editTodoItem(text, dateText, memoText) {
  const nameDiv = document.createElement('div');
  const nameTitle = document.createElement('span');
  const nameBox = document.createElement('input');

  nameTitle.textContent = '이름: ';
  nameBox.value = text;
  nameBox.id = 'name-box';
  nameDiv.appendChild(nameTitle);
  nameDiv.appendChild(nameBox);

  const dateDiv = document.createElement('div');
  const dateTitle = document.createElement('span');
  const dateBox = document.createElement('input');

  dateTitle.textContent = '날짜: ';
  dateBox.value = dateText;
  dateBox.id = 'date-box';
  dateDiv.appendChild(dateTitle);
  dateDiv.appendChild(dateBox);

  const memoBox = document.createElement('textarea');
  memoBox.value = memoText;
  memoBox.id = 'memo-box';

  const submitBtn = document.createElement('button');
  submitBtn.id = 'sub-btn';
  submitBtn.textContent = '확인';
  submitBtn.addEventListener('click', subTodo);
  const content = document.createElement('div');
  content.appendChild(nameDiv);
  content.appendChild(dateDiv);
  content.appendChild(memoBox);
  content.appendChild(submitBtn);
  return content;

}

function createList() {
  const content = document.createElement('ul');
  for (let task of tasks) {
    const li = document.createElement('li');
    const spanName = document.createElement('span');
    spanName.textContent = task.name;
    spanName.addEventListener('click', () => infoTodo(task));
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
      rendering(tasks, infoTodo);
    });
    li.appendChild(delBtn);

    // const editBtn = document.createElement('span');
    // editBtn.textContent = '수정';
    // editBtn.className = 'edit-btn';
    // editBtn.addEventListener('click', () => editTodo(li, task));
    // li.appendChild(editBtn);
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
  const memoInput = document.getElementById('memo-box');
  const nameV = nameInput.value.trim();
  const dateV = new Date(dateInput.value.trim());
  const memoV = memoInput.value;
  if (!isNaN(dateV)) {
    console.log(dateV);
    tasks.push({id: idNum, name: nameV, date: dateV, memo: memoV});
    idNum++;
    console.log(tasks);
    rendering(tasks, infoTodo);
  }
  else {
    console.log("Invalid Date!");
  }
  const content = createList();
  document.getElementById('content').innerHTML = '';
  document.getElementById('content').appendChild(content);

}

function editTodo(task) {
  const content = editTodoItem(task.name, task.date.toLocaleDateString(), task.memo);
  tasks.splice(tasks.findIndex(t => t.id === task.id), 1);
  document.getElementById('content').innerHTML = '';
  document.getElementById('content').appendChild(content);
  rendering(tasks, infoTodo);
}

function chkTodo() {
  const content = createList();
  document.getElementById('content').innerHTML = '';
  document.getElementById('content').appendChild(content);
}

function infoTodo(task) {
  const content = document.createElement('div');
  content.className = 'info-display';

  const nameField = document.createElement('div');
  nameField.className = 'info-field';
  nameField.innerHTML = `
    <span class="info-label">이름</span>
    <div class="info-content">${task.name}</div>
  `;

  const dateField = document.createElement('div');
  dateField.className = 'info-field';
  dateField.innerHTML = `
    <span class="info-label">날짜</span>
    <div class="info-content">${task.date.toLocaleDateString()}</div>
  `;

  const memoField = document.createElement('div');
  memoField.className = 'info-field';
  memoField.innerHTML = `
    <span class="info-label">메모</span>
    <div class="info-content">${task.memo}</div>
  `;

  const buttonRow = document.createElement('div');
  buttonRow.className = 'button-row';

  const editBtn = document.createElement('span');
  editBtn.textContent = '수정';
  editBtn.addEventListener('click', () => editTodo(task));

  const submitBtn = document.createElement('span');
  submitBtn.textContent = '확인';
  submitBtn.addEventListener('click', chkTodo);

  buttonRow.appendChild(editBtn);
  buttonRow.appendChild(submitBtn);

  content.appendChild(nameField);
  content.appendChild(dateField);
  content.appendChild(memoField);
  content.appendChild(buttonRow);

  document.getElementById('content').innerHTML = '';
  document.getElementById('content').appendChild(content);
}

rendering(tasks, infoTodo);