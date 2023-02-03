export class coffee {
  constructor(quantity) {
    this.quantity = quantity;
  }

  // Methods
  makeCoffee(num) {
    const needs = { beans: 20, water: 15, cup: 1 };
    const product = num > 1 ? "coffees" : "coffee";
    const consummed = {
      beans: needs.beans * num,
      water: needs.water * num,
      cup: needs.cup * num
    };
    return { made: `${num} ${product}`, consummed };
  }
}

export class onOff {
  initialInventory = { beans: 201, water: 300, milk: 100, cup: 50, till: 50 };

  setInventory(obj = this.initialInventory) {
    // Clearing session storage if it contains a "inventory" object
    sessionStorage.clear();
    sessionStorage.setItem("inventory", JSON.stringify(obj));
  }

  getInventory() {
    const inventory = sessionStorage.getItem("inventory");
    return JSON.parse(inventory);
  }

  clearDisplay() {
    const inventoryItems = document.querySelectorAll("#inventory p");
    const moneyItems = document.querySelectorAll("#money p");
    if (inventoryItems) {
      for (const element of inventoryItems) {
        element.remove();
      }
    }
    if (moneyItems) {
      for (const element of moneyItems) {
        element.remove();
      }
    }
  }

  displayInventory() {
    const inventory = this.getInventory();
    const { till } = inventory;
    for (const item of Object.keys(inventory)) {
      if (item === "till") continue;
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
  }
}
