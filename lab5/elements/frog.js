"use strict";

/**
 * Draws a frog character with customizable mouth states.
 * @param {Object} canvas - The D3 selection of the SVG area to draw into.
 * @param {number} x - The horizontal origin point (top-left of body).
 * @param {number} y - The vertical origin point (top-left of body).
 * @param {boolean} showOrigin - Whether to display a pink marker at the (x,y) origin.
 * @returns {Object} The canvas object.
 */
function frog(canvas, x, y, showOrigin) {
    
    // Side body bumps (the dark green semi-circles)
    canvas.append("circle")
        .attr("cx", x + 5)
        .attr("cy", y + 110)
        .attr("r", 40)
        .attr("fill", "green");

    canvas.append("circle")
        .attr("cx", x + 145)
        .attr("cy", y + 110)
        .attr("r", 40)
        .attr("fill", "green");

    // Main Body (The light green rectangle)
    canvas.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", 150)
        .attr("height", 150)
        .attr("fill", "#76C439");

    // Eyes
    // Left Eye
    canvas.append("circle")
        .attr("cx", x + 25)
        .attr("cy", y)
        .attr("r", 30)
        .attr("fill", "#FF9248");
    canvas.append("circle")
        .attr("cx", x + 25)
        .attr("cy", y)
        .attr("r", 10)
        .attr("fill", "black");

    // Right Eye
    canvas.append("circle")
        .attr("cx", x + 125)
        .attr("cy", y)
        .attr("r", 30)
        .attr("fill", "#FF9248");
    canvas.append("circle")
        .attr("cx", x + 125)
        .attr("cy", y)
        .attr("r", 10)
        .attr("fill", "black");

    // Nostrils
    canvas.append("circle")
        .attr("cx", x + 70)
        .attr("cy", y + 30)
        .attr("r", 4)
        .attr("fill", "black");
    canvas.append("circle")
        .attr("cx", x + 100)
        .attr("cy", y + 30)
        .attr("r", 4)
        .attr("fill", "black");

    // Inner Legs
    canvas.append("rect")
        .attr("x", x + 35)
        .attr("y", y + 90)
        .attr("width", 15)
        .attr("height", 60)
        .attr("fill", "#1B9560");
    canvas.append("rect")
        .attr("x", x + 100)
        .attr("y", y + 90)
        .attr("width", 15)
        .attr("height", 60)
        .attr("fill", "#1B9560");

    // Feet
    let feetPositions = [20, 45, 105, 130];
    feetPositions.forEach(footX => {
        canvas.append("circle")
            .attr("cx", x + footX)
            .attr("cy", y + 155)
            .attr("r", 8)
            .attr("fill", "#998800");
    });

    // Defaulting to mouthOpen for the standard function call 
    canvas.append("ellipse")
        .attr("cx", x + 75)
        .attr("cy", y + 60)
        .attr("rx", 20)
        .attr("ry", 15)
        .attr("fill", "black");

    canvas.append("ellipse")
        .attr("cx", x + 75)
        .attr("cy", y + 65)
        .attr("rx", 10)
        .attr("ry", 8)
        .attr("fill", "red");

    // Conditionally show origin
    if (showOrigin) {
        canvas.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 3)
            .attr("fill", "deeppink");
    }

    return canvas;
}