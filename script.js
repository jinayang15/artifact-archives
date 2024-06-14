const artifacts = [randomArtifactGenerator(), randomArtifactGenerator()];

/* 
    String set - what set the artifact belongs to
    String type - whether it is flower, feather, timepiece, goblet, or circlet
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

function addArtifactToCollection(artifact) {
  artifacts.push(artifact);
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
  console.log(artifact);
  return artifact;
}

function main() {
  const collectionDiv = document.querySelector(".artifact-collection");
  for (const artifact of artifacts) {
    const artifactDiv = document.createElement("div");
    artifactDiv.classList.add("artifact");
    artifactDiv.textContent = "" + artifact;
    collectionDiv.appendChild(artifactDiv);
  }
}

main();
