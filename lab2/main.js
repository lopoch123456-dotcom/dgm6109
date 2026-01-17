"use strict"

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

/* Draw a border that matches the maximum drawing area for this assignment.
    Assign the border to a variable so that:
        (1) We know what the purpose of the shape is, and
        (2) We will have the ability to change it later (in a future assignment)
*/
let border = drawing.append("rect") // I LOVE PLAYBOI CARTI
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

// DownBlow is Moses Drawing

let butterflyX = 110 // butterfly location
let butterflyY = 60

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
        150 , 20 , 
        120 , 110 , 
        210 , 90))
    .attr("fill", "yellow")

let butterflyRightLowerWing = drawing.append("polyline") // It is Butterfly right bottom wing
    .attr("points", closedPolygon(
        190 , 110 , 
        120 , 110 , 
        120 , 240))
    .attr("fill", "red") 

let butterflyLeftLowerWing = drawing.append("polyline") // It is Butterfly left bottom wing
    .attr("points", closedPolygon(
        40 , 110 , 
        110 , 110 , 
        110 , 240))
    .attr("fill", "red")

let butterflyLeftEye = drawing.append("circle") // It is Butterfly left eeeeye
    .attr("cx", 105)
    .attr("cy", 60)
    .attr("r", 10)
    .attr("fill", "black")

let butterflyRightEye = drawing.append("circle") // It is Butterfly right eyeeee
    .attr("cx", 125)
    .attr("cy", 60)
    .attr("r", 10)
    .attr("fill", "black")

let butterflyLeftTentacle = drawing.append("line") // It is Butterfly left tentacle
    .attr("x1", 110)
    .attr("y1", 55)
    .attr("x2", 90)
    .attr("y2", 10)
    .attr("stroke", "black")
    .attr("stroke-width" , 2)

let butterflyRightTentacle = drawing.append("line") // It is Butterfly right tentacle
    .attr("x1", 120)
    .attr("y1", 55)
    .attr("x2", 140)
    .attr("y2", 10)
    .attr("stroke", "black")
    .attr("stroke-width" , 2)