import { coffee } from "./classes.js";

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

const displayInventory = () => {
  const inventory = { beans: 200, water: 300, milk: 100, cup: 50 };
  const till = 50;
  for (const item in inventory) {
    const val = inventory[item];
    const newLine = document.createElement("p");
    const lineContent = document.createTextNode(` - ${val} ${item}`);
    newLine.appendChild(lineContent);
    document.querySelector("#inventory").append(newLine);
  }
  const moneyDisplay = document.createElement("p");
  const moneyContent = document.createTextNode(`$ ${till}`);
  moneyDisplay.appendChild(moneyContent);
  document.querySelector("#money").append(moneyDisplay);
};

//* Actions
//* =======================
// Turning the machine ON or OFF
document.querySelector("#onOff").addEventListener("click", () => {
  document.querySelector(".right-side").classList.toggle("invisible");
});
// Making one coffee
document.querySelector("#makeCoffee").addEventListener("click", order);
// Displaying the inventory
displayInventory();