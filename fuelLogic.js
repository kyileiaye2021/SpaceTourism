const fuel = {
    fuelVolume : 1000,
    fuelConsumptionRate : 10, //Example
}

function intializeFuel(fuelVolume){
    let fuelStart = this.fuelVolume;
}


  // let distanceFromEarth  = (spaceshipX^2 + spaceshipY^2)^(1/2); 
  // let distanceFromPlanet = planetXY - distanceFromEarth;
   // let minFuel =  int(distanceFromPlanet/fuelConsumptionRate);

function calculateFuelUsage(distanceFromEarth) {
    return fuel.fuelVolume - fuel.fuelConsumptionRate * distanceFromEarth;
}


function displayFuel(){
    console.log(`Current fuel volume is ${fuel.fuelVolume} liters`);
}

function refuel(refuelVolume){
    fuelVolume += refuelVolume;
    displayFuel();
}

function fuelLow(fuelStart, fuelVolume) {
    if(fuelVolume / fuelStart  <= 1/10) {
        console.log(`Your fuel volume is less than 10% (${fuel.fuelVolume}) ! Please refuel now!`);
        return true;
    }
}

function fuelInsufficient(planet){
    if(fuelLow(fuelStart, fuelVolume) == true){
        console.log('You do not have enough fuel to iniiate this journey!');
        console.log()
        return true;
    }
}

function simulateJourney(distanceFromEarth){
   
    
}

intializeFuel(fuel.fuelVolume);
calculateFuelUsage(1000);
displayFuel();