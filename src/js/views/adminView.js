import * as script from "../script.js";
import * as variables from "./variables.js";

const addingBtn = document.querySelector(".adding_btn");
const addingInputName = document.querySelector(".adding_input-name");

const addingInputPrice = document.querySelector(".adding_input-price");
const addingInputIngrMom = document.querySelector(".adding_input-ingr--mom");
const addingInputIngrAdd = document.querySelector(".adding_input-ingr--add");
const addingInputImg = document.querySelector(".adding_input-img");
const addingDropzone = document.querySelector(".adding_dropzone");
const addingSelect = document.querySelector(".adding_select");
const addingMealTypes = document.querySelector(".adding_select-add");
const addingSelectCont = document.querySelector(".adding_select-cont");
const addingSelectAddBtn = document.querySelector(".adding_select-addbtn");
const addingSelectInput = document.querySelector(".adding_select-add");
const addingSelectSubmit = document.querySelector(".adding_select-submit");
const menuTypesUl = document.querySelector(".menu_types-ul");

// const dropZoneElement = document.querySelector(".adding_dropzone");
// const inputElement = document.querySelector(".adding_dropzone-input");



document.querySelectorAll(".adding_dropzone-input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".adding_dropzone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("adding_dropzone-over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("adding_dropzone-over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files);
    console.log(e.dataTransfer);

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("adding_dropzone-over");
  });
});
/**
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */

const updateThumbnail = (dropZoneElement, file) => {
  let thumbnailElement = dropZoneElement.querySelector(
    ".adding_dropzone-thumb"
  );
  // First time remove prompt
  if (dropZoneElement.querySelector(".adding_dropzone-prompt")) {
    dropZoneElement.querySelector(".adding_dropzone-prompt").remove();
  }

  if (!thumbnailElement) {
    // First time no thumb, so create one
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("adding_dropzone-thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name; // Take data from dragged image, and set it as thumb data-label (data that holds file name, and set ::after cocntent)

  console.log(file.type);

  if (file.type.startsWith("image/")) {
    let reader = new FileReader();

    // reader.addEventListener("load", () => {
    //   thumbnailElement.style.backgroundImage = `url("${reader.result}")`;
    //   addingInputImg.value = thumbnailElement.style.backgroundImage;

    //   let base64 = reader.result.split(",")[1];

    //   const body = {
    //     generated_at: new Date().toISOString(),
    //     png: base64,
    //   };

    //   console.log(body);

    //   fetch("/src/js/views/upload.php", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   });
    // });

    // reader.readAsDataURL(file);
  }
};

// CCLEAR ALL INPUT FIELDS
const clearInputs = () => {
  document.querySelectorAll(".adding_input").forEach((e) => (e.value = ""));
};

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function titleCase(str) {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  return splitStr.join(" ");
}

// filled by every types of available meals
export let mealTypes = [];

// Programitally get all meal types from exisitn meals

export const getMealTypesMenu = () => {
  const mealTypesWithDupl = [];

  variables.meals.forEach((meal) => {
    for (const [key, value] of Object.entries(meal)) {
      if (key === "type") {
        mealTypesWithDupl.push(value);
      }
    }
  });

  mealTypes = [...new Set(mealTypesWithDupl)];
};

//Clear all displayedTypes
export const clearMenuTypes = () => {
  document.querySelectorAll(".menu_types-li").forEach((e) => e.remove());
};

// displating Meal types to Menu_types
export const displayMealTypesMenu = () => {
  clearMenuTypes();

  // Display Element ALL
  if (mealTypes) {
    const html = `<li class="menu_types-li show_all-menu">All</li>`;
    menuTypesUl.insertAdjacentHTML("beforeend", html);

    const showAllMenu = document.querySelector(".show_all-menu");

    showAllMenu.addEventListener("click", () => {
      clearMenu();
      script.displayMenu();
    });
  }

  mealTypes.forEach((type) => {
    const html = `<li class="menu_types-li show_type-menu">${type}</li>`;
    menuTypesUl.insertAdjacentHTML("beforeend", html);
  });

  document.querySelectorAll(".show_type-menu").forEach((menuType) => {
    menuType.addEventListener("click", (e) => {
      const menuType = e.target.textContent;

      clearMenu();
      script.mealTypeFunction(menuType);
    });
  });
};

// displayMealTypesMenu();

// Adding BUrger to Menu
export const addBurger = (type, name, photo, price, ingrs) => {
  const newBurger = {
    type: type,
    price: price,
    name: name,
    ingredients: ingrs,
    photo: photo,
  };

  variables.meals.push(newBurger);
  clearMenu();
  script.displayMenu();
  console.log(variables.meals);
};

// Displaying MealTypes

const hideSubmitClearInput = () => {
  addingSelectSubmit.classList.add("hidden");
  addingSelectInput.value = "";
};

// If there is some text in <input> field than show AddBtn
const showSubmit = () => {
  addingSelectInput.addEventListener("input", (e) => {
    if (addingSelectInput.value.length !== 0) {
      addingSelectSubmit.classList.remove("hidden");
    } else {
      hideSubmitClearInput();
    }
  });
};

// adding new type for form <select></select>
addingSelectSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  mealTypes.push(addingSelectInput.value);

  displayMealTypesForm();
  hideSubmitClearInput();

  addingSelectInput.classList.add("hidden");
  addingSelectAddBtn.textContent = "+";
});

// Displaying the +/- btn
addingSelectAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log();
  addingSelectInput.classList.toggle("hidden");

  if (addingSelectAddBtn.textContent === "+") {
    addingSelectAddBtn.textContent = "-";
    showSubmit();
  } else {
    addingSelectAddBtn.textContent = "+";
    hideSubmitClearInput();
  }
});

const clearMealTypes = () => {
  document.querySelectorAll(".adding_select").forEach((e) => e.remove());
};

// DIsplaying Meal types in form <select></select>
export const displayMealTypesForm = () => {
  clearMealTypes();
  const html = `<select id="type" class="adding_select" form="types">
  ${mealTypes
    .map(
      (meal) => `<option class="adding_option" value="${meal}">${meal}</option>`
    )
    .join(" ")}
  </select>`;

  addingSelectCont.insertAdjacentHTML("beforeend", html);
};

// Event listener to Adding Burger to Menu
addingBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const addingSelect = document.querySelector(".adding_select");

  let messages = [];
  let animationEl = [];

  let type = addingSelect.options[addingSelect.selectedIndex].value;
  let name = titleCase(addingInputName.value);
  let photo = addingInputImg.value;
  let ingrs = [];
  document
    .querySelectorAll(".adding_input-ingr") // Ingredients adding
    .forEach((e) => ingrs.push(e.value));
  let price = addingInputPrice.value;

  // ERROR HANDLING

  console.log(photo);

  if (name === "" || name == null) {
    messages.push("Name is required");
    animationEl.push();
  }
  if (!isNumeric(price)) messages.push("Price should be a number");
  if (ingrs.length < 1 || ingrs.includes(""))
    messages.push("You cant add empty ingredients");

  if (!messages.length) {
    addBurger(type, name, photo, price, ingrs);
    clearInputs();
    displayMealTypesMenu();
  } else {
    console.log(messages.join(", "), "ELOOOOOOOOOOOO");
    messages = [];
  }
});

// USUWANIE MEAL Z MENU
// console.log(script.menu);

export const menuAddEventListenerBtnDelete = () => {
  const menuBurgerMore = document.querySelectorAll(".menu_burger-more");
  console.log("elo");

  menuBurgerMore.forEach((e) => {
    console.log("e;oo");
    e.addEventListener("click", (e) => {
      if (e.target && e.target.closest(".btn-delete")) {
        const btnDel = e.target.closest(".btn-delete");

        const delMealName = btnDel.dataset.mealName;

        const delMealIndex = variables.meals.findIndex(
          (meal) => meal.name === delMealName
        );

        variables.meals.splice(delMealIndex, 1);
        clearMenu();
        script.displayMenu();
      }
    });
  });
};

// DODAWANIE KOLEJENGO INPUT FIELD ingrs
addingInputIngrAdd.addEventListener("click", (e) => {
  e.preventDefault();

  let id = Date.now();

  const html = `
  <div class="adding_input-ingr--ingrbtncon">
  <button data-id='${id}'  class ="adding_input-ingr--delete">X</button>
  <input
    type="text"
    placeholder="Ingredient"
    data-id='${id}'
    class="adding_input adding_input-ingr"
  />
</div>
  `;

  addingInputIngrMom.insertAdjacentHTML("beforeend", html);
});

//usuwanie za pomoca id buttona i id inputu
addingInputIngrMom.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("adding_input-ingr--delete")) {
    e.preventDefault();
    e.target.remove();

    const input = document.querySelector(`[data-id="${e.target.dataset.id}"]`);
    console.log(input);
    input.remove();
  }
});

// Deleting Everything from Menu
export const clearMenu = () => {
  document.querySelectorAll(".menu_burger").forEach((e) => e.remove());
};
