# Coffee Machine simulator

Coffee is certainely one of the few things that make the world go round, at least my world! To get to understand OOP and JS Classes a bit better, I set up this charming simulator.

## Prompt

What can be better than a cup of coffee during a break? Two cups. Press a couple of buttons on the machine, and, voilà, a burst of raw energy is in your hands. But first, we should teach the machine how to do it. In this project, you will work on a coffee machine simulator.

This machine uses regular ingredients — coffee, water, milk, and plastic cups. Should it run out of something, it will show you a notification. Our device will serve espresso, cappuccino, and latte. And since nothing is for free, it will also charge coffee lovers for a cup.

## Feature list

- [x] It makes a coffee.
- [x] The machine has some styling.
- [ ] It evaluates how many ingredients it takes to make a coffee.
- [ ] It calculates how many cups it can make based on the number of ingredients.
- [ ] It performs three basic actions: collect the money, replenish the supplies, and serve the coffee.
- [x] It displays how many supplies it has on the screen.
- [ ] Work on the main loop: now, the menu keeps updating until users choose to exit.

## Tech stack

- HTML
- CSS
- JavaScript (OOP)

## Dev notes

Process to turn on or off

- [ ] Click on the On/Off button
- [ ] On/Off button text color switches to green from red
- [ ] Other buttons background switches to blue from dark gray
- [ ] The inventory is created in session storage with preset values for ingredients and 0 for the till
- [ ] The inventory is displayed in right side inventory window
- [ ] All display operations have a 0.25 delay

Process to make a coffee

- [ ] Select the coffee type by clicking on the relevant button
- [ ] The coffee price is added to the till
- [ ] The inventory is checked for missing ingredients
- [ ] The left display window shows how many coffees can be brewed
- [ ] If one or several ingredients, a message appears: "Not enough {INGREDIENT} to brew your selection!"
- [ ] The button "REFILl" appears in the same window. Inventory is updated with initial value for this ingredient(s)
- [ ] The {SELECTED COFFEE} button button is dark grey. The machine waits for refill or another selection
- [ ] After the refill, the display is updated. Machine waiting for selection
- [ ] The left display window shows the message: "Press Make Coffee"
- [ ] After a 1s delay the message "Your {SELECTED COFFEE} is ready" is displayed in the bottom display window
