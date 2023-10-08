const visitedPlanets = [];

// Function to add a visited planet to the list
function visitPlanet(planetName) {
  if (!visitedPlanets.includes(planetName)) {
    visitedPlanets.push(planetName);
    console.log(`You visited ${planetName}!`);
  } else {
    console.log(`You've already visited ${planetName}.`);
  }
}

// Function to display the list of visited planets
function displayVisitedPlanets() {
  if (visitedPlanets.length === 0) {
    console.log("You haven't visited any planets yet.");
  } else {
    console.log("Visited Planets:");
    visitedPlanets.forEach((planet, index) => {
      console.log(`${index + 1}. ${planet}`);
    });
  }
}


// Example usage:
visitPlanet("Mars");
visitPlanet("Earth");
visitPlanet("Venus");
visitPlanet("Mars");
visitPlanet("Jupiter");

console.log("Displaying Visited Planets:");
displayVisitedPlanets();


