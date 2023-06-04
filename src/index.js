import { coffee, onOff, selectMake } from "./classes.js";

function order() {
  const output = document.querySelector(".output");
  // Removing output content
  output.innerHTML = "";
  // Creating the new coffee message
  const newOrder = new coffee();
  console.log("done coffee");
  const { made } = newOrder.makeCoffee(1);
  output.innerHTML = `${made} is waiting for you!`;
}
function handleClick(evnt) {
  console.log("Clicked! ", evnt.target.textContent);
  console.log(evnt.target.attributes.type);
}
//* Actions
//* =======================
// Turning the machine ON or OFF
document.querySelector("#onOff").addEventListener("click", () => {
  const coffeeButtons = document.querySelectorAll("#coffeeSelectors > button");
  const container = document.getElementById("coffeeSelectors");

  container.removeEventListener("click", handleClick);
  for (const element of coffeeButtons) {
    element.classList.toggle("inactive");
    element.classList.toggle("active");
  }
  if (coffeeButtons[0].classList.contains("active")) {
    container.addEventListener("click", handleClick);
  } else {
    container.removeEventListener("click", handleClick);
  }

  document.querySelector(".right-side").classList.toggle("invisible");

  const start = new onOff();
  // Setting initial inventory in session storage
  start.setInventory();
  start.getInventory();
  start.clearDisplay();
  start.displayInventory();
});
