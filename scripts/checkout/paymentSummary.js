import { cart } from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { addOrders } from "../../data/orders.js";
import { getProductItem } from "../../data/products.js";
import formateCurrency from "../utils/money.js";

export function renderPaymentSummary() {
  let paymentHtml = "";
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    const product = getProductItem(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

    cartQuantity += cartItem.quantity;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const totalTaxCents = totalBeforeTaxCents * 0.1;
  const totalAfterTaxCents = totalBeforeTaxCents + totalTaxCents;

  //   console.log(productPriceCents);
  //   console.log(shippingPriceCents);
  //   console.log(totalBeforeTaxCents);
  //   console.log(totalTaxCents);
  //   console.log(totalAfterTaxCents);

  paymentHtml = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">$${formateCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formateCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formateCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formateCurrency(totalTaxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formateCurrency(totalAfterTaxCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
        Place your order
    </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentHtml;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrders(order);
      } catch (error) {
        console.log("Unexpexted error, Try again later.");
      }

      window.location.href = "orders.html";
    });
}
