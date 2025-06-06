// script.js

let redFlagData = {};

window.onload = () => {
  const stored = localStorage.getItem("redFlagData");
  if (stored) {
    redFlagData = JSON.parse(stored);
    renderRedFlags();
  }
};

function addRedFlag() {
  const category = document.getElementById("category").value;
  const text = document.getElementById("flag-text").value.trim();

  if (!category || !text) {
    alert("Please select a category and enter a red flag detail.");
    return;
  }

  if (!redFlagData[category]) {
    redFlagData[category] = [];
  }

  redFlagData[category].push(text);
  document.getElementById("flag-text").value = "";

  saveAndRender();
}

function editRedFlag(category, index) {
  const newText = prompt("Edit Red Flag:", redFlagData[category][index]);
  if (newText !== null && newText.trim() !== "") {
    redFlagData[category][index] = newText.trim();
    saveAndRender();
  }
}

function deleteRedFlag(category, index) {
  if (confirm("Are you sure you want to delete this red flag?")) {
    redFlagData[category].splice(index, 1);
    if (redFlagData[category].length === 0) {
      delete redFlagData[category];
    }
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("redFlagData", JSON.stringify(redFlagData));
  renderRedFlags();
}

function renderRedFlags() {
  const display = document.getElementById("red-flag-display");
  display.innerHTML = "";

  for (let category in redFlagData) {
    const section = document.createElement("div");
    section.classList.add("category");

    const header = document.createElement("h3");
    header.textContent = category;
    section.appendChild(header);

    redFlagData[category].forEach((flag, index) => {
      const flagItem = document.createElement("div");
      flagItem.classList.add("red-flag");

      const content = document.createElement("div");
      content.classList.add("red-flag-content");

      const icon = document.createElement("img");
      icon.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Red_flag_waving.svg/1024px-Red_flag_waving.svg.png";
      icon.alt = "Red Flag";

      const text = document.createElement("span");
      text.textContent = flag;

      content.appendChild(icon);
      content.appendChild(text);

      const actions = document.createElement("div");
      actions.classList.add("flag-actions");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editRedFlag(category, index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteRedFlag(category, index);

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      flagItem.appendChild(content);
      flagItem.appendChild(actions);

      section.appendChild(flagItem);
    });

    display.appendChild(section);
  }
}
