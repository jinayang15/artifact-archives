const artifacts = [randomArtifactGenerator(), randomArtifactGenerator()];

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
}
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

function addArtifactToCollection(collectionDiv, artifact) {
  const artifactDiv = document.createElement("div");
  const artifactHeader = document.createElement("div");
  const artifactStats = document.createElement("div");
  artifactDiv.classList.add("artifact");
  artifactHeader.classList.add("artifact-head");
  artifactStats.classList.add("artifact-stats");

  artifactHeader.textContent = "Artifact Set";

  const infoArr = String(artifact).split("\n");
  for (const stat of infoArr) {
    const text = document.createElement("p");
    text.textContent = stat;
    artifactStats.appendChild(text);
  }

  artifactDiv.appendChild(artifactHeader);
  artifactDiv.appendChild(artifactStats);
  collectionDiv.appendChild(artifactDiv, collectionDiv.lastChild);
}

function createNewArtifact() {
  const artifactSet = document.querySelector("#artifact-set").value;
  const artifactType = document.querySelector("#artifact-type").value;
  const artifactRarity = document.querySelector("#artifact-rarity").value;
  const artifactLevel = document.querySelector("#artifact-level").value;
  const artifactMainstat = document.querySelector("#artifact-mainstat").value;
  const artifactMainstatValue = document.querySelector(
    "#artifact-mainstat-value"
  ).value;
  const artifactSubstat = document.querySelector("#artifact-substat-1").value;
  const artifactSubstatValue = document.querySelector(
    "#artifact-substat-1-value"
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
  const collectionDiv = document.querySelector(".artifact-collection");
  for (artifact of artifacts) {
    addArtifactToCollection(collectionDiv, artifact);
  }

  const newArtifactForm = document.querySelector("#new-artifact");
  const addNewButton = document.querySelector(".add-new");
  addNewButton.addEventListener("click", () => {
    newArtifactForm.showModal();
  });

  const newArtifactFormBtn = document.querySelector("#new-artifact-submit");
  newArtifactFormBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addArtifactToCollection(collectionDiv, createNewArtifact());
    newArtifactForm.close();
  });
}

main();
