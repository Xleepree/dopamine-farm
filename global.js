
// main variables

let pointsPerClick = 1; // default click power
let upgradeCost = 100; // initial cost
let clickCount = 0; // cps meter idle
let cps = 0 // clicks per second

// point handling

function increasePoints() {
    let points = Number(document.getElementById("points").innerText);
    document.getElementById("points").innerText = points + pointsPerClick;

    trackCPS();
}

function savePoints() {
    let points = document.getElementById("points").innerText;
    // stuffs to save
    localStorage.setItem("points", points);
    localStorage.setItem("pointsPerClick", pointsPerClick);
    localStorage.setItem("upgradeCost", upgradeCost);
}

function loadPoints() {
    let savedPoints = localStorage.getItem('points');
    document.getElementById("points").innerText = savedPoints;
    
    pointsPerClick = Number(localStorage.getItem("pointsPerClick"));
    upgradeCost = Number(localStorage.getItem("upgradeCost"));

    updateUpgradeButton();
    updateClickPowerDisplay();
}

function resetPoints() {
    let confirmReset = confirm("are you sure?");
    if (confirmReset == true) {
        document.getElementById("points").innerText = 0;
        pointsPerClick = 1;
        upgradeCost = 100;

        updateUpgradeButton();
        updateClickPowerDisplay();
    }
}

// upgrade handling

function upgradeClickPower() {
    let points = Number(document.getElementById("points").innerText);

    if (points >= upgradeCost) {
        document.getElementById("points").innerText = points - upgradeCost // deduction
        pointsPerClick *= 2;
        upgradeCost *= 2;

        updateUpgradeButton();
        updateClickPowerDisplay();
    } else {
        alert("not enough points.")
    }
}

function updateUpgradeButton() {
    document.getElementById("upgradeButton").innerText = `x2 click power (${upgradeCost})`;
}

function updateClickPowerDisplay() {
    document.getElementById("clickPowerDisplay").innerText = `click power: ${pointsPerClick} points`;
}

// cps meter handling

function trackCPS() {
    clickCount++;
}

function updateCPS() {
    cps = clickCount;
    clickCount = 0;
    document.getElementById("cpsMeter").innerText = `CPS: ${cps} (clicks per second)`;
}

setInterval(updateCPS, 1000); // 1 second loop