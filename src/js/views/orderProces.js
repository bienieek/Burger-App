import * as admin from "./adminView.js";
import * as variables from "./variables.js";
const menu = document.querySelector(".menu");
const order = document.querySelector(".order");
const orderBurger = document.querySelector(".order_burger");
const orderName = document.querySelector(".order_burger-name");
const orderPrice = document.querySelector(".order_burger-price");
const allOrderPrice = document.querySelector(".order_buy-price");
const allOrderDelivery = document.querySelector(".order_buy-delivery");
const orderTextEmpty = document.querySelector(".order_text-empty");
const orderTextFull = document.querySelector(".order_text-full");
const orderTextCon = document.querySelector(".order_text-container");



export let orders = [];

// Adding Burger to ORDER
menu.addEventListener("click", function (e) {
  // e.target was the clicked element
  if (e.target && e.target.classList.contains("btn-buy")) {
    // mealName parent kliknietego buttona
    const mealName = e.target.closest(".menu_burger").dataset.mealName;

    // szukamy w meals mealName i dodajemy element do orders
    const orderedMeal = variables.meals.find((e) => e.name === mealName);

    orders.push(orderedMeal);
    displayOrdersBuyer();
  }
});

// Printing Order
export const displayOrdersBuyer = () => {
  if (orders > 0) {
    orderTextEmpty.classList.add("hidden");
    orderTextFull.classList.remove("hidden");
  } else {
    orderTextEmpty.classList.remove("hidden");
    orderTextFull.classList.add("hidden");
  }

  clearOrders(); // only UI

  let deliverVal = 6;
  let ordersVal = 0;

  orders.forEach((burger, i) => {
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

    if (index > -1) orders.splice(index, 1);
    displayOrdersBuyer();

    if (orders.length === 0) {
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
export const clearOrders = () => {
  document.querySelectorAll(".order_burger").forEach((e) => e.remove());
};

// Clearing WHOLE ORDER FIELD
export const clearAll = () => {
  clearOrders();
  allOrderPrice.textContent = `0zł`;
  allOrderDelivery.textContent = `0zł`;
  let arr = [];
  orders = arr;
};
