const systems = [
  "cardiac", "neuro", "respiratory", "urinary", "gastro", "reproductive",
  "endocrine", "msk", "trauma", "paediatric", "geriatric", "mental", "other"
];

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toggleMenu() {
  const menu = document.getElementById("hamburger-menu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

function openTab(tabId, el) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active-tab"));
  document.getElementById(tabId).classList.add("active-tab");

  document.querySelectorAll(".hamburger-menu .tab").forEach(tab => tab.classList.remove("active"));
  el.classList.add("active");

  document.getElementById("hamburger-menu").style.display = "none";
}

function addRedFlag() {
  const system = document.getElementById("category").value;
  const text = document.getElementById("flag-text").value.trim();
  const desc = document.getElementById("flag-desc").value.trim();
  const source = document.getElementById("flag-source").value.trim();

  if (!system || !text) {
    alert("System and Red Flag Title are required.");
    return;
  }

  const flag = { text, desc, source };
  const data = JSON.parse(localStorage.getItem(system) || "[]");
  data.push(flag);
  localStorage.setItem(system, JSON.stringify(data));

  document.getElementById("flag-text").value = "";
  document.getElementById("flag-desc").value = "";
  document.getElementById("flag-source").value = "";

  renderFlags();
  openTab(system, document.querySelector(`.tab[data-system="${system}"]`));
}

function deleteRedFlag(system, index) {
  const data = JSON.parse(localStorage.getItem(system) || "[]");
  data.splice(index, 1);
  localStorage.setItem(system, JSON.stringify(data));
  renderFlags();
}

function editRedFlag(system, index) {
  const data = JSON.parse(localStorage.getItem(system) || "[]");
  const flag = data[index];

  const newText = prompt("Edit red flag text:", flag.text);
  if (newText !== null) flag.text = newText;

  const newDesc = prompt("Edit description:", flag.desc);
  if (newDesc !== null) flag.desc = newDesc;

  const newSource = prompt("Edit journal/source:", flag.source);
  if (newSource !== null) flag.source = newSource;

  localStorage.setItem(system, JSON.stringify(data));
  renderFlags();
}

function renderFlags() {
  systems.forEach(system => {
    const tab = document.getElementById(system);
    tab.innerHTML = "";
    const data = JSON.parse(localStorage.getItem(system) || "[]");

    data.forEach((flag, index) => {
      const div = document.createElement("div");
      div.className = "red-flag";

      div.innerHTML = `
        <div class="red-flag-content">
          <img src="https://cdn-icons-png.flaticon.com/512/3410/3410478.png" alt="Red flag" />
          <div class="text-details">
            <strong>${flag.text}</strong>
            ${flag.desc ? `<p>${flag.desc}</p>` : ""}
            ${flag.source ? `<p><em>Source: ${flag.source}</em></p>` : ""}
            <div class="flag-actions">
              <button onclick="editRedFlag('${system}', ${index})">Edit</button>
              <button onclick="deleteRedFlag('${system}', ${index})">Delete</button>
            </div>
          </div>
        </div>
      `;
      tab.appendChild(div);
    });
  });
}

function createSystemTabs() {
  const container = document.getElementById("red-flag-tabs");
  const menu = document.getElementById("hamburger-menu");

  systems.forEach(system => {
    const section = document.createElement("div");
    section.id = system;
    section.classList.add("tab-content");
    container.appendChild(section);

    const tabButton = document.createElement("button");
    tabButton.classList.add("tab");
    tabButton.textContent = capitalize(system);
    tabButton.setAttribute("data-system", system);
    tabButton.onclick = function () {
      openTab(system, tabButton);
    };
    menu.appendChild(tabButton);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createSystemTabs();
  renderFlags();
});

document.addEventListener("click", function (e) {
  const menu = document.getElementById("hamburger-menu");
  const button = document.getElementById("hamburger");
  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.style.display = "none";
  }
});
