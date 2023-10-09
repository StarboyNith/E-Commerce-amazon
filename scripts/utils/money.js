import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { updateCartQuantity } from "../checkout.js";

export function formatCurrency(priceRupee) {
  return priceRupee.toFixed(2);
}

export function updateOrderSummary() {
  let total = 0;
  let orderSummary = "";
  cart.forEach((item) => {
    let productId = item.productId;
    products.forEach((product) => {
      if (product.id === productId) {
        total += product.price;
      }
    });
  });
  let shippingAndHandling = 0;
  if (total) {
    shippingAndHandling = 50;
  }


  let totalBeforeTax = total + shippingAndHandling;
  let estimatedTax = (10 / 100) * total;
  let orderTotal = totalBeforeTax + estimatedTax;

  orderSummary += `
      <div class="payment-summary-title">
        Order Summary
      </div>
    
      <div class="payment-summary-row">
        <div>Items (${updateCartQuantity()}):</div>
        <div class="payment-summary-money">${total.toFixed(2)} Rs</div>
      </div>
    
      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${shippingAndHandling.toFixed(
          2
        )} Rs</div>
      </div>
    
      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${totalBeforeTax.toFixed(2)} Rs</div>
      </div>
    
      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${estimatedTax.toFixed(2)} Rs</div>
      </div>
    
      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${orderTotal.toFixed(2)} Rs</div>
      </div>
    
      <button class="place-order-button button-primary">
        Place your order
      </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML = orderSummary;
}
updateOrderSummary();
