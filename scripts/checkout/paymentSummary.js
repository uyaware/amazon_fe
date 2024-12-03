import { cart, cartTotalQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let totalAmmount = 0;
  let totalShippingFee = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find(product => product.id === productId);

    const matchingDeliveryOption = deliveryOptions.find(deliveryOption => deliveryOption.id == cartItem.deliveryOptionId);

    totalAmmount += matchingProduct.priceCents * cartItem.quantity;
    totalShippingFee +=  matchingDeliveryOption.priceCents;
  });

  const totalBeforeTax = totalAmmount + totalShippingFee;
  const tax = totalBeforeTax * 0.1;
  const total = totalBeforeTax + tax;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartTotalQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(totalAmmount)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(totalShippingFee)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(total)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
  
      const order = await response.json();
      addOrder(order);
    }
    catch(error) {
      console.log('Unexpected error. Try later.');
    }

    window.location.href = 'orders.html'
  });
};