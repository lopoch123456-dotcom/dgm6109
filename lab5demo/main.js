"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    choice = document.getElementById("wingNumber").value;
    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawImage();
}

/* set up the drawing canvas - Be sure not to copy this code from your draft project! */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/*
The function below is called when the user presses the "Draw!" button and is where you will put most of your drawing code. Please follow the instructions in the homework PDF for this step.
*/

function drawImage() {

    let butterflyX = xInput;
    let butterflyY = yInput;

//butterflyX = 110 butterflyY = 60 butterfly OG location

let butterflyBody = drawing.append("rect") // It is Butterfly body
    .attr("x" , butterflyX)
    .attr("y" , butterflyY)
    .attr("width" , 10)
    .attr("height" , 150)
    .attr("fill", "green")

let butterflyLeftTopWing = drawing.append("polyline") // It is Butterfly left top wing
    .attr("points", closedPolygon(
        butterflyX - 30 , butterflyY - 40 , 
        butterflyX , butterflyY + 50 , 
        butterflyX - 90 , butterflyY + 30))
    .attr("fill", "yellow")

let butterflyRightTopWing = drawing.append("polyline") // It is Butterfly right top wing
    .attr("points", closedPolygon(
        butterflyX + 40 , butterflyY - 40 , 
        butterflyX + 10 , butterflyY + 50 , 
        butterflyX + 100 , butterflyY + 30))
    .attr("fill", "yellow")

let butterflyRightLowerWing = drawing.append("polyline") // It is Butterfly right bottom wing
    .attr("points", closedPolygon(
        butterflyX + 80 , butterflyY + 50 , 
        butterflyX + 10 , butterflyY + 50 , 
        butterflyX + 10 , butterflyY + 180))
    .attr("fill", "orange") 

let butterflyLeftLowerWing = drawing.append("polyline") // It is Butterfly left bottom wing
    .attr("points", closedPolygon(
        butterflyX - 70 , butterflyY + 50 , 
        butterflyX , butterflyY + 50 , 
        butterflyX , butterflyY + 180))
    .attr("fill", "orange")

let butterflyLeftEye = drawing.append("circle") // It is Butterfly left eeeeye
    .attr("cx", butterflyX - 5)
    .attr("cy", butterflyY)
    .attr("r", 10)
    .attr("fill", "red")

let butterflyRightEye = drawing.append("circle") // It is Butterfly right eyeeee
    .attr("cx", butterflyX + 15)
    .attr("cy", butterflyY)
    .attr("r", 10)
    .attr("fill", "red")

let butterflyLeftTentacle = drawing.append("line") // It is Butterfly left tentacle
    .attr("x1", butterflyX)
    .attr("y1", butterflyY - 8)
    .attr("x2", butterflyX - 20)
    .attr("y2", butterflyY - 50)
    .attr("stroke", "black")
    .attr("stroke-width" , 2)

let butterflyRightTentacle = drawing.append("line") // It is Butterfly right tentacle
    .attr("x1", butterflyX + 10)
    .attr("y1", butterflyY - 8)
    .attr("x2", butterflyX + 30)
    .attr("y2", butterflyY - 50)
    .attr("stroke", "black")
    .attr("stroke-width" , 2)


    // Step 10: Modify your drawing code to CONDITIONALLY draw part of your drawing based on
    // the choice the user made in your selection menu (stored in variable "choice" above)
if (choice === "2") {

  let butterflyLeftThirdWing = drawing.append("polyline")
    .attr("points", closedPolygon(
      butterflyX , butterflyY + 60,
      butterflyX - 40, butterflyY + 70,
      butterflyX - 40, butterflyY + 200
    ))
    .attr("fill", "pink")

  let butterflyRightThirdWing = drawing.append("polyline")
    .attr("points", closedPolygon(
      butterflyX + 10 , butterflyY + 60,
      butterflyX + 50, butterflyY + 70,
      butterflyX + 40, butterflyY + 200
    ))
    .attr("fill", "pink")
}// if user wanna 6 wings, will add 2 more wings

function closedPolygon(x1, y1, x2, y2, x3, y3) {
  return x1 + "," + y1 + " " +
         x2 + "," + y2 + " " +
         x3 + "," + y3 + " " +
         x1 + "," + y1; // closed polygon
}

    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
