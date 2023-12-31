import { updateOrderSummary } from "../scripts/utils/money.js";
import { cart, matchingItem,removeFromCart,calculateCartQuantity,updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
let cartSummary = "";
updateOrderSummary();
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingItem;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });

  cartSummary += `<div class="cart-item-container js-itemcontainer-${matchingItem.id}">
 <div class="delivery-date">
   Delivery date: Tuesday, June 21
 </div>

 <div class="cart-item-details-grid">
   <img class="product-image"
     src="${matchingItem.image}">

   <div class="cart-item-details">
     <div class="product-name">
     ${matchingItem.name}
     </div>
     <div class="product-price">
     Rs ${matchingItem.price}
     </div>
     <div class="product-quantity">
       <span>
         Quantity: <span class="quantity-label">${cartItem.quantity}</span>
       </span>
       <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingItem.id}">
         Update
       </span>
       <input class="quantity-input js-quantity-input-${matchingItem.id}">
       <span class="save-quantity-link link-primary js-save-link"
       data-product-id="${matchingItem.id}">
       Save
     </span>
       <span class="delete-quantity-link link-primary js-delete-link" data-product-id ='${matchingItem.id}'>
         Delete
       </span>
     </div>
   </div>

   <div class="delivery-options">
     <div class="delivery-options-title">
       Choose a delivery option:
     </div>
     <div class="delivery-option">
       <input type="radio" checked
         class="delivery-option-input"
         name="delivery-option-1">
       <div>
         <div class="delivery-option-date">
           Tuesday, June 21
         </div>
         <div class="delivery-option-price">
           FREE Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio"
         class="delivery-option-input"
         name="delivery-option-1">
       <div>
         <div class="delivery-option-date">
           Wednesday, June 15
         </div>
         <div class="delivery-option-price">
           $4.99 - Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio"
         class="delivery-option-input"
         name="delivery-option-1">
       <div>
         <div class="delivery-option-date">
           Monday, June 13
         </div>
         <div class="delivery-option-price">
           $9.99 - Shipping
         </div>
       </div>
     </div>
   </div>
 </div>
</div>
`;
});


document.querySelector(".js-ordered-products").innerHTML = cartSummary;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    
    removeFromCart(productId);
    updateOrderSummary()

    // console.log(cart)
   const selectRemoveItem= document.querySelector(`.js-itemcontainer-${productId}`)
   selectRemoveItem.remove();
  });
  
});

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
    return cartQuantity;
}

updateCartQuantity();

document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      // container.classList.add('is-editing-quantity');
    });
  });

document.querySelectorAll('.js-save-link')
.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
    updateQuantity(productId, newQuantity);
  });
});
