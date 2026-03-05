"use strict"

/* Configuration variables: drawing */
let svgWidth = 800;
let svgHeight = 600;
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

// /* Draw margin border. */
// svg.append("rect")
//     .attr("fill", "none")
//     .attr("stroke", "black")
//     .attr("stroke-dasharray", "5")
//     .attr("x", margin)
//     .attr("y", margin)
//     .attr("width", svgWidth - margin * 2)
//     .attr("height", svgHeight - margin * 2);

let dataset = [
    { amount: 72.75, satisfaction: 4, category: "Survival", decision: 2 }, // Habit/Plan
    { amount: 31.85, satisfaction: 3, category: "Survival/Spark", decision: 2 }, // Habit
    { amount: 10.15, satisfaction: 3, category: "Survival/Spark", decision: 2 },
    { amount: 96.22, satisfaction: 5, category: "Survival", decision: 3 }, // Plan
    { amount: 0.96, satisfaction: 2, category: "Survival", decision: 2 },
    { amount: 9.99, satisfaction: 3, category: "Survival/Spark", decision: 2 },
    { amount: 7.59, satisfaction: 4, category: "Spark", decision: 1 }, // Instant
    { amount: 33.59, satisfaction: 5, category: "Spark", decision: 1 },
    { amount: 24.99, satisfaction: 3, category: "Survival/Spark", decision: 2 },
    { amount: 38.39, satisfaction: 3, category: "Survival/Spark", decision: 2 },
    { amount: 16.07, satisfaction: 2, category: "Survival/Spark", decision: 1 },
    { amount: 110.33, satisfaction: 5, category: "Survival", decision: 3 },
    { amount: 1.1, satisfaction: 2, category: "Survival", decision: 2 },
    { amount: 10.0, satisfaction: 5, category: "Survival", decision: 3 },
    { amount: 63.31, satisfaction: 5, category: "Survival", decision: 3 },
    { amount: 10.64, satisfaction: 4, category: "Survival", decision: 3 },
    { amount: 0.63, satisfaction: 2, category: "Survival", decision: 2 },
    { amount: 40.0, satisfaction: 5, category: "Survival", decision: 2 },
    { amount: 68.06, satisfaction: 4, category: "Spark", decision: 1 },
    { amount: 49.54, satisfaction: 3, category: "Survival/Spark", decision: 2 },
    { amount: 29.14, satisfaction: 4, category: "Spark", decision: 1 },
    { amount: 30.63, satisfaction: 3, category: "Survival/Spark", decision: 2 },
    { amount: 9.68, satisfaction: 3, category: "Survival/Spark", decision: 1 },
    { amount: 45.28, satisfaction: 5, category: "Survival", decision: 3 },
    { amount: 6.0, satisfaction: 4, category: "Spark", decision: 1 },
    { amount: 11.62, satisfaction: 3, category: "Survival/Spark", decision: 2 },
    { amount: 9.96, satisfaction: 3, category: "Survival/Spark", decision: 2 },
    { amount: 25.91, satisfaction: 3, category: "Survival/Spark", decision: 2 }
]; // data form chart decison window 1:Instant 2:Habit 3:Plan

dataset.sort(function(a, b) {
    return b.decision - a.decision;
}); //Array sort. with no =>.

let xScale = d3.scaleLinear()
    .domain([0,155]) // change it to decisiopn window
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, 5]) // Satisfaction scale is 0-5
    .range([svgHeight - margin, margin]);

let rScale = d3.scaleSqrt() // Square root scale
    .domain([1 , 3]) 
    .range([5, 20]); //range for visibility

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("fill", function(d) { // I ask AI function(d) is so much easyer then function (value, index) to write
    if (d.category == "Survival") return "#6fa74e";
    else if (d.category == "Spark") return "#f28e2c";
    else return "#e15759"; // For "Survival/Spark" mixed category
});

circles.attr("r", function(d) {
        return rScale(d.decision); 
    })
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

/**** Draw XY Axis line ****/
// Draw Y Axis Line
svg.append("line")
    .attr("x1", margin)
    .attr("y1", yScale(0))
    .attr("x2", margin)
    .attr("y2", yScale(5)) // Max satisfaction
    .attr("stroke", "black")
    .attr("stroke-width", 2);

// Draw X Axis Line 
svg.append("line")
    .attr("x1", xScale(0)) // Min decision window
    .attr("x2", xScale(155)) // Max decision window
    .attr("y1", yScale(0))
    .attr("y2", yScale(0))
    .attr("stroke", "black")
    .attr("stroke-width", 2);

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 2) + 10 )
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
const xTicks = d3.range(0, 156); // `const` is used to declare a constant, just like `let`. The AI ​​recommends I use this instead of repeatedly using array.

let xFilteredTicks = xTicks.filter(function(d) {
    return d % 20 == 0; 
}); // use filter to only keep 20 ,40 ,like 20's Times number.

svg.selectAll(".x-tick-label")
    .data(xFilteredTicks) // recall the filter funtion above
    .enter()
    .append("text")
    .attr("class", "x-tick-label") // new class for fliter xticks filter like class said we always need new class.(i kind dont know why, but i keep it in mind)
    .attr("x", d => xScale(d))
    .attr("y", svgHeight - margin + 12)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text(d => d);

let yHighLabel = svg.append("text")
    .attr("x", margin - 5)
    .attr("y", yScale(5))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")

let yTicks = [0, 1, 2, 3, 4, 5];// y ticks from 0 - 5

svg.selectAll(".yTickLabels")
    .data(yTicks)
    .join("text")
    .attr("x", margin - 3) 
    .attr("y", function(value) {
         return yScale(value); 
        }) // bouns use loop to mark
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text(function(d) { 
        return d; 
    })
    .style("font-size", "12px"); // bouns Use .style()

let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - margin + 15)
    .attr("text-anchor", "middle")
    .text("0");

// Color Key and size key Container
let colorKeyX = 650;
let colorKeyY = 500;
let sizeKeyX = 650;
let sizeKeyY = 360; // bouns Lay out all elements of one or both of my keys

svg.append("text")
    .attr("x", colorKeyX)
    .attr("y", colorKeyY - 15)
    .text("Spending Category")
    .style("font-weight", "bold");

svg.append("rect")
    .attr("x", colorKeyX - 10)
    .attr("y", colorKeyY - 30)
    .attr("width", 160)
    .attr("height", 90)
    .attr("fill", "none")
    .attr("stroke", "black");

let colorData = [
    { label: "Survival", color: "#3a9c63" },
    { label: "Spark", color: "#f28e2c" },
    { label: "Survival/Spark", color: "#e15759" }
];

svg.selectAll(".colorDots")
    .data(colorData)
    .join("circle")
    .attr("cx", colorKeyX + 15)
    .attr("cy", function(d, i) { return colorKeyY + (i * 25); })
    .attr("r", 6)
    .attr("fill", function(d) { return d.color; });

svg.selectAll(".colorLabels")
    .data(colorData)
    .join("text")
    .attr("x", colorKeyX + 30)
    .attr("y", function(d, i) { return colorKeyY + (i * 25) + 5; })
    .text(function(d) { return d.label; })
    .style("font-size", "12px");

// Sizekey  Container
svg.append("text")
    .attr("x", sizeKeyX)
    .attr("y", sizeKeyY - 15)
    .text("Decision Windon") 
    .style("font-weight", "bold");

svg.append("rect")
    .attr("x", sizeKeyX - 10)
    .attr("y", sizeKeyY - 30)
    .attr("width", 160)
    .attr("height", 140)
    .attr("fill", "none")
    .attr("stroke", "black"); // creat box aorund size key

svg.append("circle")
    .attr("cx", sizeKeyX + 15)
    .attr("cy", sizeKeyY + 10)
    .attr("r", rScale(1))
    .attr("fill", "gray") 
    .attr("opacity", 0.6);

svg.append("text")
    .attr("x", sizeKeyX + 50)
    .attr("y", sizeKeyY + 10)
    .attr("alignment-baseline", "middle")
    .text("Instant"); // first level of r

svg.append("circle")
    .attr("cx", sizeKeyX + 15)
    .attr("cy", sizeKeyY + 45)
    .attr("r", rScale(2))
    .attr("fill", "gray")
    .attr("opacity", 0.6);

svg.append("text")
    .attr("x", sizeKeyX + 50)
    .attr("y", sizeKeyY + 45)
    .attr("alignment-baseline", "middle")
    .text("Habit"); // second level of r

svg.append("circle")
    .attr("cx", sizeKeyX + 15)
    .attr("cy", sizeKeyY + 85)
    .attr("r", rScale(3))
    .attr("fill", "gray")
    .attr("opacity", 0.6);

svg.append("text")
    .attr("x", sizeKeyX + 50)
    .attr("y", sizeKeyY + 85)
    .attr("alignment-baseline", "middle")
    .text("Plan"); // 3rd level of r