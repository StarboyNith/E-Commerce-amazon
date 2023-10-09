export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
      quantity: 0,
    },
    {
      productId: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
      quantity: 0,
    },
  ];
}
// import { updateOrderSummary } from "../scripts/utils/money.js";
function saveTostorge() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export let matchingItem;
export function addToCart(productId) {
  const addedMessageTimeouts = {};
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );
    addedMessage.classList.add("added-to-cart-visible");
    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }
  
    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);
    addedMessageTimeouts[productId] = timeoutId;
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  }
  saveTostorge();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveTostorge();
  
}
export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}
export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveTostorge();
}
