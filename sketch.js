// Define the input sequence
let inputSeq = [
  { temperature: 25, humidity: 60 },
  { temperature: 24, humidity: 62 },
  { temperature: 23, humidity: 64 },
  { temperature: 22, humidity: 65 },
  { temperature: 21, humidity: 68 },
  { temperature: 20, humidity: 70 },
  { temperature: 20, humidity: 72 },
  { temperature: 21, humidity: 75 },
  { temperature: 22, humidity: 78 },
  { temperature: 23, humidity: 80 },
  { temperature: 24, humidity: 82 },
  { temperature: 25, humidity: 84 },
  { temperature: 26, humidity: 85 },
  { temperature: 27, humidity: 87 },
  { temperature: 28, humidity: 88 }
];

// Define the window size and stride
let windowSize = 3;
let stride = 1;

// Define the current window index
let currentWindowIndex = 0;

function setup() {
  createCanvas(800, 600);
  textSize(16);
  textAlign(CENTER, CENTER);
  sizeSlider = createSlider(0, 5, 3, 1);
  sizeSlider.position(510, 355);
  strideSlider = createSlider(0, 3, 1, 1);
  strideSlider.position(510, 390)
}

function draw() {
  windowSize = sizeSlider.value();
  stride = strideSlider.value();
  background(255);
  
  // Draw the input sequence
  fill(0);
  textStyle(BOLD);
  text("Input Sequence", 200, 30);
  textStyle(NORMAL);
  text("Window size:", 450, 365)
  text("Window stride:", 450, 400)
  
  // Draw the header of the table
  let tablePosX = 20, tablePosY = 80, cellWidth = 110, cellHeight = 30;
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(tablePosX, tablePosY - cellHeight, cellWidth, cellHeight);
  rect(tablePosX + cellWidth, tablePosY - cellHeight, cellWidth, cellHeight);
  rect(tablePosX + 2 * cellWidth, tablePosY - cellHeight, cellWidth, cellHeight);
  fill(0);
  noStroke();
  text("Index", tablePosX + cellWidth / 2, tablePosY - cellHeight / 2);
  text("Temperature", tablePosX + cellWidth * 1.5, tablePosY - cellHeight / 2);
  text("Humidity", tablePosX + cellWidth * 2.5, tablePosY - cellHeight / 2);
  
  // Draw a rect for the table
  stroke(0);
  strokeWeight(1);
  noFill();
  rect(tablePosX, tablePosY, cellWidth * 3, cellHeight * inputSeq.length);
  
  // Make the rest of the cells and display the values
  for (let i = 0; i < inputSeq.length; i++) {
    let cellX = tablePosX;
    let cellY = tablePosY + cellHeight * i;
    if (i >= currentWindowIndex && i < currentWindowIndex + windowSize) {
      fill(200, 200, 255);
      rect(cellX, cellY, cellWidth, cellHeight);
      rect(cellX + cellWidth, cellY, cellWidth, cellHeight);
      rect(cellX + 2 * cellWidth, cellY, cellWidth, cellHeight);
    } else if (i == currentWindowIndex + windowSize) {
      fill(255, 0, 0);
      rect(cellX + 2 * cellWidth, cellY, cellWidth, cellHeight);
    }
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(cellX, cellY, cellWidth, cellHeight);
    rect(cellX + cellWidth, cellY, cellWidth, cellHeight);
    rect(cellX + 2*cellWidth, cellY, cellWidth, cellHeight);
    fill(0);
    noStroke();
    text(i, cellX + cellWidth / 2, cellY + cellHeight / 2);
    text(inputSeq[i]['temperature'], cellX + cellWidth * 1.5, cellY + cellHeight / 2);
    text(inputSeq[i]['humidity'], cellX + cellWidth * 2.5, cellY + cellHeight / 2);
  }

  // Draw the current window
  fill(200, 200, 255);
rect(400, 60, 370, 150);
fill(0);
  textStyle(BOLD);
text("Current Window", 550, 45);
  textStyle(NORMAL);
  tablePosX = 420, tablePosY = 100, cellWidth = 110, cellHeight = 30;
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(tablePosX, tablePosY - cellHeight, cellWidth, cellHeight);
  rect(tablePosX + cellWidth, tablePosY - cellHeight, cellWidth, cellHeight);
  rect(tablePosX + 2 * cellWidth, tablePosY - cellHeight, cellWidth, cellHeight);
  fill(0);
  noStroke();
  text("Index", tablePosX + cellWidth / 2, tablePosY - cellHeight / 2);
  text("Temperature", tablePosX + cellWidth * 1.5, tablePosY - cellHeight / 2);
  text("Humidity", tablePosX + cellWidth * 2.5, tablePosY - cellHeight / 2);
let outputStartIndex = currentWindowIndex * stride;
let outputEndIndex = outputStartIndex + windowSize;
let outputValues = inputSeq.slice(outputStartIndex, outputEndIndex);



// Draw table rows
for (let i = 0; i < outputValues.length; i++) {
  let cellX = tablePosX;
    let cellY = tablePosY + cellHeight * i;
  
  const val = outputValues[i];
  const rowY = 120 + i * 20;
    if (i >= currentWindowIndex && i < currentWindowIndex + windowSize) {
      fill(200, 200, 255);
      rect(cellX, cellY, cellWidth, cellHeight);
      rect(cellX + cellWidth, cellY, cellWidth, cellHeight);
      rect(cellX + 2 * cellWidth, cellY, cellWidth, cellHeight);
    } else if (i == currentWindowIndex + windowSize) {
      fill(255, 0, 0);
      rect(cellX + 2 * cellWidth, cellY, cellWidth, cellHeight);
    }
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(cellX, cellY, cellWidth, cellHeight);
    rect(cellX + cellWidth, cellY, cellWidth, cellHeight);
    rect(cellX + 2*cellWidth, cellY, cellWidth, cellHeight);
    fill(0);
    noStroke();
    text(i + outputStartIndex, cellX + cellWidth / 2, cellY + cellHeight / 2);
    text(val.temperature, cellX + cellWidth * 1.5, cellY + cellHeight / 2);
    text(val.humidity, cellX + cellWidth * 2.5, cellY + cellHeight / 2);
}

// Draw the output value for the current window
let outputIndex = outputEndIndex;
let outputValue = inputSeq[outputIndex]['humidity'];
fill(255, 0, 0);
rect(485, 250, 200, 40);
fill(0);
  textStyle(BOLD);
text("Output for Current Window", 585, 240);
  textStyle(NORMAL);
text(outputValue, 585, 265);
}

function mousePressed() {
  // Advance to the next window
  if (currentWindowIndex < inputSeq.length - windowSize) {
    currentWindowIndex++;
  }
}