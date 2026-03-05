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
    { date: "1/20/2026", amount: 72.75, item: "Pirate Ship", category: "Survival", satisfaction: 4 },
    { date: "1/20/2026", amount: 31.85, item: "Uber", category: "Survival/Spark", satisfaction: 3 },
    { date: "1/20/2026", amount: 10.15, item: "Uber", category: "Survival/Spark", satisfaction: 3 },
    { date: "1/20/2026", amount: 96.22, item: "Instacart", category: "Survival", satisfaction: 5 },
    { date: "1/20/2026", amount: 0.96, item: "Visa Fee (Instacart)", category: "Survival", satisfaction: 2 },
    { date: "1/21/2026", amount: "undefine", item: "undefine", category: "undefine", satisfaction: "undefine" },
    { date: "1/22/2026", amount: 9.99, item: "Uber (via PayPal)", category: "Survival/Spark", satisfaction: 3 },
    { date: "1/22/2026", amount: 7.59, item: "Giovane Cafe", category: "Spark", satisfaction: 4 },
    { date: "1/23/2026", amount: 33.59, item: "Riot Games", category: "Spark", satisfaction: 5 },
    { date: "1/24/2026", amount: "undefine", item: "undefine", category: "undefine", satisfaction: "undefine" },
    { date: "1/25/2026", amount: "undefine", item: "undefine", category: "undefine", satisfaction: "undefine" },
    { date: "1/26/2026", amount: "undefine", item: "undefine", category: "undefine", satisfaction: "undefine" },
    { date: "1/27/2026", amount: 24.99, item: "Uber", category: "Survival/Spark", satisfaction: 3 },
    { date: "1/28/2026", amount: "undefine", item: "undefine", category: "undefine", satisfaction: "undefine" },
    { date: "1/29/2026", amount: 38.39, item: "Uber", category: "Survival/Spark", satisfaction: 3 },
    { date: "1/30/2026", amount: 16.07, item: "7-Eleven", category: "Survival/Spark", satisfaction: 2 },
    { date: "1/31/2026", amount: "undefine", item: "undefine", category: "undefine", satisfaction: "undefine" },
    { date: "2/1/2026", amount: "undefine", item: "undefine", category: "undefine", satisfaction: "undefine" },
    { date: "2/2/2026", amount: 110.33, item: "Instacart", category: "Survival", satisfaction: 5 },
    { date: "2/2/2026", amount: 1.1, item: "Visa Fee (Instacart)", category: "Survival", satisfaction: 2 },
    { date: "2/2/2026", amount: 10, item: "PTS (Bank Transfer/Bill Payment)", category: "Survival", satisfaction: 5 },
    { date: "2/3/2026", amount: 63.31, item: "Instacart", category: "Survival", satisfaction: 5 },
    { date: "2/3/2026", amount: 10.64, item: "Instacart", category: "Survival", satisfaction: 4 },
    { date: "2/3/2026", amount: 0.63, item: "Visa Fee (Instacart)", category: "Survival", satisfaction: 2 },
    { date: "2/3/2026", amount: 40, item: "Compass Vending (Transit Card)", category: "Survival", satisfaction: 5 },
    { date: "2/3/2026", amount: 0.63, item: "Visa Fee (Instacart)", category: "Survival", satisfaction: 2 },
    { date: "2/3/2026", amount: 0.11, item: "Visa Fee (Instacart)", category: "Survival", satisfaction: 2 },
    { date: "2/4/2026", amount: 68.06, item: "Kinton Ramen", category: "Spark", satisfaction: 4 },
    { date: "2/5/2026", amount: 49.54, item: "Uber", category: "Survival/Spark", satisfaction: 3 },
    { date: "2/6/2026", amount: 29.14, item: "bb.q Chicken", category: "Spark", satisfaction: 4 },
    { date: "2/7/2026", amount: "undefine", item: "undefine", category: "undefine", satisfaction: "undefine" },
    { date: "2/8/2026", amount: "undefine", item: "undefine", category: "undefine", satisfaction: "undefine" },
    { date: "2/9/2026", amount: 30.63, item: "Uber", category: "Survival/Spark", satisfaction: 3 },
    { date: "2/9/2026", amount: 9.68, item: "7-Eleven", category: "Survival/Spark", satisfaction: 3 },
    { date: "2/9/2026", amount: 45.28, item: "T&T Supermarket", category: "Survival", satisfaction: 5 },
    { date: "2/9/2026", amount: 6, item: "Fortune Sou", category: "Spark", satisfaction: 4 },
    { date: "2/10/2026", amount: 11.62, item: "Uber", category: "Survival/Spark", satisfaction: 3 },
    { date: "2/10/2026", amount: 9.96, item: "Uber", category: "Survival/Spark", satisfaction: 3 },
    { date: "2/11/2026", amount: 25.91, item: "Uber", category: "Survival/Spark", satisfaction: 3 }
];//update with my data.

// use a filter to remove days with no spending history ("undefine").
let noAmountData = dataset.filter(function(d) {
    return d.amount != "undefine";
});

// use `sort` to ensure that the data is sorted by date from oldest to newest, so that the timeline on the X-axis will be correct.
noAmountData.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
});

// Define scales
let xScale = d3.scaleTime() // I use scaletime for scale time
    .domain(d3.extent(noAmountData, function(d) { // I ask ai about how to domain date. extent is way to get a range to dataset's data. for date it read by it's own. amazing.
        return new Date(d.date); 
    }))
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, d3.max(noAmountData, function(d) { 
        return d.amount; 
    }) + 10])
    .range([svgHeight - margin, margin]);

let rScale = d3.scaleSqrt()
    .domain([1, 5])
    .range([4, 18]);

//Plot the coordinate axes
let maxAmount = d3.max(noAmountData, function(d) {
     return d.amount; 
    }) + 10;
let minDate = d3.min(noAmountData, function(d) { 
    return new Date(d.date); 
});
let maxDate = d3.max(noAmountData, function(d) { 
    return new Date(d.date); 
}); // setup the max and min

svg.append("line")
    .attr("x1", margin)
    .attr("y1", yScale(0))
    .attr("x2", margin)
    .attr("y2", yScale(maxAmount)) 
    .attr("stroke", "black")
    .attr("stroke-width", 2);

svg.append("line")
    .attr("x1", xScale(minDate)) 
    .attr("x2", xScale(maxDate)) 
    .attr("y1", yScale(0))
    .attr("y2", yScale(0))
    .attr("stroke", "black")
    .attr("stroke-width", 2);

// Manually plot the XY-axis ticks .
let yTickValues = d3.range(0, maxAmount, 20); // Generate an array, starting from 0 and going up to the maximum amount, with a number generated every 20 (0, 20, 40, 60...).
let xTickValues = xScale.ticks(10);// I ask ai about ".ticks" its D3 built in Scale skill
// Draw a short line along the Y-axis 
svg.selectAll("yTicks")
    .data(yTickValues)
    .enter()
    .append("line")
    .attr("x1", margin - 5)
    .attr("x2", margin)
    .attr("y1", function(d) { 
        return yScale(d); 
    })
    .attr("y2", function(d) { 
        return yScale(d); 
    })
    .attr("stroke", "black");

// Write the numerical label for the Y-axis.
svg.selectAll("yTicksText")
    .data(yTickValues)
    .enter()
    .append("text")
    .attr("x", margin - 6) 
    .attr("y", function(d) { 
        return yScale(d) ; 
    })
    .attr("text-anchor", "end") 
    .style("font-size", "12px")
    .text(function(d) { 
        return d; 
    });

let timeFormat = d3.timeFormat("%b %d");// i ask AI how to make the time format only show month and date like jan 20

svg.selectAll(".xTick")
    .data(xTickValues)
    .enter()
    .append("line")
    .attr("x1", function(d) { 
        return xScale(d); 
    })
    .attr("x2", function(d) { 
        return xScale(d); 
    })
    .attr("y1", yScale(0))
    .attr("y2", yScale(0) + 5) 
    .attr("stroke", "black");

svg.selectAll(".xTickText")
    .data(xTickValues)
    .enter()
    .append("text")
    .attr("x", function(d) { 
        return xScale(d); 
    })
    .attr("y", yScale(0) + 20) 
    .attr("text-anchor", "middle") 
    .style("font-size", "12px")
    .text(function(d) { 
        return timeFormat(d); 
    });

// Plot the data points
let circles = svg.selectAll("circle")
    .data(noAmountData)
    .enter()
    .append("circle")
    .attr("cx", function(d) { 
        return xScale(new Date(d.date)); 
    })
    .attr("cy", function(d) { 
        return yScale(d.amount); 
    })
    .attr("r", function(d) { 
        return rScale(d.satisfaction); 
    })
    .attr("fill", function(d) {
        // If the consumption category contains "Spark" .
        if (d.category == "Spark") {
            return "#f28e2c"; 
        } else if (d.category == "Survival") {
            return "#3a9c63"; 
        } else {
            return "#e15759";
        }
    })
    .attr("opacity", 0.7)

// Add titles and axis labels
svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .text("My Spending vs. Date: Impact on Satisfaction");

svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - 10)
    .attr("text-anchor", "middle")
    .text("Date (Early 2026)");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -svgHeight / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Amount Spent ($)");


// Color Key and size key Container
let colorKeyX = 660;
let colorKeyY = 80;
let sizeKeyX = 660;
let sizeKeyY = 180; 

// Color Key
svg.append("text")
    .attr("x", colorKeyX)
    .attr("y", colorKeyY - 15)
    .text("Spending Category")
    .style("font-weight", "bold");

svg.append("rect")
    .attr("x", colorKeyX - 10)
    .attr("y", colorKeyY - 35)
    .attr("width", 150)
    .attr("height", 100)
    .attr("fill", "none")
    .attr("stroke", "black");

// Define three consumer categories and their corresponding colors.
let colorData = [
    { label: "Survival", color: "#3a9c63" },       
    { label: "Spark", color: "#f28e2c" },          
    { label: "Survival/Spark", color: "#e15759" }  
];

// Draw colored dots
svg.selectAll(".colorDots")
    .data(colorData)
    .join("circle")
    .attr("class", "colorDots")
    .attr("cx", colorKeyX + 10)
    .attr("cy", function(d, i) { 
        return colorKeyY + (i * 25); 
    })
    .attr("r", 6)
    .attr("fill", function(d) {
        return d.color; 
    });

// Draw color text labels
svg.selectAll(".colorLabels")
    .data(colorData)
    .join("text")
    .attr("class", "colorLabels")
    .attr("x", colorKeyX + 25)
    .attr("y", function(d, i) { return colorKeyY + (i * 25) + 4; })
    .text(function(d) { return d.label; })
    .style("font-size", "12px");

// 2. Size Key
svg.append("text")
    .attr("x", sizeKeyX)
    .attr("y", sizeKeyY - 15)
    .text("Satisfaction Level") 
    .style("font-weight", "bold");

svg.append("rect")
    .attr("x", sizeKeyX - 10)
    .attr("y", sizeKeyY - 35)
    .attr("width", 150)
    .attr("height", 140)
    .attr("fill", "none")
    .attr("stroke", "black");

svg.append("circle")
    .attr("cx", sizeKeyX + 15)
    .attr("cy", sizeKeyY + 10)
    .attr("r", rScale(1))
    .attr("fill", "gray") 
    .attr("opacity", 0.6);

svg.append("text")
    .attr("x", sizeKeyX + 40)
    .attr("y", sizeKeyY + 10)
    .attr("alignment-baseline", "middle")
    .style("font-size", "12px")
    .text("1 (Low)"); //lv 1

svg.append("circle")
    .attr("cx", sizeKeyX + 15)
    .attr("cy", sizeKeyY + 45)
    .attr("r", rScale(3))
    .attr("fill", "gray")
    .attr("opacity", 0.6);

svg.append("text")
    .attr("x", sizeKeyX + 40)
    .attr("y", sizeKeyY + 45)
    .attr("alignment-baseline", "middle")
    .style("font-size", "12px")
    .text("3 (Neutral)"); //lv2

svg.append("circle")
    .attr("cx", sizeKeyX + 15)
    .attr("cy", sizeKeyY + 85)
    .attr("r", rScale(5))
    .attr("fill", "gray")
    .attr("opacity", 0.6);

svg.append("text")
    .attr("x", sizeKeyX + 40)
    .attr("y", sizeKeyY + 85)
    .attr("alignment-baseline", "middle")
    .style("font-size", "12px")
    .text("5 (High)"); //lv3