"use strict"

/* Configuration variables: drawing */
let svgWidth = 600;
let svgHeight = 400;
let margin = 25;

/* Resize  div to match width of visualization. */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw canvas border */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw margin border. */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

let dataset = [
    { amount: 72.75, satisfaction: 4 },
    { amount: 31.85, satisfaction: 3 },
    { amount: 10.15, satisfaction: 3 }, 
    { amount: 96.22, satisfaction: 5 },
    { amount: 0.96, satisfaction: 2 }, 
    { amount: 9.99, satisfaction: 3 },
    { amount: 7.59, satisfaction: 4 }, 
    { amount: 33.59, satisfaction: 5 },
    { amount: 24.99, satisfaction: 3 }, 
    { amount: 38.39, satisfaction: 3 },
    { amount: 16.07, satisfaction: 2 }, 
    { amount: 110.33, satisfaction: 5 },
    { amount: 1.1, satisfaction: 2 }, 
    { amount: 10.0, satisfaction: 5 },
    { amount: 63.31, satisfaction: 5 }, 
    { amount: 10.64, satisfaction: 4 },
    { amount: 0.63, satisfaction: 2 }, 
    { amount: 40.0, satisfaction: 5 },
    { amount: 0.63, satisfaction: 2 }, 
    { amount: 0.11, satisfaction: 2 },
    { amount: 68.06, satisfaction: 4 }, 
    { amount: 49.54, satisfaction: 3 },
    { amount: 29.14, satisfaction: 4 }, 
    { amount: 30.63, satisfaction: 3 },
    { amount: 9.68, satisfaction: 3 }, 
    { amount: 45.28, satisfaction: 5 },
    { amount: 6.0, satisfaction: 4 }, 
    { amount: 11.62, satisfaction: 3 },
    { amount: 9.96, satisfaction: 3 }, 
    { amount: 25.91, satisfaction: 3 },
    { amount: 12.5, satisfaction: 4 }
]; // data form chart

let xScale = d3.scaleLinear()
    .domain([0, 115]) // Max amount is about 110.33
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, 5]) // Satisfaction scale is 0-5
    .range([svgHeight - margin, margin]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 6)
    .attr("opacity", 0.6) 
    .attr("cx", function (value, index) {
        return xScale(value.amount);
    })
    .attr("cy", function (value, index) {
        return yScale(value.satisfaction); 
    }); //Bind dot property and amount

// circles.attr("r", 10)
//     .attr("cx", function (value) {
//         return value.x;
//     })
//     .attr("cy", function (value) {
//         return value.y;
//     })

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("Transaction Amount (CAD)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Satisfaction Level (0=Low, 5=High)")
    .attr("transform", "rotate(-90)");

/**** label key graph coordinates ****/
let xHighLabel = svg.append("text")
    .attr("x", xScale(115))
    .attr("y", svgHeight - margin + 15)
    .attr("text-anchor", "middle")
    .text("115");

let yHighLabel = svg.append("text")
    .attr("x", margin - 5)
    .attr("y", yScale(5))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text("5");

let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - margin + 15)
    .attr("text-anchor", "middle")
    .text("0");
