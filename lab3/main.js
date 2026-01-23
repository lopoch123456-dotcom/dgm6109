"use strict"

document.getElementById("submit")
.addEventListener("click", function() {

let fahrenheit = document.getElementById("inputF").value;
let conversionChoice = document.getElementById("conversionChoice").value;

let celsius = (fahrenheit - 32) * 5 / 9
let kelvin = (fahrenheit + 459.67) * 5 / 9

if (isNaN(fahrenheit)) {
output ("Please enter a valid number.");
}
if (conversionChoice == "c") {
output ("Temperature (celsius): " + celsius.toFixed(2))
} else {
output ("Temperature (kelvin): " + kelvin.toFixed(2))
} // if user choose celsius then show celsius, if not show value of k

/*if (conversionChoice == "c") {
output ("Temperature (celsius): " + celsius)
}
if (conversionChoice == "k") {
output ("Temperature (kelvin): " + kelvin)
}*/
//i don't use code above because i feel "if else" more esay to read

output ("Temperature (fahrenheit): " + fahrenheit)

});