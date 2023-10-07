let fuelVolume =  0;
let fuelConsumptionRate = 0;
let startFuelVolume = 0; 

function setFuel(newFuelVolume) {
    fuelVolume = newFuelVolume;
    startFuelVolume = newFuelVolume;
    console.log(`Current fuel volume is ${fuelVolume} liters and the starting fuel is ${startFuelVolume} litres`); //Test code
}

function displayFuel(){
    console.log(`Current fuel volume is ${fuelVolume} liters`);
}

function refuel(refuelVolume){
    if((refuelVolume + fuelVolume) <= startFuelVolume){
    fuelVolume += refuelVolume;
    displayFuel();
    }else if(fuelVolume == startFuelVolume){
        console.log(`Fuel tank is currently full!`)
    }else{
        fuelVolume = startFuelVolume;
        console.log(`Fuel tank is too small! Fuel refilled to ${startFuelVolume}!`);
    }
}

function setFuelConsumptionRate(newFuelConsumptionRate){
    fuelConsumptionRate = newFuelConsumptionRate;
    console.log(`Current fuel consumption rate is ${fuelConsumptionRate} liters`); //Test code
}


//Calculate fuel needed for travel to planet
function calculateFuelUsage(distanceFromEarth) {
    return distanceFromEarth/fuelConsumptionRate;
}

//Checks if spaceship has enough fuel to make the journey to planet
function isTravelOk(){
    if(fuelVolume >= calculateFuelUsage(distanceFromEarth)){
        return true;
    }else {
        console.log('You do not have enough fuel to iniiate this journey!');
        return false;
    }
}

function useFuel(planet){
    if(!isTravelOk()){
        return;
    }else{
        fuelVolume -= calculateFuelUsage(planet.distance);
    }
    displayFuel();
}


