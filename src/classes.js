export class coffee {
  constructor(quantity) {
    this.quantity = quantity;
  }

  // Methods
  makeCoffee(quantity) {
    const needs = { beans: 20, water: 15, cup: 1 };
    const product = quantity > 1 ? "coffees" : "coffee";
    const consummed = {
      beans: needs.beans * quantity,
      water: needs.water * quantity,
      cup: needs.cup * quantity
    };
    return { made: `${quantity} ${product}`, consummed };
  }
}
