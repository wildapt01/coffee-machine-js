import { onOff, displayMessage } from "./classes.js";
import {
  handleClickBrewing,
  handleClickCollect,
  handleClickRefill,
  handleClickSelectors
} from "./handlers.js";

//* Actions
//* =======================
// Turning the machine ON or OFF
document.querySelector("#onOff").addEventListener("click", () => {
  const coffeeButtons = document.querySelectorAll("#coffeeSelectors > button");
  const container = document.getElementById("coffeeSelectors");
  container.removeEventListener("click", handleClickSelectors);
  for (const element of coffeeButtons) {
    element.classList.toggle("inactive");
    element.classList.toggle("active");
  }
  if (coffeeButtons[0].classList.contains("active")) {
    container.addEventListener("click", handleClickSelectors);
  } else {
    container.removeEventListener("click", handleClickSelectors);
    document.querySelector(".output").innerText = "";
  }
  document.querySelector(".right-side").classList.toggle("invisible");
  document.querySelector(".left-side").classList.toggle("invisible");
  const start = new onOff();
  const displaying = new displayMessage();
  // Setting initial inventory in session storage, displaying inventory and
  // yields
  start.setInventory();
  start.getInventory();
  start.clearDisplay();
  start.displayInventory();
  displaying.displayYields();
});
// Brewing the selected coffee
document
  .querySelector("#makeCoffee")
  .addEventListener("click", handleClickBrewing);
// Collecting the money in Till and resetting Till to zero
document
  .querySelector("#collect")
  .addEventListener("click", handleClickCollect);
// Refilling the inventory. Till keeps its current value
document.querySelector("#refill").addEventListener("click", handleClickRefill);
