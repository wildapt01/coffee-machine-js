import { coffee } from "./classes.js";

function order() {
  const newOrder = new coffee();
  console.log(newOrder.makeCoffee(2));
  return;
}
document.querySelector("#makeCoffee").addEventListener("click", order);
