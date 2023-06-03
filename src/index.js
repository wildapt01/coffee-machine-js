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
  const coffeeButtons = document.querySelectorAll(".coffee-buttons > button");
  const controller = new AbortController();
  // Just for test
  const showID = (buttonClicked) => {
    console.log("buttonID :>> ", buttonClicked.id);
  };

  // Listeners clean up
  for (const element of coffeeButtons) {
    if (element.style.color === "antiquewhite") {
      element.removeEventListener("click", function () {});
    }
  }

  document.querySelector("#makeCoffee").removeEventListener("click", order);
  document.querySelector(".right-side").classList.toggle("invisible");
  for (const element of coffeeButtons) {
    element.style.color === "darkgrey" || !element.style.color
      ? (element.style.color = "antiquewhite")
      : (element.style.color = "darkgrey");
    element.addEventListener("click", function () {
      if (element.style.color === "antiquewhite") {
        showID(this);
        element.removeEventListener("click", function () {});
      } else {
        controller.abort();
      }
    });
  }
  const start = new onOff();
  // Setting initial inventory in session storage
  start.setInventory();
  start.getInventory();
  start.clearDisplay();
  start.displayInventory();

  // Making one coffee
  //   document.querySelector("#makeCoffee").addEventListener("click", order);
});
