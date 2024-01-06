var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var angleDisplay = document.getElementById("angleDisplay");
var angleForm = document.getElementById("angleForm");
var correctAngle;

// iresult div

let vResult = document.createElement("div");
vResult.id = "iResult";
angleForm.appendChild(vResult);

function clearCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function drawRandomAngle() {
    // Array of angles
    var angles = [
        [64, 186, 200, 300, 350, 300],  // 140 degree
        [89, 168, 200, 300, 350, 300],  // 130 degree
        [114, 152, 200, 300, 350, 300], // 120 degree
        [170, 130, 200, 300, 370, 300], // 100 degree
        [200, 130, 200, 300, 370, 300]  // 90 degree
        [342, 130, 200, 300, 375, 300], // 50 degree
        [402, 130, 200, 300, 375, 300], // 40 degree
    ];

    // Generate a random index
    var randomIndex = Math.floor(Math.random() * angles.length);

    // Clear the canvas before drawing
    clearCanvas();

    // Draw the randomly selected angle
    ctx.beginPath();
    ctx.moveTo(angles[randomIndex][0], angles[randomIndex][1]);
    ctx.lineTo(angles[randomIndex][2], angles[randomIndex][3]);
    ctx.lineTo(angles[randomIndex][4], angles[randomIndex][5]);
    ctx.closePath();
    ctx.stroke();

    // Calculate and display angles
    var angleB = calculateAngle(angles[randomIndex][4], angles[randomIndex][5], angles[randomIndex][0], angles[randomIndex][1], angles[randomIndex][2], angles[randomIndex][3]);

    // Display angles uncomment it for display angle of triangle

    // ctx.font = '14px Arial';
    // ctx.fillStyle = 'black';
    // ctx.fillText('B: ' + Math.floor(angleB.toFixed(2)) + '°', angles[randomIndex][2] + 10, angles[randomIndex][3] - 10);

    // Store the correct angle for later comparison

    correctAngle = angleB;

    // Assign random values to radio button labels

    var labels = document.querySelectorAll('span[id^="label"]');
    labels.forEach(function (label) {
        label.textContent = Math.floor(Math.random() * 180) + '°';
    });

    // Set one label to the correct angle

    var correctLabelIndex = Math.floor(Math.random() * 3);
    labels[correctLabelIndex].textContent = Math.floor(correctAngle.toFixed(2)) + '°';
};

function calculateAngle(x1, y1, x2, y2, x3, y3) {
    var a = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
    var b = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
    var c = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI);
};

function checkAnswer() {
    var selectedOption = document.querySelector('input[name="angleOption"]:checked');
    if (selectedOption) {
        var selectedValue = parseInt(selectedOption.parentElement.querySelector('span').textContent);
        if (selectedValue === Math.floor(correctAngle.toFixed(2))) {
            vResult.innerHTML = "Correct";
            vResult.setAttribute("class", 'tickcss');
            vBtn2.focus();
        } else {
            vResult.innerHTML = "Wrong";
            vResult.setAttribute("class", 'crosscss');
            vBtn2.focus();
        };
    } else {
        alert("Please select an option.");
    };
};

// reload button

function refre() {
    location.reload();
};

// Initial draw

drawRandomAngle();

// protractor code

let vDeg = 0

const vProtractor = document.getElementById("iProtractor");

document.addEventListener("contextmenu", function (a) {
    a.preventDefault();

    if (a.button === 2) {

        vProtractor.innerHTML = ""
        const vImage = document.createElement("img");
        vImage.src = "images/protractor-removebg-preview.png"
        vImage.style.position = "absolute"
        vProtractor.appendChild(vImage);

        document.addEventListener("mousemove", function (b) {
            vImage.style.left = b.clientX - 240 + "px"
            vImage.style.top = b.clientY - 245 + "px"
        });

        document.addEventListener("mouseup", function (c) {
            if (c.button === 0) {
                vProtractor.removeChild(vImage);
            };
        });

        document.addEventListener("wheel", function (d) {
            if (d.deltaY > 0) {
                vDeg = vDeg + 1;
                vImage.style.transform = "rotate(" + vDeg + "deg)"
            };

            if (d.deltaY < 0) {
                vDeg = vDeg - 1;
                vImage.style.transform = "rotate(" + vDeg + "deg)"
            };
        });

    };

});