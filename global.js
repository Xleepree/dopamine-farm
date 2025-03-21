
// variables

let pointsPerClick = 1; // default click power
let steroidsPrice = 100; // initial cost
let clickCount = 0; // cps meter idle
let cps = 0 // clicks per second
let capybaraExists = 0;
let monkeySlaveryActive = false;
let monkeyPower = 1;
let monkeyCost = 500;


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
    localStorage.setItem("steroidsPrice", steroidsPrice);
    localStorage.setItem("capybara", capybaraExists);
    localStorage.setItem("slave", monkeySlaveryActive);
}

function loadPoints() {
    let savedPoints = localStorage.getItem('points');
    document.getElementById("points").innerText = savedPoints;
    
    pointsPerClick = Number(localStorage.getItem("pointsPerClick"));
    steroidsPrice = Number(localStorage.getItem("steroidsPrice"));
    capybaraExists = localStorage.getItem("capybara");
    monkeySlaveryActive = localStorage.getItem("slave") === "true";
    if (capybaraExists == 1) {
        revealCapybara();
    } else {
        hideCapybara();
    }

    updateSteroidsPrice();
    updateClickPowerDisplay();
}

function resetPoints() {
    let confirmReset = confirm("are you sure?");
    if (confirmReset == true) {
        document.getElementById("points").innerText = 0;
        pointsPerClick = 1;
        steroidsPrice = 100;
        capybaraExists = 0;
        monkeySlaveryActive = false;
        clearInterval(monkeyInterval);
        monkeyInterval = null;

        updateSteroidsPrice();
        updateClickPowerDisplay();
        hideCapybara();
    }
}

// upgrade handling

function injectSteroids() {
    let points = Number(document.getElementById("points").innerText);

    if (points >= steroidsPrice) {
        document.getElementById("points").innerText = points - steroidsPrice // deduction
        pointsPerClick *= 2;
        steroidsPrice *= 2;

        updateSteroidsPrice();
        updateClickPowerDisplay();
    } else {
        alert("not enough points.")
    }
}

function updateSteroidsPrice() {
    document.getElementById("steroidsPrice").innerText = `${steroidsPrice} points`;
}

function updateClickPowerDisplay() {
    document.getElementById("clickPowerDisplay").innerText = `click power: ${pointsPerClick} points`;
}

function revealCapybara() {
    capybaraExists = 1;
    document.getElementById("capybara").style.opacity = "0.5";
    document.getElementById("capybaraFren").style.backgroundColor = "lightgray";
    document.getElementById("capybaraFren").onclick = "purchased.";
}

function hideCapybara() {
    capybaraExists = 0;
    document.getElementById("capybara").style.opacity = "0";
    document.getElementById("capybaraFren").style.backgroundColor = "white";
    document.getElementById("capybaraFren").onclick = revealCapybara;
}

    // slave

    function enslaveMonkey() {
        let points = Number(document.getElementById("points").innerText);

        if (points >= monkeyCost) {
            document.getElementById("points").innerText = points - monkeyCost;
            monkeySlaveryActive = true;
            startMonkeyWork();
        } else {
            alert("not enough points.")
        }
    }

    function startMonkeyWork() {
        if (!monkeySlaveryActive) return;
        document.getElementById("monkeySlavery").style.backgroundColor = "lightgray";
        document.getElementById("monkeySlavery").onclick = "purchased.";

        monkeyInterval = setInterval(() => {
            let points = Number(document.getElementById("points").innerText);
            document.getElementById("points").innerText = points + monkeyPower;
        }, 2000)
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