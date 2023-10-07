const fuelLevel = {
    fuelStart: 1000,
    fuelVolume : fuelStart,
    fuelConsumptionRate, 
}

const fuelRequirements = {
    distanceFromPlanet :  planetXY - distanceFromEarth,
    minFuel: distanceFromPlanet/fuelConsumptionRate,
}

function calculateFuelUsage(distanceFromEarth) {
    return fuelVolume - fuelConsumptionRate * distanceFromEarth;
}


function displayFuel(){
    console.log('Current fuel volume is ${fuelLevel.fuelVolume} liters');
}


function refuel(refuelVolume){
    fuelVolume += refuelVolume;
    displayFuel();
}

function fuelLow(fuelStart, fuelVolume) {
    if(fuelVolume / fuelStart  <= 1/10) {
        console.log('Your fuel volume is less than 10%! Please refuel now!');
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
