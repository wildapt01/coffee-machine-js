import { onOff, brewing, displayMessage } from "./classes.js";

function handleClickSelectors(evnt) {
  const brewButton = document.querySelector("#makeCoffee");
  const newCoffee = new brewing();
  newCoffee.textColorToggle(brewButton);
  brewButton.removeAttribute("disabled");
  evnt.target.classList.toggle("selected");
  document.querySelector(".output").innerText = "";
}

function handleClickBrewing(evnt) {
  const coffeeButtons = document.querySelectorAll("#coffeeSelectors > button");
  let selectedCoffee = "";
  const newCoffee = new brewing();
  const inventoryUpdate = new onOff();
  const leftDisplay = new displayMessage();
  // Brewing selected coffee
  for (const button of coffeeButtons) {
    if (button.classList.contains("selected")) {
      selectedCoffee = button.id;
    }
  }
  setTimeout(() => {
    document.getElementById(selectedCoffee).classList.remove("selected");
    evnt.target.setAttribute("disabled", "true");
    newCoffee.textColorToggle(evnt.target);
    newCoffee.output(selectedCoffee);
  }, 500);
  // Updating the inventory in Session Storage and left/right displays
  const ingredients = newCoffee.ingredients(selectedCoffee);
  const currentInventory = inventoryUpdate.getInventory();
  const newInventory = newCoffee.newInventory(currentInventory, ingredients);
  inventoryUpdate.setInventory(newInventory);
  inventoryUpdate.displayInventory();
  leftDisplay.displayYields();
}
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
  const leftDisplay = new displayMessage();
  // Setting initial inventory in session storage, displaying inventory and
  // yields
  start.setInventory();
  start.getInventory();
  start.clearDisplay();
  start.displayInventory();

  leftDisplay.displayYields();
});

// Brewing the selected coffee
document
  .querySelector("#makeCoffee")
  .addEventListener("click", handleClickBrewing);
