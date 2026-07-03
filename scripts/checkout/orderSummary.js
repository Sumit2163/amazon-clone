import {
  calculateCartQuantity,
  cart,
  deliveryOption,
  removeFromCart,
  updateQuantity,
} from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { getProductItem, products } from "../../data/products.js";
import formateCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { calculateDeliveryDate } from "../utils/calculateDeliveryDate.js";

export function renderOrderSummary() {
  let cartSummaryHtml = "";

  calculateCartQuantity();

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingItem = getProductItem(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHtml += ` 
    <div class="cart-item-container
    js-cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingItem.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingItem.name}
            </div>
            <div class="product-price">
                $${matchingItem.getPrice()}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingItem.id}>
                Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingItem.id}">
                <span class="save-quantity-link link-primary" data-product-id="${matchingItem.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingItem, cartItem)}
            </div>
        </div>
    </div>
    `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

  function deliveryOptionHTML(matchingItem, cartItem) {
    let deliveryHtml = "";
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formateCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryHtml += `
      <label
        class="delivery-option js-delivery-option"
        data-product-id="${matchingItem.id}"
        data-delivery-option-id="${deliveryOption.id}"
        >
        <input
        type="radio"
        ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${matchingItem.id}"
        >
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </label>
    `;
    });
    return deliveryHtml;
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      // const container = document.querySelector(
      //   `.js-cart-item-container-${productId}`,
      // );
      // container.remove();

      calculateCartQuantity();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const input = document.querySelector(`.js-quantity-input-${productId}`);
      let value = Number(input.value);
      updateQuantity(productId, value);

      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove("is-editing-quantity");

      calculateCartQuantity();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      deliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

// renderOrderSummary();
