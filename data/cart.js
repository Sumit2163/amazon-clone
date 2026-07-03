export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "2",
  },
];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML =
    cartQuantity === 0 ? "" : cartQuantity;
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-return-home-link").innerHTML =
    cartQuantity === 0 ? "" : `${cartQuantity} Items`;
}

export function updateQuantity(productId, newQuantity) {
  if (newQuantity > 0 && newQuantity < 10) {
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity = newQuantity;
      }
    });

    const updatedValue = document.querySelector(
      `.js-quantity-label-${productId}`,
    );
    updatedValue.innerHTML = newQuantity;
  } else {
    console.log("Erros - Quantity not available");
  }

  saveToStorage();
}

export function addToCart(productId) {
  let matchingItem = "";

  let selectedValue = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value,
  );

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += selectedValue;
  } else {
    cart.push({
      productId,
      quantity: selectedValue,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
  updateCartQuantity();
}

export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function deliveryOption(productId, deliveryOptionId) {
  let matchingItem = "";

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

// just print simple msg "load cart" for practicing promise

export function loadCartFetch() {
  const promise = fetch("https://supersimplebackend.dev/cart")
    .then((response) => response.text())
    .then((text) => console.log(text));

  return promise;
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

