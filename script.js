document.addEventListener("DOMContentLoaded", function () {
  populateTable();
  setupDraftOrder();
  createTeamTables();
  document
    .getElementById("randomizeButton")
    .addEventListener("click", randomizeFirstPick);
});

function populateTable() {
  const playersByRole = {
    "Top Laners": [
      "THEONLYTALENT",
      "ALKRKE",
      "Revenge",
      "Kxeight",
      "Beyond",
      "Madfury",
      "Geeto",
      "Bombainc",
      "Q8iYorlde",
      "Wufo",
    ],
    Junglers: [
      "LT Frozti",
      "Swatting",
      "Abu Mousa",
      "SalmanSin",
      "Chill",
      "Dev",
      "تمير",
      "DarkAura",
      "Baderrr",
      "small Melon",
      "jskills",
      "Dom21",
    ],
    "Mid Laners": [
      "Yazan",
      "Shugi",
      "Negan",
      "Midsofree",
      "Onikhan",
      "ALMANSROOI",
      "New ajbar1",
      "type shii",
      "Solnex",
      "Jack Of Diamond",
      "tmtaaz",
    ],
    ADC: [
      "Haunt",
      "Viper",
      "SanBii",
      "Aklass",
      "KimiaKi",
      "AlphaKuroni",
      "Rust",
      "Lionhearted",
      "Justin",
      "Helsing",
      "Humzh",
      "Lelouch",
      "REFORMED ADC",
      "invincible",
      "Dattura",
    ],
    Support: [
      "inmeschook",
      "ELOSANTA",
      "FoFo",
      "Houndin",
      "Kaca",
      "Healer",
      "Dagger",
      "Pykeonthebike",
      "Greedy",
      "Biskoo",
      "TypicalCat",
      "قائد الداعمية",
      "Blaashti",
    ],
  };

  const tableBody = document.querySelector("#playersTable tbody");
  const maxPlayers = Math.max(
    ...Object.values(playersByRole).map((players) => players.length)
  );

  for (let i = 0; i < maxPlayers; i++) {
    const row = tableBody.insertRow();
    Object.keys(playersByRole).forEach((role) => {
      const cell = row.insertCell();
      const player = playersByRole[role][i];
      if (player) {
        cell.innerHTML = `<div class='player-cell' data-role='${role}'>${player}</div>`;
      } else {
        cell.innerHTML = "";
      }
    });
  }
}

function createTeamTables() {
  const teamNames = [
    "Team Lozux",
    "Team Ajwad",
    "Team Magic",
    "Team NinjaQ8",
    "Team Yoichi",
    "Team Zero",
    "Team Egnom",
    "Team Noor",
  ];

  const captains = [
    { name: "Lozux", role: "Jungler", colorClass: "highlight-lozux" },
    { name: "Ajwad", role: "Jungler", colorClass: "highlight-ajwad" },
    { name: "Magic", role: "Mid Laner", colorClass: "highlight-magic" },
    { name: "NinjaQ8", role: "Jungler", colorClass: "highlight-ninjaq8" },
    { name: "Yoichi", role: "Mid Laner", colorClass: "highlight-yoichi" },
    { name: "Zero", role: "Top Laner", colorClass: "highlight-zero" },
    { name: "Egnom", role: "Support", colorClass: "highlight-egnom" },
    { name: "Noor", role: "Top Laner", colorClass: "highlight-noor" },
  ];

  const teamsContainer = document.getElementById("teamsContainer");

  teamNames.forEach((name, index) => {
    let teamTable = document.createElement("table");
    teamTable.id = `team${index + 1}Table`;
    teamTable.classList.add("team-table", `team-${index + 1}`);
    let html = `<caption>${name}</caption>
                      <thead class="${captains[index].colorClass}">
                          <tr><th>Player</th><th>Role</th></tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td>${captains[index].name}</td>
                            <td>${captains[index].role}</td>
                          </tr>
                      </tbody>`;
    teamTable.innerHTML = html;
    teamsContainer.appendChild(teamTable);
  });
}

let currentPickIndex = 0;
const captains = [
  "Captain Lozux",
  "Captain Ajwad",
  "Captain Magic",
  "Captain NinjaQ8",
  "Captain Yoichi",
  "Captain Zero",
  "Captain Egnom",
  "Captain Noor",
];

function setupDraftOrder() {
  document.getElementById("currentCaptain").textContent = "None";

  document.querySelectorAll("#playersTable .player-cell").forEach((cell) => {
    cell.addEventListener("click", function () {
      if (!this.classList.contains("selected")) {
        this.classList.add("selected");
        const roleName = this.getAttribute("data-role");
        const playerName = this.textContent;
        const highlightClass = `highlight-${captains[currentPickIndex]
          .split(" ")[1]
          .toLowerCase()}`;
        this.classList.add(highlightClass);
        addPlayerToTeamTable(
          playerName,
          roleName,
          `team${currentPickIndex + 1}Table`
        );
        currentPickIndex = (currentPickIndex + 1) % captains.length;
        updateCurrentCaptain(captains[currentPickIndex]);
      }
    });
  });
}

function randomizeFirstPick() {
  currentPickIndex = Math.floor(Math.random() * captains.length);
  alert(`First pick goes to: ${captains[currentPickIndex]}`);
  updateCurrentCaptain(captains[currentPickIndex]);
}

function addPlayerToTeamTable(playerName, role, teamTableId) {
  const teamTable = document.getElementById(teamTableId);
  const tbody = teamTable.getElementsByTagName("tbody")[0];
  const row = tbody.insertRow();
  row.insertCell().textContent = playerName;
  row.insertCell().textContent = role;
}

function updateCurrentCaptain(captain) {
  const currentCaptainElement = document.getElementById("currentCaptain");
  currentCaptainElement.textContent = captain;
  currentCaptainElement.className = "";
  currentCaptainElement.classList.add(
    `highlight-${captain.split(" ")[1].toLowerCase()}`
  );
}
