/* 
    String set - what set the artifact belongs to
    String type - whether it is flower, feather, sands, goblet, or circlet
    Number rarity - 1 to 5 stars
    Number level - number from 1 - 20
    Stat mainstat - artifact main stat
    Array[Stat] - 1 to 4 substats
*/
function Artifact(set, type, rarity, level, locked, mainstat, substats) {
  this.set = set;
  this.type = type;
  this.rarity = rarity;
  this.level = level;
  this.locked = locked;
  this.mainstat = mainstat;
  this.substats = substats;
}
Artifact.prototype.toString = function () {
  let output = `Set: ${this.set}\nType: ${this.type}\nRarity: ${this.rarity}\nLevel: ${this.level}\nMainstat: ${this.mainstat}\n`;
  for (let i = 1; i <= this.substats.length; i++) {
    output += `Substat ${i}: ` + this.substats[i - 1] + "\n";
  }
  output = output.trim();
  return output;
};

/*
    String type - type of stat
    Number value - amount of stat
    String unit - unit of value
*/
function Stat(type, value, unit) {
  this.type = type;
  this.value = value;
  this.unit = unit;
}
Stat.prototype.toString = function () {
  return `${this.value}${this.unit} ${this.type}`;
};

function hideElement(element) {
  element.classList.add("hidden");
}

function unhideElement(element) {
  element.classList.remove("hidden");
}

function addArtifactToCollection(artifacts, collectionDiv, artifact, index) {
  const artifactDiv = document.createElement("div");
  const artifactHeader = document.createElement("div");
  const artifactStats = document.createElement("div");
  const deleteArtifactDiv = document.createElement("div");
  const xSymbol = document.createElement("img");
  const lockDiv = document.createElement("div");

  artifactDiv.classList.add("artifact");
  artifactDiv.dataset.index = index;

  // parse artifact stats
  const infoArr = String(artifact).split("\n");
  for (const stat of infoArr) {
    const text = document.createElement("p");
    text.textContent = stat;
    artifactStats.appendChild(text);
  }

  // delete button appears on hover
  artifactDiv.addEventListener("mouseover", () => {
    unhideElement(deleteArtifactDiv);
    if (!artifact.locked) unhideElement(lockDiv);
  });
  artifactDiv.addEventListener("mouseout", () => {
    hideElement(deleteArtifactDiv);
    if (!artifact.locked) hideElement(lockDiv);
  });

  artifactHeader.classList.add("artifact-head");
  artifactStats.classList.add("artifact-stats");
  artifactHeader.textContent = "Artifact Set";

  // delete button removes artifact
  hideElement(deleteArtifactDiv);
  deleteArtifactDiv.classList.add("delete-artifact");
  deleteArtifactDiv.dataset.index = index;
  deleteArtifactDiv.addEventListener("click", () => {
    removeArtifact(artifacts, collectionDiv, deleteArtifactDiv.dataset.index);
  });

  lockDiv.classList.add("lock-artifact");
  lockDiv.dataset.index = index;
  addLockSymbol(artifact, lockDiv);
  // changes between locked and unlocked
  lockDiv.addEventListener("click", () => {
    changeArtifactLock(artifact, lockDiv);
  });

  xSymbol.src = "assets/x-symbol.svg";
  xSymbol.alt = "Delete Button";

  deleteArtifactDiv.appendChild(xSymbol);

  artifactDiv.appendChild(artifactHeader);
  artifactDiv.appendChild(artifactStats);
  artifactDiv.appendChild(deleteArtifactDiv);
  artifactDiv.appendChild(lockDiv);
  collectionDiv.appendChild(artifactDiv);
}

function addLockSymbol(artifact, lockDiv) {
  const lockSymbol = document.createElement("img");
  if (artifact.locked) {
    lockSymbol.src = "assets/lock_closed.svg";
    lockSymbol.alt = "Locked Artifact";
  } else {
    lockSymbol.src = "assets/lock_opened.svg";
    lockSymbol.alt = "Unlocked Artifact";
    hideElement(lockDiv);
  }
  lockDiv.appendChild(lockSymbol);
}

function createNewArtifact() {
  const artifactSet = document.getElementById("artifact-set").value;
  const artifactType = document.getElementById("artifact-type").value;
  const artifactRarity = document.getElementById("artifact-rarity").value;
  const artifactLevel = document.getElementById("artifact-level").value;
  const artifactLocked = document.getElementById("artifact-locked").checked;
  const artifactMainstat = document.getElementById("artifact-mainstat").value;
  const artifactMainstatValue = document.getElementById(
    "artifact-mainstat-value"
  ).value;
  const artifactSubstat = document.getElementById("artifact-substat-1").value;
  const artifactSubstatValue = document.getElementById(
    "artifact-substat-1-value"
  ).value;

  const mainstat = new Stat(artifactMainstat, artifactMainstatValue, "");
  const substat = new Stat(artifactSubstat, artifactSubstatValue, "");
  const artifact = new Artifact(
    artifactSet,
    artifactType,
    artifactRarity,
    artifactLevel,
    artifactLocked,
    mainstat,
    [substat]
  );
  return artifact;
}

function removeArtifact(artifacts, collectionDiv, index) {
  artifacts.splice(index, 1);
  removeAllArtifacts(collectionDiv);
  displayAllArtifacts(artifacts, collectionDiv);
}

function removeAllArtifacts(collectionDiv) {
  const addNewButton = document.querySelector(".add-new");
  collectionDiv.textContent = "";
  collectionDiv.appendChild(addNewButton);
}

function displayAllArtifacts(artifacts, collectionDiv) {
  for (let i = 0; i < artifacts.length; i++) {
    addArtifactToCollection(artifacts, collectionDiv, artifacts[i], i);
  }
}

function changeArtifactLock(artifact, lockDiv) {
  artifact.locked = !artifact.locked;
  lockDiv.textContent = "";
  addLockSymbol(artifact, lockDiv);
}

// for testing purposes
function randomArtifactGenerator() {
  const set = "blahblahblah";
  const type = "flower";
  const rarity = Math.floor(Math.random() * 5) + 1;
  const level = Math.floor(Math.random() * 20) + 1;
  const locked = true;
  const mainstat = new Stat("HP%", 10, "%");
  const substat = new Stat("DEF%", 17.9, "%");
  const artifact = new Artifact(set, type, rarity, level, locked, mainstat, [
    substat,
  ]);
  return artifact;
}

function main() {
  const artifacts = [randomArtifactGenerator(), randomArtifactGenerator()];
  const collectionDiv = document.querySelector(".artifact-collection");
  displayAllArtifacts(artifacts, collectionDiv);

  // new artifact form
  const newArtifactForm = document.getElementById("new-artifact");
  const addNewButton = document.querySelector(".add-new");
  addNewButton.addEventListener("click", () => {
    newArtifactForm.showModal();
  });

  const newArtifactFormBtn = document.getElementById("new-artifact-submit");
  newArtifactFormBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newArtifact = createNewArtifact();
    addArtifactToCollection(
      artifacts,
      collectionDiv,
      newArtifact,
      artifacts.length
    );
    artifacts.push(newArtifact);
    newArtifactForm.close();
  });
}

main();
