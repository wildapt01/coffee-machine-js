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

document
  .querySelectorAll("#regular")
  .addEventListener("click", function (evnt) {
    evnt.preventDefault();
    const recipes = {
      regular: { beans: 20, water: 15, cup: 1, cost: 2 },
      espresso: { beans: 25, water: 8, cup: 1, cost: 3 },
      cappuccino: { beans: 20, water: 15, milk: 5, cup: 1, cost: 4 }
    };
    //TODO Check inventory. If 1 item is too low, send message to display and keep makeCoffee button red.
    //TODO Add interface to replenish inventory, then authorize selection to be made.

    document.querySelector("#makeCoffee");
  });
