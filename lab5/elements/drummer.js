"use strict";

/****** function drummer(drawing, originX, originY, showOrigin, choice) *******

PURPOSE:
    Draws my Project 1 character on the provided SVG canvas.

PARAMETERS:
    drawing:
        The D3-selected SVG drawing area to draw on.
    originX:
        X position of the drawing's origin.
    originY:
        Y position of the drawing's origin.
    showOrigin:
        Whether to display the origin point.
    choice:
        Select menu value; when "alt" draws the optional detail.

Returns:
    The SVG drawing area with the drawing added.

************************************************/
function drummer(drawing, originX, originY, showOrigin, choice) {

  /* drum */
  drawing.append('ellipse')
    .attr('cx', originX)
    .attr('cy', originY)
    .attr('rx', 45)
    .attr('ry', 45)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

  /* body */
  drawing.append('polyline')
    .attr('points', closedPolygon(
      originX - 50, originY - 55,
      originX - 45, originY - 25,
      originX - 30, originY + 30,
      originX - 50, originY + 55,
      originX - 70, originY + 30,
      originX - 55, originY - 25
    ))
    .attr('fill', '#6f8193');

  /* left arm (upper) */
  drawing.append('line')
    .attr('x1', originX - 57)
    .attr('y1', originY - 20)
    .attr('x2', originX - 80)
    .attr('y2', originY + 0)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

  /* left arm (lower) */
  drawing.append('line')
    .attr('x1', originX - 80)
    .attr('y1', originY + 0)
    .attr('x2', originX - 100)
    .attr('y2', originY - 15)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

  /* left hand ball */
  drawing.append('ellipse')
    .attr('cx', originX - 100)
    .attr('cy', originY - 15)
    .attr('rx', 10)
    .attr('ry', 10)
    .attr('fill', 'black');

  /* right arm */
  drawing.append('line')
    .attr('x1', originX - 50)
    .attr('y1', originY - 30)
    .attr('x2', originX - 35)
    .attr('y2', originY - 25)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

  /* left leg (upper) */
  drawing.append('line')
    .attr('x1', originX - 57)
    .attr('y1', originY + 45)
    .attr('x2', originX - 77)
    .attr('y2', originY + 100)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

  /* left leg (lower) */
  drawing.append('line')
    .attr('x1', originX - 77)
    .attr('y1', originY + 100)
    .attr('x2', originX - 60)
    .attr('y2', originY + 95)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

  /* right leg (upper) */
  drawing.append('line')
    .attr('x1', originX - 43)
    .attr('y1', originY + 45)
    .attr('x2', originX - 23)
    .attr('y2', originY + 100)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

  /* right leg (lower) */
  drawing.append('line')
    .attr('x1', originX - 23)
    .attr('y1', originY + 100)
    .attr('x2', originX - 10)
    .attr('y2', originY + 95)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

  /* head */
  drawing.append('ellipse')
    .attr('cx', originX - 50)
    .attr('cy', originY - 77)
    .attr('rx', 20)
    .attr('ry', 20)
    .attr('fill', '#f6b6c8');

  /* hat */
  drawing.append('rect')
    .attr('x', originX - 70)
    .attr('y', originY - 100)
    .attr('width', 50)
    .attr('height', 20)
    .attr('fill', 'blue');

  /* hat brim */
  drawing.append('rect')
    .attr('x', originX - 20)
    .attr('y', originY - 85)
    .attr('width', 15)
    .attr('height', 6)
    .attr('fill', '#8fc6ff');

  // conditional extra detail
  if (choice === "alt") {
    drawing.append("line")
      .attr("x1", originX + 20)
      .attr("y1", originY - 20)
      .attr("x2", originX + 60)
      .attr("y2", originY - 60)
      .attr("stroke", "black")
      .attr("stroke-width", 3);
  }
  /* === OPTIONAL ORIGIN POINT === */
  if (showOrigin) {
    drawing.append("circle")
      .attr("cx", originX)
      .attr("cy", originY)
      .attr("r", 3)
      .attr("fill", "deeppink");
  
  }
}