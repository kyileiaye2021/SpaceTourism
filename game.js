
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Shapeship
let spaceshipX = canvas.width / 2;
let spaceshipY = canvas.height / 2;
const spaceshipWidth = 30;
const spaceshipHeight = 30;

const planetSpeed = 2; // Adjust the speed as needed

//Planet
let planetCircleX = canvas.width - 50;
let planetCircleY = canvas.height/2;
const planetCircleRadius = 50;

let planetCircleA = canvas.width - 200;
let planetCircleB = canvas.height/3;


// Movement variables
let dx = 0;
let dy = 0;

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
    spaceshipImg.src = "rocket-th.png";
    ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight);
}

function updateCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the circle
    
    drawCircle(planetCircleA, planetCircleB, 70, "#ffcc00");
    drawSpaceship();
    checkCollision();

    // Update the spaceship's position (you can still use dx and dy for movement)
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

    const rightEdge = planetCircleA + planetCircleRadius;
    const leftEdge = planetCircleA - planetCircleRadius;
    const topEdge = planetCircleB + planetCircleRadius;
    const bottomEdge = planetCircleB - planetCircleRadius;
  
    


    // Check if the distance is less than the sum of the spaceship's and planet's radii
    if ((spaceshipX > leftEdge && spaceshipX < rightEdge) && (spaceshipY < topEdge && spaceshipY > bottomEdge)) {
        // Collision detected! Navigate to a new page
        window.location.href = "planetwindow.html";
    }
}

// Function to handle keyboard input
function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
        dx = -2;
    } else if (event.key === "ArrowRight") {
        dx = 2;
    } else if (event.key === "ArrowUp") {
        dy = -2;
    } else if (event.key === "ArrowDown") {
        dy = 2;
    }
}

function handleKeyUp(event) {
    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown"
    ) {
  //dx = 0;
  //dy = 0;
    }
}

//Calculate distance between two circles
var selectedPlanets = [];
// Event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
const form = document.querySelector('form');
var arr = [];


            

// Game loop
setInterval(updateCanvas, 10);