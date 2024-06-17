/* 
    String set - what set the artifact belongs to
    String type - whether it is flower, feather, sands, goblet, or circlet
    Number rarity - 1 to 5 stars
    Number level - number from 1 - 20
    Stat mainstat - artifact main stat
    Array[Stat] - 1 to 4 substats
*/
function Artifact(set, type, rarity, level, mainstat, substats) {
  this.set = set;
  this.type = type;
  this.rarity = rarity;
  this.level = level;
  this.mainstat = mainstat;
  this.substats = substats;
  this.index = Artifact.currentIndex++;
}

Artifact.currentIndex = 0;

Artifact.prototype.toString = function () {
  let output = `Set: ${this.set}\nType: ${this.type}\nRarity: ${this.rarity}\nLevel: ${this.level}\nMainstat: ${this.mainstat}\n`;
  for (let i = 1; i <= this.substats.length; i++) {
    output += `Substat ${i}: ` + this.substats[i - 1] + "\n";
  }
  output.trim();
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

function addArtifactToCollection(artifacts, collectionDiv, artifact) {
  const artifactDiv = document.createElement("div");
  const artifactHeader = document.createElement("div");
  const artifactStats = document.createElement("div");
  const deleteArtifactDiv = document.createElement("div");
  const xSymbol = document.createElement("img");

  artifactDiv.classList.add("artifact");
  artifactDiv.dataset.index = artifact.index;
  artifactDiv.addEventListener("mouseover", () => {
    unhideElement(deleteArtifactDiv);
  });
  artifactDiv.addEventListener("mouseout", () => {
    hideElement(deleteArtifactDiv);
  });
  artifactHeader.classList.add("artifact-head");
  artifactStats.classList.add("artifact-stats");
  artifactHeader.textContent = "Artifact Set";

  hideElement(deleteArtifactDiv);
  deleteArtifactDiv.classList.add("delete-artifact");
  deleteArtifactDiv.dataset.index = artifact.index;
  deleteArtifactDiv.addEventListener("click", () => {
    removeArtifact(artifacts, collectionDiv, deleteArtifactDiv.dataset.index);
  });

  xSymbol.src = "assets/x-symbol.svg";
  xSymbol.alt = "Delete Button";
  deleteArtifactDiv.appendChild(xSymbol);

  const infoArr = String(artifact).split("\n");
  for (const stat of infoArr) {
    const text = document.createElement("p");
    text.textContent = stat;
    artifactStats.appendChild(text);
  }

  artifactDiv.appendChild(artifactHeader);
  artifactDiv.appendChild(artifactStats);
  artifactDiv.appendChild(deleteArtifactDiv);
  collectionDiv.appendChild(artifactDiv);
}

function createNewArtifact() {
  const artifactSet = document.getElementById("artifact-set").value;
  const artifactType = document.getElementById("artifact-type").value;
  const artifactRarity = document.getElementById("artifact-rarity").value;
  const artifactLevel = document.getElementById("artifact-level").value;
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
    mainstat,
    [substat]
  );
  return artifact;
}

function removeArtifact(artifacts, collectionDiv, index) {
  const artifactDiv = document.querySelector(
    `.artifact[data-index='${index}']`
  );
  console.log(collectionDiv.removeChild(artifactDiv));
  for (let i = 0; i < artifacts.length; i++) {
    if (artifacts[i].index == index) {
      artifacts.splice(i, 1);
      break;
    }
  }
}

function displayAllArtifacts(artifacts, collectionDiv) {
  for (artifact of artifacts) {
    addArtifactToCollection(artifacts, collectionDiv, artifact);
  }
}
// for testing purposes
function randomArtifactGenerator() {
  const set = "blahblahblah";
  const type = "flower";
  const rarity = Math.floor(Math.random() * 5) + 1;
  const level = Math.floor(Math.random() * 20) + 1;
  const mainstat = new Stat("HP%", 10, "%");
  const substat = new Stat("DEF%", 17.9, "%");
  const artifact = new Artifact(set, type, rarity, level, mainstat, [substat]);
  return artifact;
}

function main() {
  const artifacts = [randomArtifactGenerator(), randomArtifactGenerator()];
  const collectionDiv = document.querySelector(".artifact-collection");
  displayAllArtifacts(artifacts, collectionDiv);

  const newArtifactForm = document.getElementById("new-artifact");
  const addNewButton = document.querySelector(".add-new");
  addNewButton.addEventListener("click", () => {
    newArtifactForm.showModal();
  });

  const newArtifactFormBtn = document.getElementById("new-artifact-submit");
  newArtifactFormBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addArtifactToCollection(artifacts, collectionDiv, createNewArtifact());
    newArtifactForm.close();
  });
}

main();
