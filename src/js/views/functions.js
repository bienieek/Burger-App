import * as variables from "./variables.js";
import * as order from "./orderProces.js";
  
export const isNumeric = (str) =>{ 
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}
  
export const titleCase= (str) => {
    let splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
  
    return splitStr.join(" ");
}

export const getTime = () => {
  let date = new Date();

  let minutes = date.getMinutes();
  let hour = date.getHours();
  return `${hour}:${minutes}`;
};

export let indexOfOrder = 0;
export const increaseIndex = () => {
  indexOfOrder++;
};


/////////////////////////////////////
/// adminView functions ///////////////////////////////////////////////////////////
/////////////////////////////////////


export const clearMealTypes = () => {
    document.querySelectorAll(".adding_select").forEach((e) => e.remove());
};

export const clearMenuAdmin = () => {
    document.querySelectorAll(".menu_burger").forEach((e) => e.remove());
};

//Clear all displayedTypes
export const clearMenuTypes = () => {
  document.querySelectorAll(".menu_types-li").forEach((e) => e.remove());
};

// CCLEAR ALL INPUT FIELDS
export const clearInputs = () => {
    document.querySelectorAll(".adding_input").forEach((e) => (e.value = ""));
};

// Displaying MealTypes

export const hideSubmitClearInput = () => {
    addingSelectSubmit.classList.add("hidden");
    addingSelectInput.value = "";
};

// If there is some text in <input> field than show AddBtn
export const showSubmit = () => {
    addingSelectInput.addEventListener("input", (e) => {
      if (addingSelectInput.value.length !== 0) {
        addingSelectSubmit.classList.remove("hidden");
      } else {
        hideSubmitClearInput();
      }
    });
};

export const updateThumbnail = (dropZoneElement, file) => {
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
  
////////////////////////////////////////
/////////// orderProcess START /////////////////////////////////////////////////////////////////
///////////////////////////////////////

export const clearFormInputs = () => {
  order.orderFormInputs.forEach(e => {
    e.value= ''
  });
}

export const clearOrders = () => {
  document.querySelectorAll(".order_burger").forEach((e) => e.remove());
};
export let orders = [];
// Clearing WHOLE ORDER FIELD
export const clearAll = () => {
  clearOrders();
  clearFormInputs()
  order.allOrderPrice.textContent = `0zł`;
  order.allOrderDelivery.textContent = `0zł`;
  let arr = [];
  orders = arr;
};

