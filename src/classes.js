export class onOff {
  initialInventory = { beans: 200, water: 100, milk: 50, cups: 20, till: 0 };

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
    this.clearDisplay();
    const inventory = this.getInventory();
    for (const [key, value] of Object.entries(inventory)) {
      if (key === "till") {
        const moneyDisplay = document.createElement("p");
        const moneyValue = document.createTextNode(`$ ${value}`);
        moneyDisplay.appendChild(moneyValue);
        document.querySelector("#money").appendChild(moneyDisplay);
      } else {
        const itemDisplay = document.createElement("p");
        const itemValue = document.createTextNode(`${key}: ${value}`);
        itemDisplay.appendChild(itemValue);
        document.querySelector("#inventory").append(itemDisplay);
      }
    }
  }
}

export class brewing {
  constructor(coffeeType) {
    this.coffeeType = coffeeType;
  }
  recipes = {
    regular: { beans: 20, water: 15, cups: 1, till: -2 },
    espresso: { beans: 25, water: 8, cups: 1, till: -3 },
    cappuccino: { beans: 20, water: 10, milk: 5, cups: 1, till: -4 }
  };

  textColorToggle(element) {
    element.classList.toggle("inactive");
    element.classList.toggle("active");
  }
  output(coffee) {
    const message = `Your ${
      coffee === "regular" ? "regular coffee" : coffee
    } is ready!`;
    document.querySelector(".output").innerText = "";
    document.querySelector(".output").innerText = message;
  }
  ingredients(coffee) {
    return this.recipes[coffee];
  }
  newInventory(current, ingredients) {
    const newInventory = {};
    for (const key in current) {
      const consummedValue = ingredients[key];
      const currentValue = current[key];
      if (consummedValue) {
        newInventory[key] = currentValue - consummedValue;
      } else {
        newInventory[key] = currentValue;
      }
    }
    return newInventory;
  }
}
