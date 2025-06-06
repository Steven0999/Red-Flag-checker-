//script.js

let redFlagData = {};
const systems = [
  "cardiac", "neuro", "respiratory", "urinary", "gastro", "reproductive",
  "endocrine", "msk", "trauma", "paediatric", "geriatric", "mental", "other"
];

window.onload = () => {
  const stored = localStorage.getItem("redFlagData");
  if (stored) redFlagData = JSON.parse(stored);
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

function openTab(tabId, el) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active-tab"));
  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tabId).classList.add("active-tab");
  el.classList.add("active");
}

function addRedFlag() {
  const category = document.getElementById("category").value;
  const title = document.getElementById("flag-text").value.trim();
  const desc = document.getElementById("flag-desc").value.trim();
  const source = document.getElementById("flag-source").value.trim();

  if (!category || !title) {
    alert("Category and title are required.");
    return;
  }

  if (!redFlagData[category]) redFlagData[category] = [];

  redFlagData[category].push({ title, desc, source });

  // Reset form
  document.getElementById("flag-text").value = "";
  document.getElementById("flag-desc").value = "";
  document.getElementById("flag-source").value = "";

  saveAndRender();
}

function editRedFlag(category, index) {
  const flag = redFlagData[category][index];

  const newTitle = prompt("Edit title:", flag.title) || flag.title;
  const newDesc = prompt("Edit description:", flag.desc || "") || flag.desc;
  const newSource = prompt("Edit source:", flag.source || "") || flag.source;

  redFlagData[category][index] = {
    title: newTitle.trim(),
    desc: newDesc.trim(),
    source: newSource.trim()
  };

  saveAndRender();
}

function deleteRedFlag(category, index) {
  if (confirm("Delete this red flag?")) {
    redFlagData[category].splice(index, 1);
    if (redFlagData[category].length === 0) delete redFlagData[category];
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

      const textContainer = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = flag.title;

      textContainer.appendChild(title);
      if (flag.desc) {
        const desc = document.createElement("p");
        desc.textContent = flag.desc;
        textContainer.appendChild(desc);
      }
      if (flag.source) {
        const source = document.createElement("small");
        source.textContent = `Source: ${flag.source}`;
        textContainer.appendChild(source);
      }

      content.appendChild(icon);
      content.appendChild(textContainer);

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
