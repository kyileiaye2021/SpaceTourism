var num = 0;
export function changeOnlyPlanet(radius, page, theImage)
{

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
//let planetCircleX = canvas.width - 50;
//let planetCircleY = canvas.height / 2;
//const planetCircleRadius = 50;

let planetCircleA = canvas.width - 300;
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
function drawCircle(circX, circY) {
    //ctx.beginPath();
   // ctx.arc(circX, circY, radius, 0, Math.PI * 2);
    //ctx.fillStyle = colord;
    //ctx.fill();
    //ctx.closePath();
    const planetImg = new Image();
    planetImg.src = theImage;
    
    // Calculate the transformation origin
    var originXPlanet = circX;
    var originYPlanet = circY;
    
    // Save the current canvas state
    ctx.save();
    
    // Translate the context to the origin
    ctx.translate(originXPlanet, originYPlanet);
    
    // Rotate the context based on the angle of rotation
    //ctx.rotate(rotationAngle + Math.PI/4); // Corrected
    
    // Draw the spaceship centered at the transformed origin
    ctx.drawImage(planetImg, -radius / 2, -radius / 2, radius, radius);
    
    // Restore the canvas state
    ctx.restore();
}

function increaseNum() {
    // Check if 'num' is stored in local storage
    if (localStorage.getItem('num')) {
        // If it is, parse the value and increase it by 1
        let num = parseInt(localStorage.getItem('num'));
        num += 1;
        localStorage.setItem('num', num);
    } else {
        // If it's not, initialize 'num' to 1
        localStorage.setItem('num', 1);
    }
    console.log(num);
}

function drawSpaceship() {
    const spaceshipImg = new Image();
    spaceshipImg.src = "rocket-th.png";
    
    // Calculate the transformation origin
    const originX = spaceshipX + (spaceshipWidth / 2);
    const originY = spaceshipY + (spaceshipHeight / 2);
    
    // Save the current canvas state
    ctx.save();
    
    // Translate the context to the origin
    ctx.translate(originX, originY);
    
    // Rotate the context based on the angle of rotation
    ctx.rotate(rotationAngle + Math.PI/4); // Corrected
    
    // Draw the spaceship centered at the transformed origin
    ctx.drawImage(spaceshipImg, -spaceshipWidth / 2, -spaceshipHeight / 2, spaceshipWidth, spaceshipHeight);
    
    // Restore the canvas state
    ctx.restore();
}

function updateCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   

    // Draw the circle
    drawCircle(planetCircleA, planetCircleB);
    
    // Calculate the angle of rotation based on the direction
    if (lastDirectionX !== 0 || lastDirectionY !== 0) {
        rotationAngle = Math.atan2(lastDirectionY, lastDirectionX) + 90;
    } else {
        rotationAngle = 0; // Reset rotation angle when not moving
    }
    
    drawSpaceship();
    checkCollision();

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

    //update the planet's position
   // planetCircleA -= dx;

    // Keep the spaceship within the canvas boundaries
    if (spaceshipX < 0) {
        dx = 0;
        window.location.href = page;
    }
    if (spaceshipX + spaceshipWidth > canvas.width) {
        //spaceshipX = canvas.width - spaceshipWidth;
        window.location.href = page;
    }
    if (spaceshipY < 0) {
        spaceshipY = 0;
    }
    if (spaceshipY + spaceshipHeight > canvas.height) {
        spaceshipY = canvas.height - spaceshipHeight;
    }
    
}
function openModal() {
    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
    
}

// Event listener for close button
document.querySelector(".close").addEventListener("click", closeModal);


    
function checkCollision() {
    // Calculate the distance between the centers of the spaceship and the planet
    const distance = Math.sqrt(
        Math.pow(spaceshipX + spaceshipWidth / 2 - planetCircleA, 2) +
        Math.pow(spaceshipY + spaceshipHeight / 2 - planetCircleB, 2)
    );

    // Check if the distance is less than the sum of the spaceship's and planet's radii
    if (distance < spaceshipWidth / 2 + radius) {
        // Collision detected! Navigate to a new page
       // increaseNum();
        openModal();
    }
}

// Function to handle keyboard input
const keys = {}; // Object to track key states

function handleKeyDown(event) {
    keys[event.key] = true;
    calculateVelocity();
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

// Event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Game loop
setInterval(() => {
    updateCanvas();
    applyLastDirection();
}, 10);
}