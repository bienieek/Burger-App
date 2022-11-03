import * as admin from "./views/adminView.js";
import * as orderProces from "./views/orderProces.js";
import * as chefView from "./views/chefView.js";

const btnLogin = document.querySelector(".login_btn");
const inputLoginUser = document.querySelector(".login_input-user");
const inputLoginPw = document.querySelector(".login_input-pw");
const inputLoginPwContainer = document.querySelector(".login_pwcontainer");

const formLogin = document.querySelector(".login_form");
const btnLogout = document.querySelector(".login_logout");
const btnLogoutMom = document.querySelector(".login_logout-mom");
const loginText = document.querySelector(".login_text");
const main = document.querySelector(".main");
export const menu = document.querySelector(".menu");
const btnBuy = document.querySelector(".menu_burger-buy");
const order = document.querySelector(".order");
const adding = document.querySelector(".adding");
const chef = document.querySelector(".chef");
const pwVisIconCon = document.querySelector(".fas_container");
const pwVisIcon1 = document.querySelector(".fa-eye-slash");
const pwVisIcon2 = document.querySelector(".fa-eye");
const loginFormText = document.querySelector(".login_form-text");
const adminBtnDelete = document.querySelector(".menu_burger-delete");
const menuBtnAdd = document.querySelector(".menu_burger-buy");
document.querySelector(".menu_burger-more");

const chefAcc = {
  user: "chef",
  pw: "chef123",
};

const adminAcc = {
  user: "admin",
  pw: "admin123",
};

const accounts = [chefAcc, adminAcc];

// Funkcja ktora pozwala wpisac mealType i displayuje wszystkie dania z tego rodzaju
export const mealTypeFunction = (mealType) => {
  admin.meals
    .filter((meal) => meal.type === mealType)
    .forEach((meal, i) => {
      const html = `
    <div data-meal-type="${meal.type}" data-id="${i}" data-meal-name="${
        meal.name
      }" class="menu_burger">
    <div class="menu_burger-photoC">
    <img src="${meal.photo}" class="menu_burger-photo" />
    </div>
    <div class="menu_burger-name">
    ${meal.name}
      <span class="menu_burger-ingr">${meal.ingredients.join(", ")}
    </div>
    <div class="menu_burger-more">
    <span class="menu_burger-price">${meal.price}zł</span>
    <button data-meal-name="${
      meal.name
    }" data-id="${i}" class="menu_burger-buy ${
        currentAccount === adminAcc ? `btn-delete">X` : `btn-buy">add`
      }</button>
 </div>
  </div>
        `;
      menu.insertAdjacentHTML("beforeend", html);
    });
};

// DISPLAY MENU  // iteruje wszystkie mealTypes i dla kazdego print Menu

export const displayMenu = () => {
  for (let i = 0; i < admin.mealTypes.length; i++) {
    mealTypeFunction(admin.mealTypes[i]);
  }

  if (currentAccount === adminAcc) {
    admin.menuAddEventListenerBtnDelete();
  }
};

let currentAccount;

const incorrectPwAnimation = () => {
  inputLoginPwContainer.classList.remove("animation_shake");
  inputLoginUser.classList.remove("animation_shake");
  loginFormText.classList.remove("animation_shake2");

  window.requestAnimationFrame(function () {
    inputLoginUser.classList.add("animation_shake");
    inputLoginPwContainer.classList.add("animation_shake");
    loginFormText.classList.add("animation_shake2");
  });
};
// Login Implement
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.user === inputLoginUser.value);

  if (currentAccount?.pw === inputLoginPw.value) {
    if (currentAccount === chefAcc) {
      order.classList.add("hidden");
      chef.classList.remove("hidden");
      adding.classList.add("hidden");
      admin.clearMenu();
      displayMenu();
    }

    if (currentAccount === adminAcc) {
      order.classList.add("hidden");
      chef.classList.add("hidden");
      adding.classList.remove("hidden");
      admin.clearMenu();
      displayMenu();
    }

    inputLoginPw.value = inputLoginUser.value = "";
    formLogin.classList.add("hidden");
    btnLogoutMom.classList.remove("hidden");

    loginFormText.innerHTML = "";

    loginText.textContent = `Welcome ${
      currentAccount === chefAcc ? "back Chef" : "back Admin"
    }! `;
  } else {
    loginFormText.innerHTML = "Incorrect password or login!";
    incorrectPwAnimation();
  }
});

//Logout IMplement
btnLogout.addEventListener("click", (e) => {
  order.classList.remove("hidden");
  adding.classList.add("hidden");
  chef.classList.add("hidden");

  currentAccount = "";
  formLogin.classList.remove("hidden");
  btnLogoutMom.classList.add("hidden");

  loginText.textContent = `Welcome!`;
  admin.clearMenu();
  displayMenu();
});

// Passwrod Visibility
pwVisIconCon.addEventListener("click", () => {
  if (inputLoginPw.type === "password") {
    inputLoginPw.type = "text";
  } else {
    inputLoginPw.type = "password";
  }

  if (pwVisIcon1.classList.contains("hidden")) {
    pwVisIcon2.classList.add("hidden");
    pwVisIcon1.classList.remove("hidden");
  } else {
    pwVisIcon1.classList.add("hidden");
    pwVisIcon2.classList.remove("hidden");
  }
});

const init = () => {
  admin.getMealTypesMenu();
  admin.displayMealTypesMenu();
  admin.displayMealTypesForm();
  displayMenu();
};

init();
