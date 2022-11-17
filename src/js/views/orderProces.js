import * as admin from "./adminView.js";
import * as variables from "./variables.js";
import * as functions from "./functions.js";
import * as chef from "./chefView.js";

const menu = document.querySelector(".menu");
const order = document.querySelector(".order");

export const allOrderPrice = document.querySelector(".order_buy-price");
export const allOrderDelivery = document.querySelector(".order_buy-delivery");
export const orderTextEmpty = document.querySelector(".order_text-empty");
export const orderTextFull = document.querySelector(".order_text-full");
const orderTextCon = document.querySelector(".order_text-container");
export const orderFormInputs = document.querySelectorAll(".order_form-input")






// Adding Burger to ORDER
menu.addEventListener("click", function (e) {
  // e.target was the clicked element
  if (e.target && e.target.classList.contains("btn-buy")) {
    // mealName parent kliknietego buttona
    const mealName = e.target.closest(".menu_burger").dataset.mealName;

    // szukamy w meals mealName i dodajemy element do orders
    const orderedMeal = variables.meals.find((e) => e.name === mealName);



    functions.orders.push(orderedMeal);
    displayOrdersBuyer();

  }
});

export const displayOrdersBuyer = () => {

  if (functions.orders.length > 0) {
    orderTextEmpty.classList.add("hidden");
    orderTextFull.classList.remove("hidden");
  } else {
    orderTextEmpty.classList.remove("hidden");
    orderTextFull.classList.add("hidden");
}
// Printing Order
functions.clearOrders(); // only UI

let deliverVal = 6;
let ordersVal = 0;

functions.orders.forEach((burger, i) => {
    const html = `<div data-id="${i}" class="order_burger click">
      <div class="order_burger-photoC click">
        <img src="${burger.photo}" class="order_burger-photo click" />
      </div>
      <div class="order_burger-name click">${burger.name}</div>
      <span class="order_burger-price click">${burger.price}zł</span>
      <button data-id="${i}" class="order_burger-delete click btn-delete">&#215;</button>
    </div>`;

    orderTextCon.insertAdjacentHTML("afterend", html);

    ordersVal += Number(burger.price);
});

if (ordersVal < 40) {
    ordersVal += Number(deliverVal);
  } else {
    deliverVal = 0;
  }
  allOrderPrice.textContent = `${ordersVal}zł`;
  allOrderDelivery.textContent = `${deliverVal}zł`;


};



// Deleting BUrger from Order
//
order.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("click")) {
    const index = e.target.closest(".order_burger").dataset.id;

    if (index > -1) functions.orders.splice(index, 1);
    displayOrdersBuyer();

    if (functions.orders.length === 0) {
      allOrderPrice.textContent = `0zł`;
      allOrderDelivery.textContent = `0zł`;
    }
  }
});

// Event listener on CLEAR ALL BTN
order.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("order_clearall")) {
    clearAll();
  }
});

// Removing All orders from UI


// ORDER BURGERS BTN BUY event listener
order.addEventListener("click", (e) => {

  const orderFormBuyer = document.querySelector(".order_form-buyer");
  const orderFormEmail = document.querySelector(".order_form-email");

  if (e.target && e.target.classList.contains("order_buy-btn")) {
    let buyer = orderFormBuyer.value;
    let email = orderFormEmail.value;
    let mealTime = functions.getTime();

    let mealsPrice = 0;
    let mealsIndex = functions.orders.length;

    for (let i = 0; i < functions.orders.length; i++) {
      functions.orders[i].buyer = buyer;
      functions.orders[i].email = email;
      functions.orders[i].indexOfOrder = functions.indexOfOrder;
      functions.orders[i].time = mealTime;

      mealsPrice = mealsPrice + +functions.orders[i].price;
    }

    chef.finalOrders.push(...functions.orders);
    chef.displayMealSummary(functions.orders[0], mealsIndex, mealsPrice, functions.orders); // pushing first item (alwaystexist)
    functions.clearAll();
    functions.increaseIndex();

    // sendEmail(buyer, email, orders);
  }
});
