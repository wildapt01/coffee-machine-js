import { onOff, brewing, displayMessage } from "./classes.js";

export function handleClickSelectors(evnt) {
  const brewButton = document.querySelector("#makeCoffee");
  const newCoffee = new brewing();
  const coffeeButtons = document.querySelector("#coffeeSelectors").children;
  for (const button of coffeeButtons) {
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
    }
  }
  newCoffee.textColorToggle(brewButton);
  brewButton.removeAttribute("disabled");
  evnt.target.classList.toggle("selected");
  document.querySelector(".output").innerText = "";
}

export function handleClickBrewing(evnt) {
  const coffeeButtons = document.querySelectorAll("#coffeeSelectors > button");
  const collectButton = document.querySelector("#collect");
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
  // Enabling collect button
  if (collectButton.hasAttribute("disabled")) {
    collectButton.removeAttribute("disabled");
    newCoffee.textColorToggle(collectButton);
  }
  // Updating the inventory in Session Storage and left/right displays
  const ingredients = newCoffee.ingredients(selectedCoffee);
  const currentInventory = inventoryUpdate.getInventory();
  const newInventory = newCoffee.newInventory(currentInventory, ingredients);
  inventoryUpdate.setInventory(newInventory);
  inventoryUpdate.displayInventory();
  leftDisplay.displayYields();
}

export function handleClickCollect() {
  const actions = new onOff();
  const resetButton = new brewing();
  const alertDisplay = new displayMessage();
  const collectButton = document.querySelector("#collect");
  const inventory = actions.getInventory();
  const newInventory = { ...inventory, till: 0 };
  actions.setInventory(newInventory);
  actions.displayInventory();
  resetButton.textColorToggle(collectButton);
  collectButton.setAttribute("disabled", "true");
  const alertSection = document.querySelector("#alerts");
  alertSection.classList.toggle("invisible");
  alertDisplay.displayAlert("Till collected!");
  setTimeout(() => {
    alertSection.classList.toggle("invisible");
    alertDisplay.clearDisplayAlert();
  }, 1500);
}

export function handleClickRefill(evnt) {
  const start = new onOff();
  const coffeeProcess = new brewing();
  const messages = new displayMessage();
  const fullInventory = start.initialInventory;
  const currentInventory = start.getInventory();
  const currentTill = currentInventory.till;
  const newInventory = { ...fullInventory, till: currentTill };
  start.setInventory(newInventory);
  start.displayInventory();
  evnt.target.classList.toggle("inactive");
  evnt.target.classList.toggle("active");
  evnt.target.setAttribute("disabled", "true");
  messages.clearDisplayAlert();
  const alertSection = document.querySelector("#alerts");
  alertSection.classList.toggle("invisible");
  alertSection.classList.toggle("visible");
  // Resetting disabled coffee selectors
  const coffeeButtons = document.querySelectorAll("#coffeeSelectors > button");
  for (const element of coffeeButtons) {
    if (element.hasAttribute("disabled")) {
      element.removeAttribute("disabled");
      coffeeProcess.textColorToggle(element);
    }
  }
  messages.displayYields();
}
