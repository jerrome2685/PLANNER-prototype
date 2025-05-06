const now = new Date();

let nowYear = now.getFullYear();
let nowMonth = now.getMonth() + 1;

let calendarArea = document.getElementById("calendar");

const calendarTitle = document.createElement("div");
calendarTitle.id = "calendar-title";
calendarArea.appendChild(calendarTitle);
const calendarDay = document.createElement("div");
calendarDay.id = "calendar-day";
calendarArea.appendChild(calendarDay)
const calendarGrid = document.createElement("div");
calendarGrid.id = "calendar-grid";
calendarArea.appendChild(calendarGrid)

function checktask(Date, tasks) {
  const div = document.createElement('div');

  const date = document.createElement('div');
  date.textContent = Date.getDate();

  div.appendChild(date);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].date.getTime() === Date.getTime()) {
      const task = document.createElement('div');
      task.textContent = tasks[i].name;
      task.className = "task-box";
      div.appendChild(task);
    }
  }

  return div;
}

function rendering_title(year, month) {
  calendarTitle.innerText = String(year) + "." + String(month);
}

function rendering_day() {
  while (calendarDay.firstChild) {
    calendarDay.removeChild(calendarDay.firstChild);
  }

  const NAMES = ["SUN", "MON", "TUE", "WED", "TUE", "FRI", "SAT"];
  for (let i = 0; i < NAMES.length; i++) {
    const cell = document.createElement("div")
    cell.innerText = NAMES[i];
    if (i === 0) cell.className = "sun";
    if (i === 6) cell.className = "sat";
    calendarDay.appendChild(cell)
  }
}

function rendering_grid(year, month, tasks) {
  const date = new Date(year, month - 1, 1);
  const dayIndex = date.getDay();
  date.setDate(date.getDate() - dayIndex);
  
  while (calendarGrid.firstChild) {
    calendarGrid.removeChild(calendarGrid.firstChild);
  }

  for (let i = 0; i < 35; i++) {
    // const cell = document.createElement("divx`");
    // cell.innerText = date.getDate();
    const cell = checktask(date, tasks);
    cell.className = (date.getMonth() + 1 === month) ? "this-month" : "that-month";
    calendarGrid.appendChild(cell);
    date.setDate(date.getDate() + 1);
  }
}

function rendering(tasks) {
  console.log(tasks);
  rendering_title(nowYear, nowMonth);
  rendering_day();
  rendering_grid(nowYear, nowMonth, tasks);
}

export default rendering;
