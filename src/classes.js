export class onOff {
  initialInventory = { beans: 150, water: 100, milk: 50, cups: 20, till: 0 };

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

export class displayMessage {
  possibleCoffees() {
    const start = new onOff();
    const coffee = new brewing();
    const currentInventory = start.getInventory();
    const recipes = coffee.recipes;
    const result = {};
    const missing = [];
    for (const coffeeType in recipes) {
      const recipe = recipes[coffeeType];
      // Yield per ingredient quantities in inventory, per coffee type
      const yieldList = [];
      for (const item in recipe) {
        // Excluding the till: not an ingredient!
        if (item === "till") continue;
        const needed = recipe[item];
        const itemYield = Math.floor(currentInventory[item] / needed)
          ? Math.floor(currentInventory[item] / needed)
          : 0;

        if (itemYield === 0) {
          missing.push([coffeeType, item]);
        }

        yieldList.push(itemYield);
      }
      // Isolating the lowest yield for the coffee type
      result[coffeeType] = yieldList.sort((num1, num2) => num1 - num2)[0];
    }
    return [result, missing];
  }
  clearDisplayYields() {
    const yieldsItems = document.querySelectorAll("#coffeeYields p");
    if (yieldsItems.length > 0) {
      for (const element of yieldsItems) {
        element.remove();
      }
    }
  }
  displayYields() {
    this.clearDisplayYields();
    const missing = this.possibleCoffees()[1];
    if (missing.length > 0) this.missingIngredientAlert(missing);
    const yieldsObj = this.possibleCoffees()[0];
    for (const [key, value] of Object.entries(yieldsObj)) {
      const itemDisplay = document.createElement("p");
      const itemValue = document.createTextNode(`${key}: ${value}`);
      itemDisplay.appendChild(itemValue);
      document.querySelector("#coffeeYields").append(itemDisplay);
    }
  }
  clearDisplayAlert() {
    const yieldsItems = document.querySelectorAll("#alertMessage p");
    if (yieldsItems.length > 0) {
      for (const element of yieldsItems) {
        element.remove();
      }
    }
  }
  displayAlert(content) {
    const itemDisplay = document.createElement("p");
    const itemValue = document.createTextNode(content);
    itemDisplay.appendChild(itemValue);
    document.querySelector("#alertMessage").append(itemDisplay);
  }
  missingIngredientAlert(list) {
    this.clearDisplayAlert();
    for (let [coffeeType, ingredient] of list) {
      const typeButton = document.querySelector(`#${coffeeType}`);
      typeButton.classList.toggle("inactive");
      typeButton.classList.toggle("active");
      typeButton.setAttribute("disabled", "true");
      const article = coffeeType === "espresso" ? "n" : "";
      coffeeType = coffeeType === "regular" ? "regular coffee" : coffeeType;
      const line = `Not enough ${ingredient} to brew a${article} ${coffeeType}`;
      this.displayAlert(line);
    }
    this.displayAlert("Press the REFILL button!");
    const alertSection = document.querySelector("#alerts");
    alertSection.classList.toggle("invisible");
    alertSection.classList.toggle("visible");
    const refillButton = document.querySelector("#refill");
    refillButton.removeAttribute("disabled");
    refillButton.classList.toggle("inactive");
    refillButton.classList.toggle("active");
  }
}
