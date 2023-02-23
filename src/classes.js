export class coffee {
  constructor(quantity) {
    this.quantity = quantity;
  }

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
  initialInventory = { beans: 200, water: 5, milk: 100, cup: 50, till: 0 };

  setInventory(obj = this.initialInventory) {
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
    const
    const moneyDisplay = document.createElement("p");
    const moneyContent = document.createTextNode(`$ ${till}`);
    moneyDisplay.appendChild(moneyContent);
    document.querySelector("#money").append(moneyDisplay);
  }
}

export class selectMake {
  constructor(type) {
    this.type = type;
  }
  recipes = {
    regular: { beans: 20, water: 15, cup: 1, cost: 2 },
    espresso: { beans: 25, water: 8, cup: 1, cost: 3 },
    cappuccino: { beans: 20, water: 10, milk: 5, cup: 1, cost: 4 }
  };

  //Methods
  checkInventory = (inventory) => {
    const selected = this.recipes[this.type];
    const itemsTooLow = Object.keys(selected)
      .filter((item) => item !== "cost")
      .map((item) => {
        return inventory[item] < selected[item] ? item : "";
      });
    // Flag true if at least 1 item is  too low in current inventory
    const needFlag = itemsTooLow.some((item) => item);
    return [needFlag, itemsTooLow, selected];
  };

  displayNeed = (item) => {};
}
