import { coffee, onOff, brewing } from "./classes.js";

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

function handleClickSelectors(evnt) {
  const selectedCoffee = evnt.target.id;
  const brewButton = document.querySelector("#makeCoffee");
  console.log("Clicked! ", selectedCoffee);
  const newCoffee = new brewing();
  newCoffee.textColorToggle(brewButton);
  brewButton.removeAttribute("disabled");
  evnt.target.classList.toggle("selected");
}

function handleClickBrewing(evnt) {
  const coffeeButtons = document.querySelectorAll("#coffeeSelectors > button");
  let selectedCoffee = "";
  for (const button of coffeeButtons) {
    if (button.classList.contains("selected")) {
      selectedCoffee = button.id;
    }
  }
  console.log("selectedCoffee :>> ", selectedCoffee);
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
  }

  document.querySelector(".right-side").classList.toggle("invisible");

  const start = new onOff();
  // Setting initial inventory in session storage
  start.setInventory();
  start.getInventory();
  start.clearDisplay();
  start.displayInventory();
});

// Brewing the selected coffee
document
  .querySelector("#makeCoffee")
  .addEventListener("click", handleClickBrewing);
