
// points/upgrade variables

let pointsPerClick = 1; // default
let upgradeCost = 100; // initial cost

// point handling

function increasePoints() {
    let points = Number(document.getElementById("points").innerText);
    document.getElementById("points").innerText = points + pointsPerClick;
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
}

function resetPoints() {
    document.getElementById("points").innerText = 0;
    pointsPerClick = 1;
    upgradeCost = 100;

    updateUpgradeButton();
}

// upgrade handling

function upgradeClickPower() {
    let points = Number(document.getElementById("points").innerText);

    if (points >= upgradeCost) {
        document.getElementById("points").innerText = points - upgradeCost // deduction
        pointsPerClick *= 2;
        upgradeCost *= 2;

        updateUpgradeButton();
    } else {
        alert ("not enough points.")
    }
}

function updateUpgradeButton() {
    document.getElementById("upgradeButton").innerText = `x2 click power (${upgradeCost})`;
}