import { orders, clearAll } from "./orderProces.js";

const order = document.querySelector(".order");
const chefTextCon = document.querySelector(".chef_text-container");

const chef = document.querySelector(".chef");
const orderFormBuyer = document.querySelector(".order_form-buyer");
const orderFormEmail = document.querySelector(".order_form-email");

let finalOrders = [];
const myEmail = "mati.bieniek133@gmail.com";

const smtpHost = "smtp.elasticemail.com";
const smtpPassword = "CB50D98E19A2A699E58597CACC4445CD983A";
const smtpUsername = "mati.bieniek133@gmail.com";

const getTime = () => {
  let date = new Date();

  let minutes = date.getMinutes();
  let hour = date.getHours();
  return `${hour}:${minutes}`;
};

const sendEmail = (buyer, buyerMail, order) => {
  Email.send({
    Host: smtpHost,
    Username: smtpUsername,
    Password: smtpPassword,
    To: buyerMail,
    From: myEmail,
    Subject: "Order Meninx",
    Body: `Hello ${buyer}!
    Your ${order} has been succesfully received`,
  }).then(() =>
    alert("Message sent successfully. PLease check the spam in your mail")
  );
};

let indexOfOrder = 0;
const increaseIndex = () => {
  indexOfOrder++;
};

// ORDER BURGERS BTN BUY event listener
order.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("order_buy-btn")) {
    let buyer = orderFormBuyer.value;
    let email = orderFormEmail.value;
    let mealTime = getTime();

    let mealsPrice = 0;
    let mealsIndex = orders.length;

    for (let i = 0; i < orders.length; i++) {
      orders[i].buyer = buyer;
      orders[i].email = email;
      orders[i].indexOfOrder = indexOfOrder;
      orders[i].time = mealTime;

      mealsPrice = mealsPrice + +orders[i].price;
    }

    finalOrders.push(...orders);
    displayMealSummary(orders[0], mealsIndex, mealsPrice, orders); // pushing first item (alwaystexist)
    clearAll();
    increaseIndex();

    // sendEmail(buyer, email, orders);
  }
});

// ORder Burgers Function
const displayMealSummary = (meal, mealsIndex, mealsPrice, allOrders) => {
  const afterClickInfo = [];

  const html = `
  <div class='chef_burger-container'>
  <div data-index-of-order="${meal.indexOfOrder}" class="chef_burger">
  <span class="chef_burger-buyer">${meal.buyer}</span>
  <span class="chef_burger-index">${mealsIndex}</span>
  <span class="chef_burger-price">${mealsPrice}zł</span>
  <span class="chef_burger-time">${meal.time}</span>
  <button data-index-of-order="${meal.indexOfOrder}" class="chef_burger-donebtn">Done</button>
</div>
  
  </div>
  `;

  // pushing Specific Info to afterClickArray
  allOrders.forEach((meal) => {
    const html = `
    <div data-index-of-order="${meal.indexOfOrder}" class="chef_burger-ordersummary hidden">
    <div class="chef_burger-ordersummary-photoC">
       <div class="chef_burger-ordersummary-photo" src="${meal.photo}"></div> 
    </div>
    <span class="chef_burger-ordersummary-type">${meal.type}</span>
    <span class="chef_burger-ordersummary-mealname">${meal.name}</span>
    <span class="chef_burger-ordersummary-mealprice">${meal.price}zł</span>
  </div>
    `;
    afterClickInfo.push(html);
  });

  chefTextCon.insertAdjacentHTML("afterend", html);

  // sending afterClickInfoArray to function which will add it to document
  displayAfterClickInfo(afterClickInfo, meal.indexOfOrder);
};

const displayAfterClickInfo = (afterClickInfo) => {
  const container = document.querySelector(".chef_burger-container");
  const MealsSummary = document.querySelector(".chef_burger");
  const MealsSummaryBtn = document.querySelector(".chef_burger-donebtn");

  // adding SpecificInfo to document
  afterClickInfo.forEach((html) => {
    container.insertAdjacentHTML("beforeend", html);
  });

  // adding event listener to show SpecificInfo on click
  addingEvL(MealsSummary, MealsSummaryBtn);
};

// nacisniety MealsInfo show SpecificMealInfo
const addingEvL = (MealsSummary, MealsSummaryBtn) => {
  MealsSummary.addEventListener("click", (e) => {
    if (e.target !== MealsSummaryBtn) {
      document.querySelectorAll(".chef_burger-ordersummary").forEach((e) => {
        if (MealsSummary.dataset.indexOfOrder === e.dataset.indexOfOrder)
          e.classList.toggle("hidden");
      });
    }
  });

  MealsSummaryBtn.addEventListener("click", (e) => {
    const container = e.target.closest(".chef_burger-container");
    const btnIndexOfOrder = e.target.dataset.indexOfOrder;

    if (container.dataset.indexOfOrder === btnIndexOfOrder) {
      container.remove();
    }
    console.log(finalOrders);
  });
};
