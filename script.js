// script.js

let redFlagData = {};

const systems = [
  "cardiac", "neuro", "respiratory", "urinary", "gastro", "reproductive",
  "endocrine", "msk", "trauma", "paediatric", "geriatric", "mental", "other"
];

window.onload = () => {
  const stored = localStorage.getItem("redFlagData");
  if (stored) {
    redFlagData = JSON.parse(stored);
  }
  createSystemTabs();
  renderRedFlags();
};

function createSystemTabs() {
  const container = document.getElementById("red-flag-tabs");
  container.innerHTML = "";

  systems.forEach(system => {
    const section = document.createElement("div");
    section.id = system;
    section.classList.add("tab-content");
    container.appendChild(section);
  });
}

function openTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active-tab");
  });
  document.querySelectorAll(".tab").forEach(btn => {
    btn.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active-tab");
  event.target.classList.add("active");
}

function addRedFlag() {
  const category = document.getElementById("category").value;
  const text = document.getElementById("flag-text").value.trim();

  if (!category || !text) {
    alert("Please select a category and enter a red flag.");
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
  systems.forEach(category => {
    const container = document.getElementById(category);
    container.innerHTML = `<h3>${capitalize(category)}</h3>`;

    const flags = redFlagData[category] || [];

    flags.forEach((flag, index) => {
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

      container.appendChild(flagItem);
    });
  });
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
