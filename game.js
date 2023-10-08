const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Spaceship
let spaceshipX = canvas.width / 2;
let spaceshipY = canvas.height / 2;
const spaceshipWidth = 30;
const spaceshipHeight = 30;

const planetSpeed = 2.5; // Adjust the speed as needed (faster)
const acceleration = 1; // Adjust acceleration (higher)
const friction = 0.98; // Friction factor to slow down the spaceship
const stopThreshold = 0.5; // Threshold for stopping
const maxVelocity = 5; // Maximum velocity

// Planet
let planetCircleX = canvas.width - 50;
let planetCircleY = canvas.height / 2;
const planetCircleRadius = 50;

let planetCircleA = canvas.width - 200;
let planetCircleB = canvas.height / 3;

// Velocity variables for X and Y directions
let dx = 0;
let dy = 0;

// Direction variables
let lastDirectionX = 0;
let lastDirectionY = 0;

// Rotation angle
let rotationAngle = 0;

// Function to draw the circle
function drawCircle(circX, circY, rad, color) {
    ctx.beginPath();
    ctx.arc(circX, circY, rad, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawSpaceship() {
    const spaceshipImg = new Image();
    spaceshipImg.src = "SaturnVRocket.png";
    
    // Calculate the transformation origin
    const originX = spaceshipX + (spaceshipWidth / 2);
    const originY = spaceshipY + (spaceshipHeight / 2);
    
    // Save the current canvas state
    ctx.save();
    
    // Translate the context to the origin
    ctx.translate(originX, originY);
    
    // Rotate the context based on the angle of rotation
    ctx.rotate(rotationAngle ); // Corrected
    
    ctx.scale(5,5);
    
    // Draw the spaceship centered at the transformed origin
    ctx.drawImage(spaceshipImg, -spaceshipWidth / 2, -spaceshipHeight / 2, spaceshipWidth, spaceshipHeight);
    
    // Restore the canvas state
    ctx.restore();
}

function updateCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the circle
    drawCircle(planetCircleA, planetCircleB, 70, "#ffcc00");
    
    // Calculate the angle of rotation based on the direction
    if (lastDirectionX !== 0 || lastDirectionY !== 0) {
        rotationAngle = Math.atan2(lastDirectionY, lastDirectionX) +Math.PI/2;
    } 
    
    drawSpaceship();
    checkCollision();

    // Draw the combustion effect
    drawCombustion();

    // Update the spaceship's velocity based on acceleration for X and Y directions
    if (Math.abs(dx) < maxVelocity) {
        dx += lastDirectionX * acceleration;
    }
    if (Math.abs(dy) < maxVelocity) {
        dy += lastDirectionY * acceleration;
    }

    // Apply friction to slow down the spaceship
    dx *= friction;
    dy *= friction;

    // Apply momentum and stop the spaceship when below the threshold
    if (Math.abs(dx) < stopThreshold) {
        dx = 0;
    }
    if (Math.abs(dy) < stopThreshold) {
        dy = 0;
    }

    // Update the spaceship's position
    spaceshipX += dx;
    spaceshipY += dy;

    // Keep the spaceship within the canvas boundaries
    if (spaceshipX < 0) {
        spaceshipX = 0;
    }
    if (spaceshipX + spaceshipWidth > canvas.width) {
        spaceshipX = canvas.width - spaceshipWidth;
    }
    if (spaceshipY < 0) {
        spaceshipY = 0;
    }
    if (spaceshipY + spaceshipHeight > canvas.height) {
        spaceshipY = canvas.height - spaceshipHeight;
    }
}

function checkCollision() {
    // Calculate the distance between the centers of the spaceship and the planet
    const distance = Math.sqrt(
        Math.pow(spaceshipX + spaceshipWidth / 2 - planetCircleA, 2) +
        Math.pow(spaceshipY + spaceshipHeight / 2 - planetCircleB, 2)
    );

    // Check if the distance is less than the sum of the spaceship's and planet's radii
    if (distance < spaceshipWidth / 2 + planetCircleRadius) {
        // Collision detected! Navigate to a new page
        window.location.href = "planetwindow.html";
    }
}

// Function to handle keyboard input
const keys = {}; // Object to track key states

function handleKeyDown(event) {
    keys[event.key] = true;
    calculateVelocity();

     // Set isCombusting to true when an arrow key is pressed
     if (event.key.includes("Arrow")) {
        isCombusting = true;
        addCombustionPosition(); // Add a new combustion position
    }

}

function handleKeyUp(event) {
    keys[event.key] = false;
    calculateVelocity();
}

function calculateVelocity() {
    dx = 0;
    dy = 0;

    if (keys["ArrowLeft"]) {
        lastDirectionX = -planetSpeed;
    }
    if (keys["ArrowRight"]) {
        lastDirectionX = planetSpeed;
    }
    if (keys["ArrowUp"]) {
        lastDirectionY = -planetSpeed;
    }
    if (keys["ArrowDown"]) {
        lastDirectionY = planetSpeed;
    }
}

// Continuously apply last direction even after keys are released
function applyLastDirection() {
    if (!keys["ArrowLeft"] && !keys["ArrowRight"]) {
        lastDirectionX = 0;
    }
    if (!keys["ArrowUp"] && !keys["ArrowDown"]) {
        lastDirectionY = 0;
    }
}




// Combustion effect variables
let isCombusting = false;
let combustionFrame = 0;
const maxCombustionFrames = 30; // Number of frames to display the combustion effect
const combustionPositions = [];


// Function to add a new combustion position
function addCombustionPosition() {
    // Define the distance from the spaceship's center to the combustion point
    const combustionDistance = 20; // Adjust as needed

    // Calculate the position of the combustion effect based on the rotation angle
    const combustionX = spaceshipX + spaceshipWidth / 2 + combustionDistance * Math.cos(rotationAngle);
    const combustionY = spaceshipY + spaceshipHeight / 2 + combustionDistance * Math.sin(rotationAngle);

    // Add the position to the array
    combustionPositions.push({ x: combustionX, y: combustionY, frame: 0 });
}

// Function to draw combustion effect
function drawCombustion() {
    if (isCombusting) {
        // Define the distance from the spaceship's center to the combustion point
        const combustionDistance = 100; // Adjust as needed

        // Calculate the position of the combustion effect based on the rotation angle
        const combustionX = spaceshipX + spaceshipWidth / 2 - combustionDistance * Math.sin(rotationAngle);
        const combustionY = spaceshipY + spaceshipHeight / 2 + combustionDistance * Math.cos(rotationAngle);

        for (let i = 0; i < combustionPositions.length; i++) {
            const combustion = combustionPositions[i];
    
            if (combustion.frame <= maxCombustionFrames) {
                
        // You can customize the combustion effect appearance here
        ctx.beginPath();
        ctx.arc(combustionX, combustionY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();

        combustion.frame++;
        } else {
            // Remove the combustion position after it exceeds the frame limit
            combustionPositions.splice(i, 1);
            i--;
        }
    }
    }
}


// Function to update combustion effect
function updateCombustion() {
    if (isCombusting) {
        combustionFrame++;

        // Reset combustion effect after a certain number of frames
        if (combustionFrame >= maxCombustionFrames) {
            isCombusting = false;
            combustionFrame = 0;
        }
    }
}

// Event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Game loop
setInterval(() => {
    updateCanvas();
    updateCombustion();
    applyLastDirection();
}, 10);
