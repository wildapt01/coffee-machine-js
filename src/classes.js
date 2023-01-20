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
