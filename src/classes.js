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
    sessionStorage.clear();
    sessionStorage.setItem("inventory", JSON.stringify(obj));
    sessionStorage.setItem("test", "Hello World");
  }

  getInventory() {
    const inventory = sessionStorage.getItem("inventory");
    console.log("inventory :>> ", JSON.parse(inventory));
    console.log(sessionStorage.getItem("test"));
  }
}
