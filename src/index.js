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

//* Actions
//* =======================
// Turning the machine ON or OFF
document.querySelector("#onOff").addEventListener("click", () => {
  document.querySelector("#makeCoffee").removeEventListener("click", order);
  document.querySelector(".right-side").classList.toggle("invisible");
  const coffeeButtons = document.querySelectorAll(".coffee-buttons > button");
  for (const element of coffeeButtons) {
    element.style.color === "darkgrey" || !element.style.color
      ? (element.style.color = "antiquewhite")
      : (element.style.color = "darkgrey");
  }
  const start = new onOff();
  // Setting initial inventory in session storage
  start.setInventory();
  start.getInventory();
  start.clearDisplay();
  start.displayInventory();

  // Making one coffee
  document.querySelector("#makeCoffee").addEventListener("click", order);
});

document.querySelector("#regular").addEventListener("click", function (evnt) {
  evnt.preventDefault();

  //TODO Check inventory. If 1 item is too low, send message to display and keep makeCoffee button red.
  const selectedType = "regular";
  const newOrder = new selectMake(selectedType);
  const inventoryCheck = newOrder.checkInventory(
    JSON.parse(sessionStorage.getItem("inventory"))
  );
  console.log("inventoryCheck :>> ", inventoryCheck);

  //TODO Add interface to replenish inventory, then authorize selection to be made.

  // document.querySelector("#makeCoffee");
});
