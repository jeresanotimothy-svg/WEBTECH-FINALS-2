const students = ["Timothy Jeresano", "Athena Paigma", "Chassica Flores", "Ryan Monencillo", "Kinjay Languita"];
const listEl = document.getElementById("student-list");
const lengthEl = document.getElementById("list-length");
const addInput = document.getElementById("add-input");
const findInput = document.getElementById("find-input");
const separatorSelect = document.getElementById("separator-select");


function showMessage(elementId, text, type) {
  const el = document.getElementById(elementId);
  el.textContent = text;
  el.className = "message" + (type ? " " + type : "");
}


function renderList(array) {
  listEl.innerHTML = "";

  if (array.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No students in the list. Add one above.";
    empty.className = "empty";
    listEl.appendChild(empty);
  } else {
    array.forEach(function (name) {
      const li = document.createElement("li");
      li.textContent = name;
      listEl.appendChild(li);
    });
  }

  lengthEl.textContent = array.length;
}


function addStudent(array, name) {
  const cleaned = name.trim();

  if (cleaned === "") {
    return { success: false, message: "Student name is required." };
  }

  const namePattern = /^[\p{L}\s]+$/u;
  if (!namePattern.test(cleaned)) {
    return { success: false, message: "Invalid name. Use letters only." };
  }

  array.push(cleaned);
  return { success: true, message: '"' + cleaned + '" has been added at index ' + (array.length - 1) + "." };
}

function handleAdd() {
  const result = addStudent(students, addInput.value);
  showMessage("add-message", result.message, result.success ? "success" : "error");
  if (result.success) {
    addInput.value = "";
    renderList(students);
  }
  addInput.focus();
}

function removeLastStudent(array) {
  if (array.length === 0) {
    return { success: false, message: "No students to remove. The list is empty." };
  }
  const removed = array.pop();
  return { success: true, message: '"' + removed + '" has been removed from the end of the list.' };
}

function handleRemove() {
  const result = removeLastStudent(students);
  showMessage("remove-message", result.message, result.success ? "success" : "error");
  renderList(students);
}


function findStudent(array, indexValue) {
  if (indexValue === "" || indexValue === null) {
    return { success: false, message: "Please enter an index number." };
  }

  const index = Number(indexValue);

  if (!Number.isInteger(index)) {
    return { success: false, message: "Index must be a whole number." };
  }

  if (index < 0 || index >= array.length) {
    const last = array.length - 1;
    const range = array.length === 0 ? "The list is empty." : "Valid indexes are 0 to " + last + ".";
    return { success: false, message: "Index " + index + " is out of range. " + range };
  }

  const item = array.at(index);
  return { success: true, message: "Index " + index + ": " + item };
}

function handleFind() {
  const result = findStudent(students, findInput.value);
  showMessage("find-message", result.message, result.success ? "success" : "error");
}


function joinStudents(array, separator) {
  return array.join(separator);
}

function getSeparator() {
  return separatorSelect.value;
}

function handleJoin() {
  if (students.length === 0) {
    showMessage("join-message", "No students to join. The list is empty.", "error");
    return;
  }
  const joined = joinStudents(students, getSeparator());
  showMessage("join-message", joined, "success");
}


function convertToString(array) {
  return array.toString();
}

function handleToString() {
  if (students.length === 0) {
    showMessage("tostring-message", "No students to convert. The list is empty.", "error");
    return;
  }
  showMessage("tostring-message", convertToString(students), "success");
}


document.getElementById("add-btn").addEventListener("click", handleAdd);
document.getElementById("remove-btn").addEventListener("click", handleRemove);
document.getElementById("find-btn").addEventListener("click", handleFind);
document.getElementById("join-btn").addEventListener("click", handleJoin);
document.getElementById("tostring-btn").addEventListener("click", handleToString);

addInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleAdd();
});
findInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleFind();
});


renderList(students);