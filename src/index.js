import { coffee, onOff } from "./classes.js";

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
  const start = new onOff();
  // Setting initial inventory in session storage
  start.setInventory();
  start.getInventory();
  start.clearDisplay();
  start.displayInventory();
  // Making one coffee
  document.querySelector("#makeCoffee").addEventListener("click", order);
});
