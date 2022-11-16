// MENU
export const cheeseBurger = {
    type: "Burger",
    price: "22",
    name: "Cheese Burger",
    ingredients: ["beef", "cheese"],
    photo: "./src/img/BurgerSerowy.jpg",
  };
  
  export const baconCheeseBurger = {
    type: "Burger",
    price: "24",
    name: "BaconCheese Burger",
    ingredients: ["beef", "cheese", "bacon"],
    photo: "./src/img/BurgerSerowy.jpg",
  };
  
  export const blueCheeseBurger = {
    type: "Burger",
    price: "24",
    name: "BlueCheese Burger",
    ingredients: ["beef", "bluecheese"],
    photo: "./src/img/BurgerSerowy.jpg",
  };
  
  export const mexicoBurger = {
    type: "Burger",
    price: "24",
    name: "Mexico Burger",
    ingredients: ["beef", "jalapeno"],
    photo: "./src/img/BurgerSerowy.jpg",
  };
  
  export const colaDrink = {
    type: "Drink",
    price: "7",
    name: "Cola",
    ingredients: [],
    photo: "./src/img/BurgerSerowy.jpg",
  };
  
  export const fantaDrink = {
    type: "Drink",
    price: "7",
    name: "Fanta",
    ingredients: [],
    photo: "./src/img/BurgerSerowy.jpg",
  };
  
  // MENU IN ONE PLACE  -- funkcja drukuje wszystkie z pierwszwgo napotkanego rodzaju
  export const meals = [
    cheeseBurger,
    colaDrink,
    baconCheeseBurger,
    blueCheeseBurger,
    fantaDrink,
    mexicoBurger,
  ];
  